import "server-only";
import { sql } from "./db";
import { getPlan } from "@/config/site";
import { generateLicenseKey, isLicenseKeyFormat, normalizeLicenseKey } from "./license-key";

export type License = {
  key: string;
  email: string;
  name: string | null;
  plan_id: string;
  max_activations: number;
  expires_at: Date | null;
  revoked: boolean;
};

export class AmountMismatchError extends Error {}

// Marks an order as paid and issues its license exactly once. Safe to call from
// both the browser callback and the webhook, in any order.
export async function fulfilOrder(input: {
  orderId: string;
  paymentId: string;
  amount?: number;
}): Promise<{ license: License; created: boolean } | null> {
  return sql().begin(async (tx) => {
    const [order] = await tx`select * from orders where id = ${input.orderId} for update`;
    if (!order) return null;
    if (input.amount !== undefined && input.amount !== order.amount) {
      throw new AmountMismatchError(`Order ${order.id}: paid ${input.amount}, expected ${order.amount}`);
    }

    if (order.status !== "paid") {
      await tx`update orders set status = 'paid', payment_id = ${input.paymentId}, paid_at = now()
               where id = ${order.id}`;
    }

    const [existing] = await tx<License[]>`select * from licenses where order_id = ${order.id}`;
    if (existing) return { license: existing, created: false };

    const plan = getPlan(order.plan_id);
    const maxActivations = plan?.maxActivations ?? 2;
    const licenseDays = plan?.licenseDays ?? null;
    const [license] = await tx<License[]>`
      insert into licenses (key, order_id, email, name, plan_id, max_activations, expires_at)
      values (${generateLicenseKey()}, ${order.id}, ${order.email}, ${order.name}, ${order.plan_id},
              ${maxActivations},
              ${licenseDays === null ? null : tx`now() + make_interval(days => ${licenseDays})`})
      returning *`;
    return { license, created: true };
  });
}

export type VerifyResult =
  | { valid: true; plan: string; expiresAt: string | null; activations: { used: number; max: number } }
  | { valid: false; reason: "invalid_format" | "not_found" | "revoked" | "expired" | "activation_limit" };

// Called by the MCP on start-up. Registers the machine the first time it is seen.
export async function verifyAndActivate(input: {
  key: string;
  machineId: string;
  mcpVersion?: string;
}): Promise<VerifyResult> {
  const key = normalizeLicenseKey(input.key);
  if (!isLicenseKeyFormat(key)) return { valid: false, reason: "invalid_format" };

  return sql().begin(async (tx) => {
    const [license] = await tx<License[]>`select * from licenses where key = ${key} for update`;
    if (!license) return { valid: false, reason: "not_found" } as const;
    if (license.revoked) return { valid: false, reason: "revoked" } as const;
    if (license.expires_at && license.expires_at.getTime() < Date.now()) {
      return { valid: false, reason: "expired" } as const;
    }

    const [seen] = await tx`
      update activations set last_seen = now(), mcp_version = ${input.mcpVersion ?? null}
      where license_key = ${key} and machine_id = ${input.machineId}
      returning machine_id`;
    const [{ count }] = await tx<{ count: number }[]>`
      select count(*)::int as count from activations where license_key = ${key}`;

    if (!seen) {
      if (count >= license.max_activations) return { valid: false, reason: "activation_limit" } as const;
      await tx`insert into activations (license_key, machine_id, mcp_version)
               values (${key}, ${input.machineId}, ${input.mcpVersion ?? null})`;
    }

    return {
      valid: true,
      plan: license.plan_id,
      expiresAt: license.expires_at?.toISOString() ?? null,
      activations: { used: seen ? count : count + 1, max: license.max_activations },
    } as const;
  });
}

export async function deactivate(input: { key: string; machineId: string }) {
  const key = normalizeLicenseKey(input.key);
  const rows = await sql()`
    delete from activations where license_key = ${key} and machine_id = ${input.machineId}
    returning machine_id`;
  return rows.length > 0;
}

// Licenses for an email that have not been emailed in the last 5 minutes.
// Marks them as emailed so the resend form cannot be used to flood an inbox.
export async function claimLicensesForResend(email: string) {
  return sql()<License[]>`
    update licenses set last_emailed_at = now()
    where lower(email) = lower(${email}) and not revoked
      and (last_emailed_at is null or last_emailed_at < now() - interval '5 minutes')
    returning *`;
}

export async function markEmailed(key: string) {
  await sql()`update licenses set last_emailed_at = now() where key = ${key}`;
}
