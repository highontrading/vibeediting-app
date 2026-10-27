---
title: Add vibeediting to Codex
description: Use vibeediting with OpenAI's Codex CLI.
section: Install
order: 4
video:
---

## 1. Install Codex

You need a ChatGPT plan that includes Codex (for example ChatGPT Plus).

```bash
npm install -g @openai/codex
```

Run `codex` once and sign in with your ChatGPT account.

## 2. Add the vibeediting MCP

Replace `VIBE-XXXX-XXXX-XXXX-XXXX` with your license key:

```bash
codex mcp add {{SERVER_NAME}} --env {{LICENSE_ENV}}=VIBE-XXXX-XXXX-XXXX-XXXX -- npx -y {{MCP_PACKAGE}}
```

**Or** add it by hand. Open the file `~/.codex/config.toml` (on Windows: `C:\Users\YOU\.codex\config.toml`) and add:

```toml
[mcp_servers.{{SERVER_NAME}}]
command = "npx"
args = ["-y", "{{MCP_PACKAGE}}"]
env = { {{LICENSE_ENV}} = "VIBE-XXXX-XXXX-XXXX-XXXX" }
```

## 3. Check it

Start Codex in your video folder and type `/mcp`. You should see `{{SERVER_NAME}}` and its tools.

Next: [Activate your license](/docs/activate-license).
