# Prompt: build the vibe editing MCP

Copy everything below the line into a new Claude Code session, in the new (empty) repository for the MCP.

---

You are building **vibe editing**, a commercial MCP server that lets people edit their videos by talking to the AI agent they already use: Claude Code, Codex, Cursor or any other MCP client. This repository is only the MCP. The sales website (vibeediting.app) already exists in another repository. Read this whole brief first. Then reply with a short plan, your stack choices and any questions, and **wait for my go-ahead before writing code**.

## 1. The product

- **Buyer:** creators, founders and editors (India first) who want their videos edited: talking-head Reels/Shorts, YouTube long-form, podcast clips, simple ads. Most are **not developers**.
- **How it's used:** the buyer installs Claude Code / Codex / Cursor on their own Mac or Windows computer, adds this MCP with one command from our tutorials, opens their video folder, and types things like *"Cut the silences, add yellow Hinglish captions and a title card, make it a 9:16 reel."* The agent calls our tools, and the finished video appears in their folder.
- **Everything runs on the user's computer.** Footage is never uploaded to us. We run no video servers and pay for no compute. The only network calls are: the license check to our website, optional stock-footage searches with the user's own free API keys, and one-time model downloads.
- **No AI video, image or audio generation** (no Sora, Veo, voice cloning or AI music). Anthropic's connector directory bans generative media, and we don't want it. B-roll is either:
  1. **motion graphics the AI agent writes as code** (titles, counters, charts, lower-thirds, call-outs) that we render locally, or
  2. **free stock clips** from Pexels / Pixabay.
- **Sold once** (placeholder ₹1,499) through Razorpay on the website. The buyer gets a license key `VIBE-XXXX-XXXX-XXXX-XXXX` that works on **2 computers**.

## 2. Contract with the website (must match exactly)

The website and its tutorials are already live with these values. Keep them, or tell me the moment one needs to change.

| Thing | Value |
|---|---|
| MCP server name | `vibeediting` |
| npm package | `@vibeediting/mcp` (I must create the `@vibeediting` npm org; tell me when to do it) |
| Start command | `npx -y @vibeediting/mcp` |
| License env var | `VIBE_LICENSE_KEY` |
| Stock footage env vars | `PEXELS_API_KEY`, `PIXABAY_API_KEY` (optional) |
| API base URL | `https://vibeediting.app`. Read the override `VIBE_API_URL` for testing (the site currently also runs at `https://vibeediting-app.vercel.app`) |

The tutorials tell users to install like this:

```bash
# Claude Code (Mac)
claude mcp add vibe editing --scope user --env VIBE_LICENSE_KEY=VIBE-XXXX-XXXX-XXXX-XXXX -- npx -y @vibeediting/mcp
# Claude Code (Windows)
claude mcp add vibe editing --scope user --env VIBE_LICENSE_KEY=VIBE-XXXX-XXXX-XXXX-XXXX -- cmd /c npx -y @vibeediting/mcp
# Codex
codex mcp add vibe editing --env VIBE_LICENSE_KEY=VIBE-XXXX-XXXX-XXXX-XXXX -- npx -y @vibeediting/mcp
```

Cursor uses `mcp.json` with `command: "npx"`, `args: ["-y", "@vibeediting/mcp"]` and `env: { VIBE_LICENSE_KEY }`.

The tutorials also tell users to say **"Check my vibe editing license"** and **"Deactivate vibe editing on this computer"**. The website's marketing shows these tool names, so keep them: `analyze_video`, `cut_silences`, `add_captions`, `render_motion_graphic`, `export_video`, `check_license`, `deactivate_this_computer`.

### License API (already built on the website)

**`POST {API}/api/license/verify`**

- Body: `{ "licenseKey": string, "machineId": string (8–128 chars), "mcpVersion"?: string }`
- `200 { "valid": true, "plan": "lifetime", "expiresAt": null, "activations": { "used": 1, "max": 2 } }`
- `200 { "valid": false, "reason": "invalid_format" | "not_found" | "revoked" | "expired" | "activation_limit" }`
- `400 { "valid": false, "reason": "bad_request" }`, `500 { "valid": false, "reason": "server_error" }`
- The first call from a new computer registers it. More than 2 computers gives `activation_limit`.

**`POST {API}/api/license/deactivate`**

- Body: `{ "licenseKey", "machineId" }` → `{ "ok": true | false }`. This frees the computer's slot.

**Rules:**

