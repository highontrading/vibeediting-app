import "server-only";
import { env } from "./env";
import { business, mcp, site } from "@/config/site";
import type { License } from "./license";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function sendLicenseEmail(license: License) {
  const firstName = license.name?.split(" ")[0] ?? "there";
  const docsUrl = `${site.url}/docs/getting-started`;
  const subject = "Your vibeediting license key";
  const text = [
    `Hi ${firstName},`,
    "",
    "Thanks for buying vibeediting! Here is your license key:",
    "",
    `    ${license.key}`,
    "",
    `Keep it safe. It works on ${license.max_activations} computers.`,
    "",
    `Start here, the install takes about 5 minutes: ${docsUrl}`,
    "",
    `You will paste the key as ${mcp.licenseEnvVar} while adding the MCP.`,
    "",
    `Need help? Just reply to this email or write to ${business.email}.`,
    "",
    "Happy editing,",
    "Team vibeediting",
  ].join("\n");

  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
<p>Hi ${escapeHtml(firstName)},</p>
<p>Thanks for buying vibeediting! Here is your license key:</p>
<p style="font-family:ui-monospace,monospace;font-size:20px;font-weight:700;letter-spacing:1px;background:#f4f4f5;padding:14px 18px;border-radius:8px;display:inline-block">${license.key}</p>
<p>Keep it safe. It works on ${license.max_activations} computers.</p>
<p><a href="${docsUrl}" style="background:#c6f432;color:#111;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:600">Open the install guide</a></p>
<p>You will paste the key as <code>${mcp.licenseEnvVar}</code> while adding the MCP. The install takes about 5 minutes.</p>
<p>Need help? Just reply to this email or write to ${escapeHtml(business.email)}.</p>
<p>Happy editing,<br>Team vibeediting</p>
</div>`;

  const apiKey = env.resendApiKey();
  if (!apiKey) {
    console.warn(`[email] RESEND_API_KEY not set. Would send to ${license.email}:\n${text}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.emailFrom(),
      to: [license.email],
      reply_to: business.email,
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) {
    console.error(`[email] Resend failed (${res.status}): ${await res.text()}`);
  }
}
