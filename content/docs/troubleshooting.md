---
title: Troubleshooting
description: Fixes for the most common setup problems.
section: Help
order: 10
---

## "command not found: npx" or "node is not recognized"

Node.js is not installed, or your terminal was opened before installing it. Close the terminal, open it again, and run `node -v`. If it still fails, redo [Install Node.js and FFmpeg](/docs/install-requirements) and restart your computer.

## The MCP shows "Failed" or "Disconnected"

- Run `npx -y {{MCP_PACKAGE}}` in your terminal and read the error.
- On **Windows with Claude Code**, make sure you used `cmd /c npx` (see [Claude Code setup](/docs/setup-claude-code)).
- Check that your license key has no extra spaces.

## "ffmpeg not found"

FFmpeg is not installed or not on your PATH. Run `ffmpeg -version`. If it fails, reinstall it and restart your computer.

## The AI says it can't find my video

Start your AI agent **inside the folder that has the video**, or give the full path, like `/Users/you/Videos/raw.mp4` or `C:\Users\you\Videos\raw.mp4`.

## I hit my Claude / ChatGPT usage limit

Editing uses your AI plan's limits. To use less:

- Edit shorter clips, or one chapter at a time.
- Ask for a plan first, so you don't render the same video many times.
- Start a fresh chat for each new video.

## Still stuck?

Email {{SUPPORT_EMAIL}} with:

1. Your computer (Mac or Windows) and AI agent (Claude Code, Codex or Cursor)
2. A screenshot of the error
3. The email you bought with

We usually reply within 24 hours.
