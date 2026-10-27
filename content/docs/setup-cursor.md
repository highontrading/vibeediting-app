---
title: Add vibe editing to Cursor
description: Use vibe editing from Cursor's agent.
section: Install
order: 5
video:
---

## 1. Install Cursor

Download it from cursor.com and sign in. A paid Cursor plan is recommended for long editing sessions.

## 2. Add the vibe editing MCP

1. Open **Cursor Settings → MCP → Add new global MCP server**. This opens the file `mcp.json`.
2. Paste this, with **your** license key:

```json
{
  "mcpServers": {
    "{{SERVER_NAME}}": {
      "command": "npx",
      "args": ["-y", "{{MCP_PACKAGE}}"],
      "env": {
        "{{LICENSE_ENV}}": "VIBE-XXXX-XXXX-XXXX-XXXX"
      }
    }
  }
}
```

3. Save the file. Back in **Settings → MCP**, `{{SERVER_NAME}}` should show a green dot.

## 3. Open your video folder

Use **File → Open Folder** and pick the folder with your videos. Then open the chat in **Agent** mode.

Next: [Activate your license](/docs/activate-license).
