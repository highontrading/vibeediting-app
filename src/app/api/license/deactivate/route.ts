import { z } from "zod";
import { deactivate } from "@/lib/license";

const Body = z.object({
  licenseKey: z.string().min(1).max(64),
  machineId: z.string().min(8).max(128),
});

// Frees up one computer slot so the key can be used on a new computer.
export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false }, { status: 400 });
  try {
    const removed = await deactivate({ key: parsed.data.licenseKey, machineId: parsed.data.machineId });
    return Response.json({ ok: removed });
  } catch (err) {
    console.error("[license/deactivate]", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