- **Key format:** `VIBE-` plus 4 groups of 4 characters from `23456789ABCDEFGHJKMNPQRSTVWXYZ`. Trim and upper-case what the user pastes.
- **machineId:** a stable SHA-256 hash of the OS machine id plus the username. Never send raw personal data.
- **Cache:** store a valid result in `~/.vibeediting/license.json` with the time it was checked. Re-check at most every 24 hours.
- **Offline grace:** if the server can't be reached, accept a cached valid result for up to **7 days**. A bad network must never block someone's editing.
- **Missing or invalid key:** every editing tool returns a friendly message that explains the fix and links `https://vibeediting.app/docs/activate-license`. The server must still start, so the user can see what's wrong.
- **Messages by reason:**
  - `not_found` / `invalid_format`: "Check your key for typos."
  - `activation_limit`: "Your key is in use on 2 computers. Deactivate one, or email support."
  - `revoked`: "This key was disabled. Contact support."
  - `expired`: "Your license has expired."
- A determined person can patch out a local license check. That's accepted; the goal is to stop casual key sharing.

## 3. Tech direction (verify current versions and docs before choosing; my knowledge may be outdated)

- **Language and SDK:** TypeScript on Node.js 20+ (the tutorials install Node LTS), built on the official `@modelcontextprotocol/sdk`, using the **stdio** transport. Use zod for tool input schemas. Publish to npm as above.
- **ffmpeg / ffprobe:** the tutorials have users install FFmpeg with Homebrew (Mac) or winget (Windows), so detect them on PATH. If they're missing, give a clear message with the install link. Optionally fall back to a bundled static build if the licence and package size are reasonable.
- **Transcription:** local Whisper with **word-level timestamps**. It must handle Hindi, English and Hinglish, and work on Mac (Apple Silicon and Intel) and Windows **without Python**. Compare whisper.cpp bindings with transformers.js / onnxruntime-node and recommend one.
  - Models download on first use with a progress message. Default to a small multilingual model, and let the user choose a bigger one.
  - Also allow an optional bring-your-own cloud key (e.g. Deepgram / AssemblyAI / OpenAI) for speed, off by default.
- **Captions:** generate `.ass` subtitle files with word-by-word highlight styles and burn them in with ffmpeg/libass.
  - Bundle a few open-licence (OFL) fonts, including one with Devanagari, e.g. Noto Sans Devanagari.
  - Also export `.srt`.
- **Motion graphics:** the agent writes small animation code and we render it to video locally.
  - Evaluate **Remotion** (check its licence: individuals and small companies are free, but a commercial product that bundles it may need a company licence; tell me the facts and the cost).
  - Also evaluate **HyperFrames** / an HTML-CSS-canvas renderer (headless browser to frames to ffmpeg) and plain ffmpeg filters.
  - Recommend one, with a fallback that needs no extra install.
- **Stock footage:** Pexels and Pixabay APIs with the user's own keys. Download into the project, and record the source URL and licence in a `credits.json`.
- **Cross-platform:**
  - Paths with spaces, Windows drive letters and `cmd /c npx`.
  - Never block the event loop during renders.
  - Long jobs report MCP progress notifications.

## 4. How the MCP should work

**Project model:**

- When editing starts, create a hidden working folder `.vibeediting/` next to the video. It holds proxies, transcripts, the project file and the render cache.
- Finished files go to `exports/`.
- **Never modify or delete the user's original files.**
- Only read and write inside the folder the agent was started in, plus our own `~/.vibeediting/`. Reject paths outside it.

**Plan, then render:**

- Edits build up in a JSON **edit decision list / timeline**: clips with in/out points, caption track, overlay track, audio track, aspect ratio and style.
- The agent changes this plan cheaply, shows it to the user for approval, can render a **fast low-resolution preview**, and renders the final video only once.
- This keeps the user's Claude usage low. Usage limits are the #1 complaint in this market.

**Keep token use small:**

- Tools return short summaries and file paths, never huge dumps.
- Long transcripts are paginated or searchable.
- To let the agent "see" the video, return a few small JPEG contact sheets (frame grids with timestamps) as MCP image content, never dozens of frames.

**Long renders** run as jobs: `render` returns a job id plus progress, and `get_render_status` returns the result. This avoids client tool timeouts.

**Server `instructions`:** use the MCP server instructions plus **MCP prompts** to teach the agent the workflow:

1. Analyse.
2. Propose a plan.
3. Wait for the user's OK.
4. Preview.
5. Fix.
6. Final render.

Prompts to ship: talking-head reel, YouTube long-form edit, podcast → Shorts, add B-roll.

**Style system:**

- `my-style.json` holds fonts, colours, caption style, title-card style, music, pacing and safe margins.
- Ship 4–6 built-in presets (e.g. bold yellow pop, clean minimal, Hinglish pop, podcast).
- "Save this as my default" writes to `~/.vibeediting/styles/`.

## 5. Tools (suggested; refine the list and schemas in your plan)

**Setup:**

- `check_setup`: ffmpeg/ffprobe found, versions, license status, models downloaded, disk space.
- `check_license`
- `deactivate_this_computer`

**Understand:**

