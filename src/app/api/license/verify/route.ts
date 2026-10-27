import { z } from "zod";
import { verifyAndActivate } from "@/lib/license";

const Body = z.object({
  licenseKey: z.string().min(1).max(64),
  machineId: z.string().min(8).max(128),
  mcpVersion: z.string().max(32).optional(),
});

// Called by the vibe editing MCP. See MCP_INTEGRATION.md.
export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ valid: false, reason: "bad_request" }, { status: 400 });
  }
  try {
    const result = await verifyAndActivate({
      key: parsed.data.licenseKey,
      machineId: parsed.data.machineId,
      mcpVersion: parsed.data.mcpVersion,
    });
    return Response.json(result);
  } catch (err) {
    console.error("[license/verify]", err);
    return Response.json({ valid: false, reason: "server_error" }, { status: 500 });
  }
}
