import { z } from "zod";
import { claimLicensesForResend } from "@/lib/license";
import { sendLicenseEmail } from "@/lib/email";

const Body = z.object({ email: z.email().max(200) });

// "Lost my key" form. Always gives the same answer so it cannot be used to
// check whether an email address bought vibeediting.
export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Enter a valid email." }, { status: 400 });
  try {
    const licenses = await claimLicensesForResend(parsed.data.email);
    for (const license of licenses) await sendLicenseEmail(license);
  } catch (err) {
    console.error("[license/resend]", err);
  }
  return Response.json({ ok: true });
}