- `probe_media`: duration, resolution, fps, audio and rotation.
- `transcribe`: language auto-detect or forced, word timestamps, cached.
- `get_transcript`: paginated or search.
- `analyze_video`: hook check of the first 3 seconds, pacing, silences, loudness (EBU R128), scene changes, slow parts, a contact sheet, plus concrete suggestions.
- `detect_silences`

**Edit plan:**

- `create_project`
- `get_project`
- `cut_silences`: threshold and min-gap options; keeps natural pauses.
- `remove_fillers`: "umm", "uh", "matlab", "basically", etc., configurable, Hindi included.
- `remove_retakes`: suggests repeated sentences for the agent to confirm.
- `trim`
- `split`
- `reorder_clips`
- `set_aspect_ratio`: 9:16 / 1:1 / 16:9 with crop position. Smart reframe with face tracking can be phase 2.
- `add_captions`: style, language, position, max words per line, highlight colour.
- `add_title_card`
- `add_lower_third`
- `add_zoom`: punch-in on emphasis.
- `add_text_overlay`
- `render_motion_graphic`: from agent-written code or a template, placed at a timestamp.
- `search_stock_footage`
- `add_broll`
- `add_music`: the user's own file, with auto-ducking under speech.
- `normalize_audio`: −14 LUFS.
- `denoise_audio`

**Output:**

- `preview_video`: fast, low resolution.
- `render` / `export_video`: final; H.264 MP4, platform presets for Instagram Reels / YouTube Shorts / YouTube.
- `get_render_status`
- `export_subtitles`: .srt.
- `make_shorts_from_long_video`: finds the best 30–60s moments from the transcript and creates one project per short.
- **Later:** `export_timeline` to FCPXML/EDL for Premiere Pro and DaVinci Resolve. The website shows this as "coming soon".

**Style:** `list_styles`, `apply_style`, `save_style`.

## 6. Packaging and distribution

- **npm:** publish `@vibeediting/mcp`. Keep the install small and download big models lazily.
- **Claude Code plugin:**
  - Also ship a plugin (`.claude-plugin/plugin.json` plus `marketplace.json`) that bundles the MCP server config and **Agent Skills** (`SKILL.md` files) for the workflows above, so Claude follows the plan → approve → preview → render loop.
  - Check the current Claude Code plugin docs for the exact format and how to pass `VIBE_LICENSE_KEY` (user config).
  - The skills folder should also work with Codex and other agents that support Agent Skills.
- **Directory listing:** keep it eligible for Anthropic's directory later. That means no generative media, no hidden instructions, no logging of conversation data, and a privacy policy (already on the website).
- **Privacy:** no telemetry or analytics by default. Only the license call (key, hashed machine id and version) leaves the machine, plus the optional stock-footage searches.

## 7. Quality bar

- **Tests:**
  - Unit tests for the timeline maths, caption timing, the license client (mock server: valid, each reason, offline grace, cache expiry) and path-safety checks.
  - Integration tests that generate small fixture videos with ffmpeg `lavfi` (tone plus silence, colour bars, a sine voice).
  - An end-to-end test that drives the server through the MCP SDK client.
- **Manual checks:** test with the MCP Inspector, and give me a checklist for testing in Claude Code on Mac and Windows.
- **CI:** GitHub Actions on macOS, Windows and Ubuntu, covering lint, typecheck, tests and `npm pack`.
- **Docs:**
  - A short README.
  - `docs/tools.md` with every tool, its inputs and an example prompt.
  - A changelog.
  - Write in simple English; I'm not a native speaker.
- **Errors** must be human-readable and say what to do next, for example: "FFmpeg is not installed. On Mac run: brew install ffmpeg".

## 8. Milestones (adjust in your plan)

1. **Skeleton:** MCP server, `check_setup`, license client with cache and grace period, `probe_media`, tests, CI.
2. **Talking-head reel end to end:** transcribe, cut silences and fillers, captions, 9:16, title card, preview, render. **This is the demo that sells the product, so polish it first.**
3. **Analysis:** `analyze_video` with contact sheets and hook/pacing notes, plus loudness and audio clean-up.
4. **B-roll:** motion graphics renderer and templates, plus Pexels/Pixabay stock.
5. **Long-form:** YouTube edits, chapters, `make_shorts_from_long_video`, SRT.
6. **Packaging:** Claude Code plugin and skills, styles, npm publish dry-run, docs.
7. **Later:** FCPXML/EDL export, smart reframe with face tracking.

At the end of each milestone, show me a real before/after video made by the tools, and tell me what to test.

## 9. Working style

- Ask me when a choice changes cost, licensing or the user experience. Otherwise pick sensible defaults and say what you chose.
- Commit in small steps with clear messages, and don't publish to npm without asking me.
- If something in this brief is outdated or wrong (an API, a licence, a docs format), say so and suggest the fix instead of silently working around it.
