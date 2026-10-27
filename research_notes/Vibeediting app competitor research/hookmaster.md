# Hookmaster (tryhookmaster.com): Competitor Teardown

> **Method and reliability note (read first).** None of the direct fetches worked from this environment. tryhookmaster.com returned DNS ENOTFOUND in WebFetch and a 403 at the CONNECT step through the egress proxy in curl. web.archive.org was blocked or reset the connection, and r.jina.ai and LinkedIn would not resolve. The archive.org availability API did work: it shows one snapshot of the homepage, dated **2026-03-03** (`web.archive.org/web/20260303113809/https://tryhookmaster.com/`), and no snapshots of /motion, /editing, /signup or /pricing. That fits the sub-pages being new (Motion is dated October 2026). **Everything below comes from search-engine summaries and snippets of tryhookmaster.com pages** (/, /motion, /pricing, /signup, /login, /updates) plus one LinkedIn profile. The quoted wording is snippet text, not a full page read. Some snippets were described as "partly garbled", so treat exact figures as needing a check on the live page. **I found no indexed content at all for /editing.**

## 1. What each offering is (main site, /motion, /editing) and what it runs on

### Takeaway
Hookmaster is two products. The core product (the main site) is a **SaaS for AI video QA and feedback** on short-form video (TikTok, Reels, Shorts), with a generative "Fix Studio" layered on top. The newer **HookMaster Motion** (/motion) is an **MCP server for Claude Code and Codex**: it turns the user's coding agent into a motion-design "director" that builds launch films as code in **Remotion or HyperFrames** and renders them locally. /editing could not be retrieved. The Updates page says Motion "also edits your own footage and music-led edits", so /editing is probably a footage-editing angle on the same MCP harness. That is unconfirmed.

