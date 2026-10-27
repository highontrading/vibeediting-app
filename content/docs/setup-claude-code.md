---
title: Add vibeediting to Claude Code
description: Install Claude Code and connect the vibeediting MCP.
section: Install
order: 3
video:
---

## 1. Install Claude Code

You need a **Claude Pro** plan or higher.

**Mac:** open Terminal and run:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows:** open PowerShell and run:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Then type `claude` and log in with your Claude account when asked.

## 2. Add the vibeediting MCP

Replace `VIBE-XXXX-XXXX-XXXX-XXXX` with **your** license key, then run the command.

**Mac:**

```bash
claude mcp add {{SERVER_NAME}} --scope user --env {{LICENSE_ENV}}=VIBE-XXXX-XXXX-XXXX-XXXX -- npx -y {{MCP_PACKAGE}}
```

**Windows:**

```powershell
claude mcp add {{SERVER_NAME}} --scope user --env {{LICENSE_ENV}}=VIBE-XXXX-XXXX-XXXX-XXXX -- cmd /c npx -y {{MCP_PACKAGE}}
```

`--scope user` makes vibeediting available in every folder, not just one project.

## 3. Check that it is connected

```bash
claude mcp list
```

You should see `{{SERVER_NAME}}` with a ✓ **Connected** status. Inside Claude Code you can also type `/mcp` to see it.

## 4. Open your video folder

Always start Claude Code **inside the folder that has your videos**:

```bash
cd ~/Videos/my-reel
claude
```

Next: [Activate your license](/docs/activate-license).
