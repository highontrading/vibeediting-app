# Packaging, Distribution and Licensing for a Commercial AI-Agent Extension (vibeediting.app), as of October 2026

Research date: 2026-10-27. Primary sources are Anthropic's current docs on claude.com/docs and code.claude.com/docs, which were reorganized in 2026 around a single developer portal at claude.ai/directory/manage. Fetches of modelcontextprotocol.io, polar.sh and docs.lemonsqueezy.com failed with DNS errors in this environment, so those sections rely on secondary sources and are flagged.

## 1. Terminology and formats: MCP server, connector, plugin, marketplace, Agent Skill, Desktop Extension (MCPB), and which clients run each

### Takeaway
In Anthropic's current terms, a **remote MCP server** that is listed or added in Claude is a **"connector"**. A **plugin** is the bundle that ships skills, commands, agents, hooks and MCP server references together, and it is now the main unit Anthropic distributes, in Claude Code and also in claude.ai chat and Cowork. **Skills** (SKILL.md) are portable across about 30 agent tools. **MCPB (.mcpb, formerly .dxt)** is a Claude Desktop-only package for a local server, and Anthropic has stopped accepting it into the directory. For vibeediting.app, the accurate name for the offering is "a Claude plugin (with skills) backed by the vibeediting MCP connector," and the product brand is vibeediting.app.

