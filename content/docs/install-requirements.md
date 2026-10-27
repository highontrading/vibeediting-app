---
title: Install Node.js and FFmpeg
description: Two free tools that vibeediting uses on your computer.
section: Start here
order: 2
video:
---

vibeediting needs two free tools:

- **Node.js** runs the vibeediting MCP.
- **FFmpeg** is the video engine that does the actual cutting and rendering.

You install them once.

## On Mac

1. Open the **Terminal** app (press `Cmd + Space`, type *Terminal*, press Enter).
2. Install Homebrew, the Mac app installer, if you don't have it yet. Paste this and press Enter:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. Install Node.js and FFmpeg:

```bash
brew install node ffmpeg
```

## On Windows

1. Open **PowerShell** (press the Windows key, type *PowerShell*, press Enter).
2. Paste these two lines, one at a time:

```powershell
winget install -e --id OpenJS.NodeJS.LTS
```

```powershell
winget install -e --id Gyan.FFmpeg
```

3. **Close PowerShell and open it again** so it can find the new tools.

## Check that it worked

Run these. Each one should print a version number:

```bash
node -v
ffmpeg -version
```

If you see *"command not found"* or *"not recognized"*, restart your computer and try again. Still stuck? See [Troubleshooting](/docs/troubleshooting).
