# License API: contract for the vibe editing MCP

This website sells license keys. The MCP (built in a separate repository) must check the key with this
website. Give this file to the Claude Code session that builds the MCP.

## Key format

`VIBE-XXXX-XXXX-XXXX-XXXX`: 4 groups of 4 characters from `23456789ABCDEFGHJKMNPQRSTVWXYZ`.
The server upper-cases and trims what the user pastes, so the MCP can send it as-is.

The user provides the key in the environment variable **`VIBE_LICENSE_KEY`** (set in `src/config/site.ts` → `mcp.licenseEnvVar`).
The tutorials install the MCP with `npx -y @vibeediting/mcp` (→ `mcp.npmPackage`). Change both places together.

## `POST https://vibeediting.app/api/license/verify`

Call it when the MCP starts. It also registers the computer the first time it is seen.

Request body (JSON):

| Field | Type | Notes |
|---|---|---|
| `licenseKey` | string | from `VIBE_LICENSE_KEY` |
| `machineId` | string, 8–128 chars | stable per computer, e.g. SHA-256 of OS machine id + username. Never send personal data in clear text. |
| `mcpVersion` | string, optional | e.g. `"0.3.1"` |

Responses (HTTP 200):

```json
{ "valid": true, "plan": "lifetime", "expiresAt": null, "activations": { "used": 1, "max": 2 } }
```

```json
{ "valid": false, "reason": "invalid_format" | "not_found" | "revoked" | "expired" | "activation_limit" }
```

HTTP 400 `{ "valid": false, "reason": "bad_request" }` for a malformed body, and HTTP 500
`{ "valid": false, "reason": "server_error" }` when the server has a problem.

## `POST https://vibeediting.app/api/license/deactivate`

Frees the slot for the current computer (for a "deactivate vibe editing on this computer" tool).

Body: `{ "licenseKey": "...", "machineId": "..." }` → `{ "ok": true }` if a slot was freed, `{ "ok": false }` otherwise.

## Recommended MCP behaviour

1. On start, read `VIBE_LICENSE_KEY`. If missing, every tool returns a friendly message with a link to
   `https://vibeediting.app/docs/activate-license`.
2. Call `/api/license/verify`. On `valid: true`, cache the result locally (e.g. `~/.vibeediting/license.json`)
   with the time of the check.
3. **Offline grace:** if the server cannot be reached, accept a cached valid result for up to 7 days, so a
   bad network never blocks someone's editing.
4. Re-check at most once every 24 hours.
5. Map each `reason` to a clear message:
   - `not_found` / `invalid_format` → "Check your key for typos."
   - `activation_limit` → "Your key is in use on 2 computers. Deactivate one, or email support."
   - `revoked` → "This key was disabled. Contact support."
   - `expired` → "Your license has expired."
6. Expose two small tools: `check_license` and `deactivate_this_computer`. The tutorials tell users to ask for these.

The key check on a local MCP can be patched out by a determined person. That is acceptable: the goal is to
stop casual key sharing, not to be unbreakable.