### Cited Findings
**Connector / remote MCP server**
- A connector submission "is an MCP server". Remote MCP servers are "internet-hosted servers that provide tools and data to Claude". **MCP Apps** are remote MCP servers that "surface interactive UI". Local servers can't be submitted on their own: "include it in a plugin instead." — [Claude docs: Submit a connector](https://claude.com/docs/connectors/building/submission)
- Remote MCP servers "should support the Streamable HTTP transport". Remote servers that require authentication "must use secure OAuth 2.0". — [Anthropic Software Directory Policy §5D, §5F](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy)
- A third-party summary of the older MCP directory policy says SSE is still allowed but slated for deprecation. — [search summary of support.claude.com MCP directory policy](https://support.claude.com/en/articles/11697096-anthropic-mcp-directory-policy). That standalone policy was "consolidated into the Anthropic Software Directory Policy" (last updated April 15, 2026). — [same URL](https://support.claude.com/en/articles/11697096-anthropic-mcp-directory-policy)
- Anthropic's table contrasts the two. Remote connectors suit "Distribution across Claude on web, mobile, and desktop" and "Centralized updates pushed to all users". Local MCPB suits "Direct filesystem access", "Integration with locally installed tools", and "Privacy-sensitive operations that should not leave the user's machine". — [Claude docs: Build a desktop extension with MCPB](https://claude.com/docs/connectors/building/mcpb.md)

**Desktop Extension / MCP Bundle (MCPB)**
- "An MCP Bundle (`.mcpb`) is a zip archive containing a local MCP server and a `manifest.json`, which Claude Desktop installs in a single click." It runs over stdio, bundles its dependencies, works offline, and needs no OAuth. Node.js is "strongly recommended" because it ships with Claude Desktop. Claude Desktop runs on macOS and Windows. The CLI is `npm install -g @anthropic-ai/mcpb`, then `mcpb init` / `mcpb pack`. `user_config` in manifest.json generates a settings UI, including handling for sensitive values such as API or license keys. — [Claude docs: MCPB](https://claude.com/docs/connectors/building/mcpb.md)
- "Desktop extension listings in the directory are deprecated, and the directory no longer accepts MCPB submissions. To distribute a local MCP server through the directory, include it in a plugin." Users can still install a .mcpb file themselves by double-click, by drag-and-drop, or from Settings > Extensions > Advanced settings > Install Extension. — [Claude docs: MCPB](https://claude.com/docs/connectors/building/mcpb.md)
- Local connectors must include a "Privacy Policy" section in README.md and a `privacy_policies` array in manifest.json (manifest_version 0.2+). "Missing or incomplete privacy policies result in immediate rejection." — [Claude docs: Submit a connector](https://claude.com/docs/connectors/building/submission)

**Claude plugin and plugin marketplace**
- A marketplace is "a directory or repository with a `.claude-plugin/marketplace.json` file that lists your plugins and where to fetch each one". It requires `name`, `owner` and a `plugins` array, and each entry needs `name` and `source`. Users run `/plugin marketplace add <owner>/<repo>` (or `claude plugin marketplace add`), then `/plugin install <plugin>@<marketplace>`. The `claude plugin validate` command checks the structure. "The repository can be private." — [Claude Code docs: Create a marketplace](https://code.claude.com/docs/en/plugin-marketplaces)
- Plugin sources can be a relative path, `github`, `git-subdir`, `url` (any git host), `archive` (a zip over HTTPS), `npm`, or `command` (a directory produced by running a command on the user's machine). Names such as `claude-plugins-official` are reserved for official Anthropic marketplaces. — [Claude Code docs: Create a marketplace](https://code.claude.com/docs/en/plugin-marketplaces)
- Plugin components work differently on each surface ("Chat" = claude.ai web, desktop and mobile; "Cowork"; "Claude Code" = terminal, IDE extensions and the desktop Code tab). — [Claude docs: Plugin feature support across platforms](https://claude.com/docs/plugins/platform-support.md)
  - Skills: load in Chat, Cowork and Claude Code.
  - Commands: load as a skill in Chat, and load normally in Cowork and Claude Code.
  - Agents and hooks: ignored in Chat, load in Cowork and Claude Code.
  - Remote MCP server (http/sse, fixed URL): appears on the plugin's Connectors tab in Chat and works once connected. Loads in Cowork and Claude Code.
  - **Local MCP server (including .mcpb): ignored in Chat.** In Cowork it loads only "when the Cowork session runs on your computer". Loads in Claude Code.
  - MCP server using `${user_config.*}`: prompts for values in Claude Code. Ignored in Chat when the URL contains the reference.
  - Top-level `bin/` executables: "Can't be installed" in Chat or Cowork, so the whole plugin is refused there.
- A plugin installed on a claude.ai account "also appears in Claude Code as a synced plugin". claude.ai allows up to 25 self-added marketplaces, with each plugin capped at 5,000 files and 200 MB. Users can also install from **Add > Upload plugin** with a zip. — [same](https://claude.com/docs/plugins/platform-support.md)

**Agent Skills (SKILL.md)**
- A skill is a folder with a required `SKILL.md` (YAML frontmatter with at least `name` and `description`, then Markdown instructions), plus optional `scripts/`, `references/` and `assets/`. Anthropic published it as an open standard at agentskills.io in December 2025. Codex, Gemini CLI, Cursor and Claude Code are reported as adopters, with "30+" tools as of spring 2026 and a shared `.agents/skills/` directory. — [noqta.tn](https://noqta.tn/en/blog/agent-skills-skill-md-universal-ai-coding-standard-2026); [Daniel Vaughan, Codex blog, May 2026](https://codex.danielvaughan.com/2026/05/05/agent-skills-open-standard-portable-skills-codex-cli-cross-agent/). These are secondary sources: I could not fetch agentskills.io directly.
- "Skills aren't a standalone submission type. Bundle them in a plugin." — [Claude docs: Submit a connector](https://claude.com/docs/connectors/building/submission)

**Other clients**
- OpenAI's **Apps SDK** (ChatGPT apps) is built on MCP, open-sourced and in preview. The ChatGPT App Directory launched in December 2025. — [TechCrunch, Oct 2025](https://techcrunch.com/2025/10/06/openai-launches-apps-inside-of-chatgpt); [Moburst guide, Mar 2026](https://www.moburst.com/blog/chatgpt-app-directory-explained-what-brands-need-to-know/). OpenAI's help center also has a "Building and sharing plugins" article — [help.openai.com](https://help.openai.com/en/articles/12515353-building-and-sharing-plugins). I did not fetch its contents.
- Existing video MCPs advertise configs for Claude Desktop, Claude Code and Cursor, so stdio MCP is the de facto cross-client format. — [mcp-video listing](https://awesome.ecosyste.ms/projects/github.com%2Fkyanitelabs%2Fmcp-video); [ffmpeg-mcp listing](https://enterprisedna.co/directories/mcp/video-creator-ffmpeg-mcp)

### Inferences
- What to call it, technically: (a) **"vibeediting MCP server"** for the engine. Call it a **"connector"** only for the remote/Claude-listed form. (b) **"vibeediting plugin for Claude Code / Claude"** for the bundle of skills, commands and the MCP reference. (c) **"Agent Skills"** for the SKILL.md workflow pack. "Extension" or "desktop extension" now means .mcpb specifically and is deprecated in the directory, so avoid it as the primary label.
- Cross-client reach, from most to least portable: a remote Streamable-HTTP MCP server (Claude web, desktop and mobile, Claude Code, ChatGPT via Apps SDK, Cursor, VS Code) > a local stdio MCP server published to npm/PyPI (any desktop MCP client, but not Claude web or mobile) > SKILL.md (about 30 agent tools, but instructions only) > a Claude plugin (Anthropic surfaces only) > .mcpb (Claude Desktop only).
- Ship one core and several thin wrappers: a single MCP server codebase, exposed both as a local stdio binary and as a remote HTTP endpoint, plus a Claude plugin that bundles skills and points at both, plus the same skills folder reused in `.agents/skills/` for Codex, Gemini CLI and Cursor.

### Gaps
- I could not fetch the modelcontextprotocol.io transport or authorization spec pages (DNS failure), so I have no confirmed current spec version string. 2025-11-25 is the latest version I know of, and a later revision may exist.
- I did not verify ChatGPT, Codex, Gemini CLI or VS Code plugin and extension formats from primary docs. OpenAI's own "plugins" help article (12515353) exists, but I did not read it.

## 2. Video-editing specifics: local files vs remote MCP, and how existing video MCPs handle it

### Takeaway
A remote MCP server cannot read the user's disk, and Claude web and mobile ignore local MCP servers entirely. Any tool that touches raw footage, ffmpeg or an NLE (Resolve, Premiere) must therefore run locally, through Claude Code, Claude Desktop/Cowork on the user's machine, Cursor and similar clients. Every existing video MCP I found is local stdio and takes file paths as parameters. A hybrid design (a local executor plus a remote "brain" or licensing/rendering service) is the natural fit, and it is also the design that makes the product protectable.

### Cited Findings
- Local MCP servers (including .mcpb) are "Ignored" in claude.ai Chat. In Cowork they load only when "the Cowork session runs on your computer". — [Claude docs: Platform support](https://claude.com/docs/plugins/platform-support.md)
- MCPB/local servers can "reach local files, locally installed tools, and systems behind the user's firewall". Remote connectors "run on your servers via HTTPS and are accessed through Anthropic's infrastructure". — [Claude docs: MCPB](https://claude.com/docs/connectors/building/mcpb.md)
- **DaVinci Resolve MCP (samuelgursky/davinci-resolve-mcp):**
  - It wraps the official Resolve Scripting API. One listing describes "324 API methods grouped into 26 context-efficient tools", and its installer configures Claude Desktop and Claude Code.
  - It requires Resolve's external scripting preference set to "Local".
  - On the free edition, `scriptapp("Resolve")` refuses a foreign process, so external scripting needs **Resolve Studio**.
  - Sources: [mcpservers.org listing](https://mcpservers.org/en/servers/github-com-samuelgursky-davinci-resolve-mcp); [Glama](https://glama.ai/mcp/servers/y5vtdfkv6k)
- **resolve-mcp (PyPI):** MIT-licensed, targets Resolve scripting API v20.3. Listings disagree on the tool count (215+ vs 295+). — [PyPI](https://pypi.org/project/resolve-mcp/)
- **resolve-mcp-pro (itch.io):** a *paid/downloadable* Resolve bridge that runs from Resolve's Scripts menu. It needs Resolve 20/21 (free or Studio), plus whisper.cpp and ffmpeg for transcription. It is an example of selling a local video MCP as a downloadable product. — [itch.io](https://y1uda.itch.io/resolve-mcp-pro)
- **ffmpeg MCPs:**
  - KyaniteLabs/mcp-video: Apache-2.0, "87 FFmpeg and Hyperframes tools, Python client, and CLI", targeting Claude Code and Cursor. — [listing](https://awesome.ecosyste.ms/projects/github.com%2Fkyanitelabs%2Fmcp-video)
  - video-creator/ffmpeg-mcp: MIT, about 134 stars, trim/concat/overlay plus local file search. ffmpeg must be preinstalled. — [listing](https://enterprisedna.co/directories/mcp/video-creator-ffmpeg-mcp)
  - Another ffmpeg-mcp (npm `ffmpeg-mcp-server`) bundles its own ffmpeg binary and offers silence removal. — [search summary](https://enterprisedna.co/directories/mcp/video-creator-ffmpeg-mcp)
  - Kush36Agrawal/video_editor_mcp: a single `execute_ffmpeg` tool, possibly stale. — [listing](https://awesome.ecosyste.ms/projects/github.com%2Fkush36agrawal%2Fvideo_editor_mcp)
  - Across all of these, file paths are passed as tool parameters. Media is not uploaded.
- **Premiere Pro:** I found no shipped Premiere MCP. One "MCP Video Editing Assistant" lists Premiere integration as a roadmap item only. — [Glama](https://glama.ai/mcp/servers/fd830im1qq)
- **Remotion:**
  - The official Remotion repo ships *skills* (e.g., `npx skills add remotion-dev/remotion --skill video-report --agent claude-code`), not an official MCP server. — [claudemarketplaces.com](https://claudemarketplaces.com/skills/remotion-dev/remotion/video-report)
  - Third-party "Remotion Video MCP" layers SKILL.md over a 17-tool stdio MCP with a render queue. — [Glama](https://glama.ai/mcp/servers/mia0f2l10a)
  - "Remotion Factory" is a *hosted (SSE) remote MCP* for render control, whose premium tiers "may require the payment-signature header documented in server metadata", i.e., x402-style paid remote rendering. — [skillselion](https://skillselion.com/mcp/tool/io.github.Evozim/render-stream)

### Inferences
- Recommended architecture for vibeediting.app:
  - (1) A **local executor** (stdio MCP: ffmpeg probe/cut/silence-detect, whisper transcription, NLE bridges such as the Resolve API or Premiere UXP/ExtendScript, FCPXML/EDL export). Distribute it via a plugin and npm/uvx.
  - (2) A **remote service** (Streamable HTTP + OAuth) for account/entitlement, edit-plan generation, templates/presets, proprietary analysis models, cloud rendering, or upload-and-process.
  - (3) **Skills** that teach the agent the workflow.
- The local executor calls the remote API with the user's token. The protectable value lives server-side.
- A remote-only connector would work in Claude web and mobile only if users upload footage (e.g., to your cloud via a presigned URL or a companion uploader) or work on low-res proxies and transcripts. That is viable for "analyze transcript → produce an edit decision list," but not for local NLE control.
- Resolve integration needs Studio, a real constraint on the creator market (many use the free Resolve, CapCut or Premiere). A Premiere MCP looks like an open gap among the options I found.

### Gaps
- I did not verify Adobe's current scripting surface (UXP vs ExtendScript) for Premiere automation, or whether Adobe has shipped its own MCP/agent integration in 2026.
- I did not confirm CapCut or Final Cut Pro automation options.

## 3. Distribution channels and which allow paid products

### Takeaway
Anthropic's directory (one portal for plugins and connectors, open to any paid Claude plan) is the highest-reach channel. It requires a **public GitHub repo** for plugins and OAuth for authenticated connectors, and it says nothing explicit that forbids a free listing fronting a paid account. **Self-hosted marketplaces** (marketplace.json in a private repo, an authenticated archive URL, or npm) are the cleanest way to ship gated plugin code to paying users. The official MCP Registry is metadata only and accepts only public package sources.

### Cited Findings
**Anthropic directory (claude.ai/directory; "Claude Marketplace" website points to it)**
- "Anyone on a paid Claude plan can submit, there's no partner program to apply to first." Plans: Pro, Max, Team, Enterprise. Free accounts can't submit. There are two listing types: **Plugin bundle** (from a GitHub repo, "which must be public before the listing goes live") and **MCP connector** (from the server URL, no repo needed). — [Claude docs: Publish to the directory](https://claude.com/docs/directory/publish.md)
- Anthropic's recommended pattern for a product: "make two submissions: the server as an MCP connector, then the plugin bundle whose skills teach Claude how to use it. Point the bundle's MCP server configuration at the same URL." — [same](https://claude.com/docs/directory/publish.md)
- Connectors are auto-scanned and by default listed as **Community**. Anthropic may escalate a connector to **Verified** review. Plugins get validation plus a security scan on every version, and human review before first listing. — [same](https://claude.com/docs/directory/publish.md)
- Connector requirements:
  - An HTTPS URL, and OAuth 2.0 if tools act on a user's account.
  - Every tool has a `title` and a `readOnlyHint`/`destructiveHint`.
  - Documentation URL, privacy policy URL, support contact, and icon.
  - A **test account** for reviewers.
  - The listing step (step 4) asks "what users need before they can connect, such as accounts, plans, or other setup", which implies a connector may require a (paid) account.
  - Compliance step: "Seven policy acknowledgments covering the directory guidelines, first-party API usage, financial transactions, AI media generation, prompt injection, conversation data collection, and public documentation."
  - Source: [Claude docs: Submit a connector](https://claude.com/docs/connectors/building/submission)
- Plugin submission:
  - The repo can be private during review, but "Publishing and relisting still need the repository to be public".
  - Data-handling questions ask whether the plugin "sends data to services other than its declared connectors".
  - The security scan can fail with "Sends data to an undisclosed destination".
  - Limit: 10 submissions per org per 24h.
  - Updates are auto-picked from the tracked branch.
  - Listed plugins work "in chat, Cowork, and Claude Code".
  - Source: [Claude docs: Submit your plugin](https://claude.com/docs/plugins/submit.md)
- A third-party news item says the developer portal opened on September 25, 2026 and that MCPB packages are no longer accepted. — [pasqualepillitteri.it](https://pasqualepillitteri.it/en/news/18444/anthropic-portal-submit-plugins-mcp-connectors-claude). The MCPB part is consistent with the official docs. I did not verify the date against Anthropic.

**Self-hosted Claude plugin marketplaces**
- Hosts can be GitHub, any git host, a hosted `marketplace.json` URL, or a shared directory. For private repos, "Claude Code runs `git` on their machine... and relies on whatever credentials that machine already holds. Claude Code has no git token of its own, and `marketplace.json` has no field for one." Users need SSH keys or a stored credential helper (e.g., `gh auth login` + `gh auth setup-git`). — [Claude Code docs: Host and maintain a marketplace](https://code.claude.com/docs/en/plugins/host-marketplace.md)
- **`archive` sources** (a zip over HTTPS, pinned with `sha256`, v2.1.224+) need no git account. They support **`headers` or `headersHelper`** (v2.1.238+): a command that prints `{"Authorization": "Bearer ..."}`. The user must accept the helper command on each install or update, and the helper must read credentials from a file or credential store (credential-like env vars are stripped). Size limits: 256 MiB zip, 1 GiB uncompressed. — [same](https://code.claude.com/docs/en/plugins/host-marketplace.md)
- "Entries carry no audience field, and every user who adds the marketplace sees the whole catalog. Host separate marketplaces for separate audiences." — [same](https://code.claude.com/docs/en/plugins/host-marketplace.md)
- claude.ai (Chat/Cowork) can add marketplaces from GitHub/GHE repos and public GitLab/Bitbucket. — [Claude docs: Platform support](https://claude.com/docs/plugins/platform-support.md)

**Official MCP Registry (registry.modelcontextprotocol.io)**
- You publish with the `mcp-publisher` CLI after a GitHub login. `server.json` names follow a reverse-DNS pattern such as `io.github.<org>/<repo>`. The registry hosts *metadata* pointing at npm, PyPI, NuGet, Docker Hub, or MCPB from GitHub/GitLab releases. "Private registries and alternative mirrors are not allowed." It is still described as a **preview** that may have breaking changes or data resets. — [StackOne](https://www.stackone.com/blog/mcp-registry-how-to-get-listed/); [Glama blog, Jan 2026](https://glama.ai/blog/2026-01-24-official-mcp-registry-serverjson-requirements); [qveris guide](https://qveris.ai/guides/mcp-registry/). These are secondary sources.
- Reported registry size conflicts: about 23,700 servers (Aug 2026) vs "nearly 2,000" (2026). — [qveris](https://qveris.ai/guides/mcp-registry/); [mcpblog](https://mcpblog-dev.pages.dev/blog/2026-03-17-mcp-registry-guide). Unverified.

**Other channels**
- Apify and MCPize are reported to run MCP server marketplaces with revenue share (Apify 80%, MCPize 85%, per one blog, unverified). — [godberrystudios blog](https://godberrystudios-blog.pages.dev/posts/how-to-monetize-mcp-servers-2026/)
- Glama, mcpservers.org, LobeHub, mcp.so and claudemarketplaces.com are aggregators that index GitHub/registry servers and skills (seen throughout the search results above). itch.io is used to sell a paid Resolve MCP. — [itch.io](https://y1uda.itch.io/resolve-mcp-pro)
- ChatGPT App Directory: per an undated OpenAI community post, "you cannot submit an app with monetization for any digital products/services". A March 2026 guide describes Instant Checkout for physical goods, with external redirects for others. — [OpenAI community](https://community.openai.com/t/chatgpt-app-monetization-apps-sdk/1372343); [Moburst](https://www.moburst.com/blog/chatgpt-app-directory-explained-what-brands-need-to-know/). The sources conflict, and status is unverified.

### Inferences
- **Paid products are compatible with the Anthropic directory if the paywall lives in your service, not in the listing.** The free, public plugin repo (skills plus an MCP config pointing at your OAuth-protected server) acts as a funnel. The account/plan requirement is declared in the connector listing's "what users need before they can connect" field. Note that the plugin repo must be public, so whatever is in it is effectively open source.
- For gated *code* (e.g., a proprietary local executor), use a self-hosted marketplace. Options: (a) a private GitHub repo with automatic collaborator invites on purchase, or (b) an `archive` source behind a licensing server, using `headersHelper` to fetch a short-lived token from the user's license file. The archive route avoids requiring a GitHub account and works for non-developer creators.
- For non-Claude clients, publish the local executor to npm (`npx`) or PyPI (`uvx`) and register it in the MCP Registry for discovery. The npm package can be public and still useless without a license, if the value is server-side.

### Gaps
- I found no explicit Anthropic statement on whether a directory plugin may require a paid third-party subscription, or on upsell prompts inside tool responses. The policy prohibits "advertisements, sponsored content, paid product placements" (§4C), and its interaction with in-tool upgrade prompts is untested.
- I did not verify Smithery's or Cursor directory's current monetization terms. Smithery's own docs were not fetched.

## 4. Monetization and gating mechanics: pros, cons and piracy risk

### Takeaway
The only robust gate is **server-side**: a remote MCP (or a remote API that a local MCP calls) that authenticates the user (MCP OAuth 2.1 / bearer token) and checks a Stripe or other subscription on every call. License keys (Keygen, Lemon Squeezy, Gumroad, Polar) are a good fit for gating a local executor's download or activation, but local logic can always be patched. Skills, prompts and plugin repos are plain text and are effectively unprotectable once delivered, and directory plugins must be public anyway.

### Cited Findings
- Monetization models for MCP are per-call, subscription, freemium, or outcome-based. Billing gateways include Stripe and x402. — [godberrystudios](https://godberrystudios-blog.pages.dev/posts/how-to-monetize-mcp-servers-2026/)
- **x402:** the server returns HTTP 402 with payment terms, the agent pays in USDC and retries. It suits pay-as-you-go without accounts. Polar and Stripe suit recurring SaaS that needs user accounts. — [xmcp.dev blog: How to Monetize Your MCP Server (x402 and Polar)](https://xmcp.dev/blog/how-to-monetize-mcp-server)
- **Subscription gating** requires stable user identity (JWT/session) before enforcing plans (PayMCP guidance). — [playbooks.com / paymcp](https://playbooks.com/skills/paymcp/skills/monetization). An open-source "MCP Billing Gateway" proxy adds Stripe subscriptions and x402 to an existing MCP server, but it has zero stars and is unproven. — [mcpservers.org](https://mcpservers.org/hi/servers/sapph1re/mcp-billing-gateway-sdk)
- A hybrid example pairs **Stripe-issued license keys for local use** with **Apify pay-per-event for hosted use**. — [Glama-hosted analysis](https://glama.ai/mcp/servers/@adrianmikula/JakartaMigration/blob/30bdaa1f585075871d014074b283d8ba79f5e1c6/docs/research/MONETIZEMCP_ANALYSIS.md)
- Anthropic connector auth: OAuth 2.0 for authenticated services. The portal lets you have "Anthropic hold your OAuth client" (client ID and secret entered in the portal), and lets you choose "Required when the server asks" if only some tools need sign-in, which enables a freemium tool set. — [Claude docs: Submit a connector](https://claude.com/docs/connectors/building/submission)
- Claude Code plugin `${user_config.*}` values prompt the user in Claude Code (e.g., for a license key), but these are ignored in Chat and Cowork without defaults. — [Claude docs: Platform support](https://claude.com/docs/plugins/platform-support.md)
- MCPB `user_config` gives a settings UI with sensitive-data handling, suitable for a license key field in Claude Desktop. — [Claude docs: MCPB](https://claude.com/docs/connectors/building/mcpb.md)
- Private marketplace access depends on the user's own git credentials. With an `archive` source, `headersHelper` can mint a bearer token for the download. — [Claude Code docs: Host marketplace](https://code.claude.com/docs/en/plugins/host-marketplace.md)
- Directory policy constraints on instructional software: "must not contain hidden, obfuscated, or encoded instructions" (§2G) and "must not direct Claude to dynamically pull behavioral instructions from external sources" (§2F). — [Software Directory Policy](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy)

### Inferences
Each option below lists how it works, its strengths and weaknesses, and its piracy exposure.

1. **Remote MCP with OAuth 2.1 plus a Stripe subscription check per request.**
   - Strengths: works in Claude web, desktop and mobile, Claude Code, and ChatGPT/Cursor. Directory-eligible. Revocable instantly. Supports metering.
   - Weaknesses: you pay for hosting and compute, and it can't touch local files without a local component.
   - Piracy: low, only account sharing (mitigate with seat or device limits).
2. **Local MCP plus license key** (Keygen / Lemon Squeezy License API / Gumroad license verify / Polar license keys), validated online with an offline grace period.
   - Strengths: full local file and NLE access.
   - Weaknesses: the check can be patched out of JS/Python code, and key sharing is possible.
   - Piracy: medium-high unless core features call your server.
3. **Private GitHub repo access as the purchased benefit** (Polar's GitHub repository benefit, or Gumroad + a GitHub invite bot) feeding a private plugin marketplace.
   - Strengths: native to Claude Code's private-marketplace flow and simple.
   - Weaknesses: requires every buyer to have a GitHub account plus SSH or `gh auth`, which is a hard ask for non-dev creators. Once cloned, the code is copied.
   - Piracy: high.
4. **Authenticated `archive` marketplace source with `headersHelper`.**
   - Strengths: no GitHub account needed, and you can revoke future updates.
   - Weaknesses: the user must accept the helper command, and the requirements are recent Claude Code versions (v2.1.238+).
   - Piracy: same as #3 once downloaded.
5. **x402 / pay-per-call** (Coinbase USDC, MCPay-style).
   - Strengths: no accounts.
   - Weaknesses: creators rarely hold USDC, so this is a poor fit for the target market.
   - Piracy: n/a (server-side).
6. **Marketplace rev-share** (Apify pay-per-event, MCPize).
   - Strengths: no billing code.
   - Weaknesses: 15-20% take, a dev audience, and hosted only.
7. **Skills/prompt pack sold as a download** (Gumroad/Lemon Squeezy).
   - Strengths: zero infrastructure.
   - Piracy: trivial, since it is plain Markdown. Treat it as a lead magnet or open source.

**Recommended for vibeediting.app:** an open-source (or source-available) local executor plus free public skills/plugin in Anthropic's directory. The **paid value is server-side**: edit-plan intelligence, style/preset library, transcription/analysis models, cloud render and export, team libraries. It is gated by OAuth plus a Stripe subscription, and usage is metered per minute of footage processed. Use a license key only as a convenience token linking the local executor to the account.

### Gaps
- I could not fetch the Lemon Squeezy License API docs, the Polar GitHub-access benefit docs, or Keygen docs (DNS failures in this environment). The mechanics in option #2/#3 come from background knowledge and should be verified. In particular, I did not confirm whether Lemon Squeezy's license endpoints (activate/validate/deactivate) remain callable without a secret API key, or Lemon Squeezy's post-Stripe-acquisition status.
- I did not verify Stripe's own MCP/agent-toolkit billing features or MCPay specifics from primary docs.
- I did not verify the exact OAuth 2.1 requirements in the current MCP authorization spec (PKCE, dynamic client registration vs Client ID Metadata Documents, protected-resource metadata) from modelcontextprotocol.io.

## 5. Anthropic policy constraints: selling, directory review and branding

### Takeaway
Nothing I found prohibits selling a product that is distributed as a plugin or connector. One clause matters a lot for this product, though: the Software Directory Policy **prohibits "Software that uses AI models to generate images, video, or audio content"** (an exception exists only for design-focused visual aids), and the connector portal requires an "AI media generation" acknowledgment. vibeediting.app should position itself as *editing/automation of user footage*, and should keep any generative video, voice or music features out of the directory-listed tools (or verify with Anthropic). Use "Claude" only descriptively ("works with Claude"), not in the product name.

### Cited Findings
- Policy §4B prohibits "Software that uses AI models to generate images, video, or audio content", with the exception "Only design-focused image software that uses AI models to exclusively create visual aids". — [Anthropic Software Directory Policy](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy). The page said "Updated this week" on 2026-10-27.
- §4A prohibits software that "transfers money... or executes financial transactions autonomously" (unless human-in-the-loop safeguards exist). §4C prohibits "advertisements, sponsored content, paid product placements". — [same](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy)
- Data rules:
  - "Software must only collect data from the user's context that is necessary to perform their function" and "must not collect extraneous conversation data, even for logging purposes" (§1E).
  - Software must not extract data from Claude memory or chat history (§1G).
  - A privacy policy is required if it collects user data or connects to a remote service (§3A).
  - Local MCP servers must use "reasonably current versions of all dependencies" (§5G).
  - Source: [same](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy)
- Plugins "may connect to any Connector approved in the Software Directory" (§3F). — [same](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy)
- The connector portal's compliance step lists acknowledgments including "financial transactions, AI media generation, prompt injection, conversation data collection". — [Claude docs: Submit a connector](https://claude.com/docs/connectors/building/submission)
- All listings must comply with the [Anthropic Software Directory Terms](https://support.claude.com/en/articles/13145338-anthropic-software-directory-terms) (not fetched) and the Policy. By submitting, you agree to maintain security, respond to security issues promptly, and keep descriptions accurate. — [Claude docs: Submit a connector](https://claude.com/docs/connectors/building/submission)
- Branding: Anthropic's trademark guidelines are at [anthropic.com/legal/trademark-guidelines](https://www.anthropic.com/legal/trademark-guidelines). According to the search summary, using Anthropic marks means acknowledging Anthropic's exclusive ownership, and businesses should contact marketing@anthropic.com about website or press use. I found no explicit rule on "X for Claude" product names. Policy §1F requires that software not infringe others' IP. — [Software Directory Policy](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy)
- Reserved marketplace names (e.g., `claude-plugins-official`) are refused for non-Anthropic marketplaces. — [Claude Code docs: Create a marketplace](https://code.claude.com/docs/en/plugin-marketplaces)

### Inferences
- **Highest-risk policy issue for vibeediting.app:** features like AI B-roll generation, AI voiceover/TTS, AI music, or generative fills in a directory-listed connector or plugin could fall under §4B. Silence-cutting, transcription-based editing, caption generation (text), reframing, color/LUT application and NLE timeline automation look like editing, not generation, so they should be acceptable. Ask Anthropic (mcp-review@anthropic.com / directory@anthropic.com) before listing anything that synthesizes audio or video. Generative features can still be offered off-directory (self-hosted marketplace, npm, your web app).
- Naming: use "vibeediting" as the brand, and "for Claude Code" or "works with Claude" descriptively in copy. Avoid "Claude" in the product name, domain, logo or marketplace `name`. Don't use Anthropic logos without permission.
- The §2F rule against dynamically pulling behavioral instructions means a directory plugin should not fetch its skills or prompts from your server at runtime to hide them. Paid prompt IP therefore can't be protected by remote-loading in a listed plugin. It is another reason to make server-side *tools/compute* the paid value, not prompts.

### Gaps
- I did not read the full text of the Software Directory Terms (revenue, liability, or any restrictions on charging users).
- I found no official Anthropic guidance on "for Claude" naming. The trademark guidelines page was identified but not read in full.
- I did not determine whether §4B applies to plugins distributed via self-hosted marketplaces (likely not, since the policy governs the Directory, but this is unconfirmed).