### Cited Findings
**Main site (SaaS: "HookMaster: AI Video QA & Creator Feedback")**
- Page titles: "HookMaster: AI Video QA & Creator Feedback" (homepage) and "HookMaster : AI Video Hook Analysis for TikTok, Reels & Shorts" (signup and login). — [tryhookmaster.com](https://tryhookmaster.com/); [signup](https://tryhookmaster.com/signup)
- Core function: the user uploads a short-form video, and the AI "analyzes your short-form videos frame-by-frame" and returns **timestamped feedback on hook strength, pacing, retention and visuals**. — [tryhookmaster.com](https://tryhookmaster.com/); [signup](https://tryhookmaster.com/signup)
- **Fix Studio** "can generate a replacement clip for a weak section using AI video models like **Kling, Veo, and Seedance**" (it auto-fixes flagged moments with generative video). — [tryhookmaster.com](https://tryhookmaster.com/)
- **Style Match**: "Upload a reference video with the style you want, and HookMaster breaks down its pacing, cut frequency, color grading, and text placement" into "a detailed blueprint you can follow to match that style." — [tryhookmaster.com](https://tryhookmaster.com/)
- **Agency or brand QA angle**: "HookMaster checks every edit against your client's brand guidelines, frame by frame, before it reaches your desk", flagging color, font, logo and pacing with timestamps. It is positioned as a way to skip a manual review round. — [tryhookmaster.com](https://tryhookmaster.com/)
- Other listed features: brand guideline checks, version comparison, downloadable QA reports, unlimited AI consultant chat, and feedback threads. — [updates](https://tryhookmaster.com/updates); [pricing](https://tryhookmaster.com/pricing)
- Upload limits: **MP4 or MOV, up to 90 seconds**. — [tryhookmaster.com](https://tryhookmaster.com/)
- Studio image and video models are added over time. A 2026-09-27 update added "GPT Image 2.5 Sunburst and Flare" with "Extra high and Max quality tiers", plus "Hailuo H3 Max" for video. The plans also mention "Seedance 2.5" and "Seedance 2.0 Fast" generations. — [updates](https://tryhookmaster.com/updates); [pricing](https://tryhookmaster.com/pricing)
- Review improvements in the October 2026 update: reviews check on-screen text against an attached brand guide (spelling, names, captions, safe zones), tutorials are judged on "how clearly each step reads", and auto-tagging of video type, topics and sound can be corrected "with one tap" ("Reviews that catch more and learn your style"). — [updates](https://tryhookmaster.com/updates)

**/motion (HookMaster Motion: "Launch Films Made by Your Coding Agent")**
- Page title: "HookMaster Motion: Launch Films Made by Your Coding Agent". — [motion](https://tryhookmaster.com/motion)
- Self-description: "HookMaster Motion is an **MCP** that gives **Claude Code and Codex** the motion design skills they do not have on their own. It walks your agent through the whole film: the story, the storyboard, the music, the cut and a full review." — [updates](https://tryhookmaster.com/updates); [motion](https://tryhookmaster.com/motion)
- Updates page wording: "We launched HookMaster Motion, a **motion design harness for your coding agent**." — [updates](https://tryhookmaster.com/updates)
- Division of labour: "Your coding agent does the build, HookMaster directs the story, the storyboard and the final cut." The agent "rebuilds your real screens in Remotion or HyperFrames", and the user approves story, storyboard and cut before anything renders. — [motion](https://tryhookmaster.com/motion)
- "No After Effects, no screen recordings." — [motion](https://tryhookmaster.com/motion)
- Local and private: "Your film never leaves your machine." The film is written as code on the user's machine and rendered locally, the source code belongs to the user, and "a review room [runs] next to the code." — [motion](https://tryhookmaster.com/motion); [updates](https://tryhookmaster.com/updates)
- Review UX: "Every 'this' and 'here' you say is tied to the frame on screen, so your agent knows exactly what you pointed at." HookMaster "watches the cut and gives timestamped notes". — [motion](https://tryhookmaster.com/motion)
- **HookMaster Music** "scores the film before the visuals are built, so the cut is timed to the track." — [updates](https://tryhookmaster.com/updates)
- Scope: the Updates page says Motion "also edits your own footage and music-led edits, as well as product films". — [updates](https://tryhookmaster.com/updates)
- The founder's LinkedIn description says Motion "rebuilds a real product as code and animates it like a motion designer would… HookMaster reviews the motion and critiques it, and the agent then fixes what it finds." — [LinkedIn: Pranav Joshi](https://www.linkedin.com/in/pranav-joshi-2a198a28a/) (via search summary)

**/editing**
- No search engine returned indexed content for `tryhookmaster.com/editing`, even with exact-URL queries. — [search attempt: tryhookmaster.com](https://tryhookmaster.com/)

**Tools and stack named:** Claude Code, Codex (the agent hosts); Remotion and HyperFrames (render engines); Kling, Veo, Seedance 2.0 Fast and 2.5, Hailuo H3 Max, GPT Image 2.5 (generative models in Studio). After Effects is named only as something you *don't* need. I found no mention of Premiere, DaVinci, CapCut, Cursor or ffmpeg. — [motion](https://tryhookmaster.com/motion); [updates](https://tryhookmaster.com/updates); [pricing](https://tryhookmaster.com/pricing)

### Inferences
- Hookmaster started as a creator- and agency-focused **video critique SaaS** and is now moving into **agent-native production** (an MCP). Its critique and review engine is the moat it carries into the agent world: "HookMaster reviews the film" is the paid, metered part, while the build runs on the user's own agent and machine.
- The "editing" sub-page most likely positions the same MCP harness for **editing raw footage and music-led cuts** (the area closest to vibeediting.app). This is unverified.
- Motion is a **hybrid**: a local MCP with skills and orchestration, plus cloud services (sign-in, reviews, music generation) that are metered by quota.

### Gaps
- Full text of /editing, including its offer, price and whether it is a separate SKU or part of Motion. The page could not be fetched or found in any index.
- Whether Motion ships as a Claude Code *plugin* or skills bundle in addition to the MCP. Only the MCP is confirmed.

## 2. Pricing and payment model

### Takeaway
The main SaaS uses **monthly subscriptions ($9 / $19 / $69)** plus **one-time credit top-ups ($5–$115)**. HookMaster Motion is a **one-time "lifetime unlock"** that bundles 10 reviews and 10 music tracks. Its dollar price did not appear in any snippet. It is framed against "One agency demo video costs $1,000 to $5,000."

### Cited Findings
- **Starter: $9/mo**. "5 Pro + 3 Lite analyses/month, 50 credits/month, Fix Studio enabled", 2 brand guideline slots, and "up to 5 Seedance 2.5 or 7 Seedance 2.0 Fast generations (5s · 480p)". — [pricing](https://tryhookmaster.com/pricing)
- **Growth: $19/mo**. 30 analyses/month, 125 credits/month, 3 brand guideline slots. — [pricing](https://tryhookmaster.com/pricing)
- **Studio: $69/mo**. 100 analyses/month, 350 credits/month, 10 brand guideline slots, dedicated support. Described as for "teams and agencies producing content at scale". — [pricing](https://tryhookmaster.com/pricing); [tryhookmaster.com](https://tryhookmaster.com/)
- "Monthly plan credits reset each cycle. Top-up packs stack on top of your monthly plan credits and are valid for one year." — [pricing](https://tryhookmaster.com/pricing)
- "All plans include unlimited AI consultant chat, feedback threads, and brand guidelines." — [pricing](https://tryhookmaster.com/pricing)
- Top-up packs: "Boost" pack, 150 credits for $12 one-time ("save 20%"). Packs range from about $5 to $115. — [pricing](https://tryhookmaster.com/pricing); [tryhookmaster.com](https://tryhookmaster.com/)
- Free tier: "Sample results and guided tours are free. Analyzing your own videos and using Style Match require a paid plan. Studio generation uses credits." — [tryhookmaster.com](https://tryhookmaster.com/)
- One search summary of the signup page mentioned "Starter plan from $9 per month, with a **3-day free trial**". A later pricing-focused search found no trial terms. Treat this as unconfirmed. — [signup](https://tryhookmaster.com/signup)
- **Motion: "lifetime unlock", one-time payment**. "Includes 10 film reviews by HookMaster (7 Lite, 3 Pro), 10 music tracks for your films, Remotion or HyperFrames, and lifetime access and every update." The anchor copy reads "One agency demo video costs $1,000 to $5,000." The FAQ includes a question about what happens once the included reviews and music run out (answer not captured). — [motion](https://tryhookmaster.com/motion)
- The main /pricing page does **not** list Motion's price. The SaaS credit packs are for analysis and generation, not the Motion unlock. — [pricing](https://tryhookmaster.com/pricing)

### Inferences
- The Motion model is **"lifetime unlock plus metered consumables"**: reviews (Lite/Pro) and music tracks are capped, which implies paid top-ups when they run out (the FAQ question suggests this). That gives a one-time-price hook up front and recurring revenue from consumption.
- The "Lite vs Pro" review tiers mirror the SaaS "Lite/Pro analyses". The same review engine is reused across both products.

### Gaps
- Motion's dollar price, the payment processor (Stripe, Lemon Squeezy, etc.), the refund policy and the license terms. None were in any snippet. The checkout and terms pages were not indexed.
- Pricing for /editing.

## 3. Delivery and distribution

### Takeaway
The SaaS is a web app with sign-up and login. Motion is installed as an **MCP server added to Claude Code or Codex with one command**, then authenticated with an in-agent sign-in (`/mcp` → `hookmaster` → sign in). Rendering is local. The page promises "lifetime access and every update".

### Cited Findings
- Setup on the Motion page is a terminal walkthrough ("Step 1 of 4 — `$ HookMaster MCP added`"): add the MCP, open Claude Code, type `/mcp`, choose `hookmaster`, and sign in. — [motion](https://tryhookmaster.com/motion)
- "a setup command for that connection" (a single command to add the MCP server to Claude Code). — [motion](https://tryhookmaster.com/motion)
- The film's source code is the user's. It renders on the user's machine, and "Your film never leaves your machine". — [updates](https://tryhookmaster.com/updates); [motion](https://tryhookmaster.com/motion)
- "lifetime access and every update". — [motion](https://tryhookmaster.com/motion)
- SaaS access is through web [signup](https://tryhookmaster.com/signup) and [login](https://tryhookmaster.com/login).

### Inferences
- An account-gated remote MCP (or a local MCP with OAuth) lets Hookmaster meter reviews and music centrally while the heavy rendering costs nothing on its side. That keeps COGS low on a one-time price.
- I found no evidence of a GitHub repo, a Skool or Discord community, or a plugin-marketplace listing.

### Gaps
- Whether the MCP is remote (HTTP) or a local npm/uvx package. The exact install command text was not captured.
- Whether there is a community, course or tutorial library. None was found.

## 4. Target customer, positioning, messaging, social proof, funnels

### Takeaway
The SaaS targets **short-form creators and content agencies** (hook and retention critique, client brand-guideline QA). Motion targets **startup founders and small teams who need a product launch or demo film** without hiring an agency ($1k–$5k anchor). I found no testimonials, user counts or social proof in any indexed snippet, and no evident VSL or waitlist.

### Cited Findings
- Agency messaging: "checks every edit against your client's brand guidelines, frame by frame, before it reaches your desk" (skip a manual review round). — [tryhookmaster.com](https://tryhookmaster.com/)
- Studio tier "for teams and agencies producing content at scale". — [tryhookmaster.com](https://tryhookmaster.com/)
- The founder's post aims Motion at "small startups and founders who want a proper video for their product". — [LinkedIn: Pranav Joshi](https://www.linkedin.com/in/pranav-joshi-2a198a28a/) (via search summary)
- Motion's price anchor: "One agency demo video costs $1,000 to $5,000." — [motion](https://tryhookmaster.com/motion)
- Motion's core promises: the agent "rebuilds your real screens"; "No After Effects, no screen recordings"; the user approves story, storyboard and cut before render; local and private. — [motion](https://tryhookmaster.com/motion)
- Funnel elements found: free sample results and guided tours (product-led), a possible 3-day trial (unconfirmed), and a public changelog at /updates. — [tryhookmaster.com](https://tryhookmaster.com/); [updates](https://tryhookmaster.com/updates)
- Searches for Reddit, Product Hunt and X coverage returned **no** pages about tryhookmaster.com. — (search: "HookMaster AI video feedback creators reddit OR producthunt OR x.com")

### Inferences
- The traffic source looks like founder-led LinkedIn posting. I found no evidence of an X or YouTube presence. Distribution appears weak, which a competitor with a content and tutorial engine could exploit.

### Gaps
- Testimonials, user numbers and creator names. None were found.
- A VSL, lead magnet or email capture. None were seen in the snippets.

## 5. Who is behind it, launch timeline, traction, reviews

### Takeaway
Hookmaster appears to be a **solo-founder project by Pranav Joshi** (Lucknow, India; Manipal University Jaipur), who describes himself as a "video editor and solo builder". The main site existed by **March 2026**, and Motion launched in **October 2026**. I found no public revenue, user numbers or third-party reviews.

### Cited Findings
- LinkedIn profile "Pranav Joshi - Hookmaster": Lucknow-based, Hookmaster listed as experience, education at Manipal University Jaipur, 500+ connections, about 889 followers. He describes himself as a video editor and solo builder. — [LinkedIn](https://www.linkedin.com/in/pranav-joshi-2a198a28a/) (search-summary only; direct fetch blocked)
- The same search surfaced a LinkedIn post by him describing "a **free, open-source skill** built on the same workflow, with the agent producing storyboard directions and a text timeline". I could not confirm whether that skill is HookMaster Motion or a separate lead magnet. — [LinkedIn](https://www.linkedin.com/in/pranav-joshi-2a198a28a/)
- An archive.org snapshot of the homepage exists from **2026-03-03**, so the SaaS was live by then. — archive.org availability API (`archive.org/wayback/available?url=tryhookmaster.com`)
- Motion launch date **conflicts between sources**: one summary of /updates says "New: HookMaster Motion — **October 1, 2026**", and another summary of the same page dates the announcement **October 23, 2026**. The September 27, 2026 entry (new Studio models) comes before both. — [updates](https://tryhookmaster.com/updates)
- Name collisions to be aware of: hookmaster.me (a separate hook and caption generator claiming "2,000+ creators"), hookmasters.io (a Danish Meta-ads studio), hooked.so (AI UGC ads, which also has an MCP), and askhook.com. — [hookmaster.me](https://www.hookmaster.me/); [hookmasters.io](https://hookmasters.io/); [hooked.so MCP](https://www.hooked.so/mcp)

### Inferences
- This is an early-stage indie product with little visible traction. Shipping an MCP version roughly seven months after the SaaS suggests the founder is pivoting toward "agent-native video" because SaaS critique alone is commoditised.

### Gaps
- Revenue, users, funding and the company entity. None were found.
- Reddit, X, YouTube and Product Hunt mentions. None were found.

## 6. Strengths, weaknesses, and gaps a competitor can exploit

### Takeaway
Hookmaster's best ideas are (a) a **review and critique loop** sold as the metered value-add on top of the user's own coding agent, (b) **story → storyboard → music → cut → review approval gates**, (c) **music-first timing**, and (d) a **lifetime-unlock price anchored against agency costs**. Its weaknesses are a product split across two audiences, weak distribution and social proof, a focus on launch films over real footage, and opaque Motion pricing.

### Cited Findings (basis)
- Approval gates and a review room tied to frames: "Every 'this' and 'here' you say is tied to the frame on screen". — [motion](https://tryhookmaster.com/motion)
- Music-first: "HookMaster Music scores the film before the visuals are built, so the cut is timed to the track." — [updates](https://tryhookmaster.com/updates)
- Bundled consumables: "10 film reviews… (7 Lite, 3 Pro), 10 music tracks". — [motion](https://tryhookmaster.com/motion)
- The SaaS is capped at 90-second MP4/MOV uploads. — [tryhookmaster.com](https://tryhookmaster.com/)
- Open-source competitors in the same niche include launchfilm (Remotion studio, "202 reference recipes"), product-film, onetake, and OpenMontage ("12 production pipelines, 100+ tools, 700+ agent skill… files"). — [launchfilm](https://github.com/evgenspm/launchfilm); [product-film](https://github.com/tomascupr/product-film); [onetake](https://github.com/feitangyuan/onetake); [OpenMontage](https://github.com/calesthio/openmontage)

### Inferences (for vibeediting.app)
- **Copy:** approval gates before render (cheap tokens and no wasted renders); frame-anchored feedback ("this/here" mapped to the playhead); music-first beat-synced cutting; "no After Effects, renders locally, you own the code" positioning; a price anchored against freelancer or agency cost.
- **Exploit:**
  1. **Real-footage editing** (talking heads, podcasts, silence and filler cuts, captions, B-roll, ffmpeg) is only mentioned in passing by Hookmaster. Lead with it.
  2. **Multi-host support**: Hookmaster names only Claude Code and Codex. Support Cursor, the Claude Desktop plugin and skills, plus NLE export (Premiere, DaVinci, FCPXML/EDL, CapCut).
  3. **Education and community moat**: Hookmaster has no visible tutorials, community or social proof. vibeediting.app's workflows and tutorials are a differentiator.
  4. **Transparent pricing**: Motion's price is not indexed or visible in search, and its consumable caps raise "what happens when I run out" anxiety (the FAQ itself asks this). Publish clear pricing with unlimited local use.
  5. **Open-source pressure**: free repos (launchfilm, OpenMontage, product-film) commoditise "agent makes a Remotion film". Paid value must come from curated workflows, review and QA intelligence, and support, not from the Remotion scaffolding alone.
  6. **Name confusion**: Hookmaster shares its name with at least four other "hook" products, which hurts its SEO.

### Gaps
- Without the live /motion and /editing pages, I could not assess design quality, the demo video, FAQ answers or checkout UX. Someone should check them manually in a normal browser.
