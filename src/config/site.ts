// Everything a non-developer may want to change lives in this file:
// business details, prices, features, FAQ and the MCP install details.
// Items marked TODO must be filled in before going live (Razorpay checks them).

export const site = {
  name: "vibeediting",
  domain: "vibeediting.app",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vibeediting.app",
  tagline: "Edit your videos by just talking to your AI.",
  // Logo image (transparent PNG/SVG) shown in the navbar and footer. It is sized by height; the width follows its shape.
  logo: "https://xfyshcjptayuemcwxnpr.supabase.co/storage/v1/object/public/uploads/1793130877165-1e99cefd-c25f-4c6e-8699-071b8e873af5.png",
  description:
    "vibeediting is an MCP that gives Claude Code, Codex and Cursor real video-editing tools. Cut silences, add captions, B-roll and motion graphics, all on your own computer.",
};

// Shown on the Contact page, legal pages and in emails.
export const business = {
  legalName: "TODO: Your registered business name", // e.g. "Vibe Editing Labs" or your own name for a proprietorship
  address: "TODO: Full business address, City, State, PIN, India",
  email: "support@vibeediting.app", // TODO: make sure this inbox exists
  phone: "TODO: +91 XXXXX XXXXX",
  gstin: "", // optional, shown if filled
  jurisdiction: "TODO: City, State", // courts for disputes, e.g. "Bengaluru, Karnataka"
  lastUpdated: "27 October 2026", // date shown on legal pages
};

// How buyers install the MCP. Must match the MCP repository.
export const mcp = {
  serverName: "vibeediting",
  npmPackage: "@vibeediting/mcp", // TODO: final package name from the MCP repo
  licenseEnvVar: "VIBE_LICENSE_KEY",
};

export type Plan = {
  id: string;
  name: string;
  priceInr: number; // what the buyer pays, in rupees (GST-inclusive if you charge GST)
  compareAtInr?: number; // optional "was" price shown with a strike-through
  billing: "one_time";
  badge?: string;
  description: string;
  features: string[];
  maxActivations: number; // how many computers one license key works on
  licenseDays: number | null; // null = never expires
  highlighted?: boolean;
  enabled: boolean;
};

// PLACEHOLDER PRICES. Change these when you decide your pricing.
// The server always reads the price from here, so buyers cannot change it.
export const plans: Plan[] = [
  {
    id: "lifetime",
    name: "Lifetime",
    priceInr: 1499,
    compareAtInr: 2999,
    billing: "one_time",
    badge: "Launch price",
    description: "Pay once. Use it forever on your own computer.",
    features: [
      "Full vibeediting MCP with every tool",
      "All editing workflows and style presets",
      "Step-by-step video tutorials",
      "Works with Claude Code, Codex and Cursor",
      "Use on 2 computers",
      "Free updates",
      "Email support",
    ],
    maxActivations: 2,
    licenseDays: null,
    highlighted: true,
    enabled: true,
  },
];

export const enabledPlans = () => plans.filter((p) => p.enabled);
export const getPlan = (id: string) => plans.find((p) => p.id === id && p.enabled);

export type HeroReel = {
  src: string; // a vertical (9:16) .mp4: a file in /public/videos or a full https URL
  poster?: string; // optional first-frame image, shown while the video loads
};

// Videos in the hero carousel. For now the same test video is used 8 times; swap in real edits later.
const testReel = "https://xfyshcjptayuemcwxnpr.supabase.co/storage/v1/object/public/uploads/1791350223925-950d02cb-2f81-47d0-8e1d-851c8f2d3748.mp4";
export const heroReels: HeroReel[] = Array.from({ length: 8 }, () => ({ src: testReel }));

export type Feature = {
  title: string;
  body: string;
  color: "pink" | "blue" | "green" | "lilac" | "butter" | "peach";
  visual: "cut" | "captions" | "motion" | "stock" | "analyze" | "reframe" | "style" | "export";
  soon?: boolean;
};

// TODO: keep this list in sync with what the MCP really does.
export const features: Feature[] = [
  {
    title: "Cut silences & fillers",
    body: "Removes pauses, \"umm\", \"uhh\" and retakes from talking-head videos in one go.",
    color: "pink",
    visual: "cut",
  },
  {
    title: "Captions in your style",
    body: "Word-by-word animated captions in Hindi, English or Hinglish, with your fonts and colours.",
    color: "butter",
    visual: "captions",
  },
  {
    title: "Motion graphics B-roll",
    body: "Your AI writes the animations as code: titles, charts, call-outs. Made fresh, so no copyright worries.",
    color: "blue",
    visual: "motion",
  },
  {
    title: "Free stock footage",
    body: "Search and drop in copyright-free clips from Pexels and Pixabay without leaving the chat.",
    color: "green",
    visual: "stock",
  },
  {
    title: "Analyse your video",
    body: "Get notes on your hook, pacing and the boring parts before you hit publish.",
    color: "lilac",
    visual: "analyze",
  },
  {
    title: "Reels, Shorts & YouTube",
    body: "Reframe 16:9 to 9:16, make long-form edits, or cut one video into many clips.",
    color: "peach",
    visual: "reframe",
  },
  {
    title: "Your own style system",
    body: "Save your fonts, colours, music and timing once. Every edit follows it.",
    color: "pink",
    visual: "style",
  },
  {
    title: "Export to Premiere & DaVinci",
    body: "Open the edit as a timeline in your editing app to finish it by hand.",
    color: "blue",
    visual: "export",
    soon: true,
  },
];

export const agents = [
  { name: "Claude Code", note: "Desktop app or terminal" },
  { name: "Codex", note: "CLI or IDE extension" },
  { name: "Cursor", note: "Agent mode" },
  { name: "Any MCP client", note: "VS Code, Windsurf and more" },
];

export const steps = [
  {
    title: "Buy and get your key",
    body: "Pay with UPI, card or net banking. Your license key arrives by email in seconds.",
  },
  {
    title: "Install in 5 minutes",
    body: "Follow the video tutorial to add the vibeediting MCP to Claude Code, Codex or Cursor.",
  },
  {
    title: "Talk, and it edits",
    body: "\"Cut the silences, add yellow captions and a title card.\" Your video is edited on your computer.",
  },
];

export const faqs = [
  {
    q: "What is an MCP?",
    a: "MCP (Model Context Protocol) is a standard way to give an AI agent new tools. vibeediting is an MCP that gives your AI agent video-editing tools. You add it once to Claude Code, Codex or Cursor, and then you can ask the AI to edit your videos.",
  },
  {
    q: "Do I need to know coding?",
    a: "No. You copy and paste a few commands while following our video tutorial. After that, you just type what you want in plain English or Hinglish.",
  },
  {
    q: "Is my video uploaded anywhere?",
    a: "No. Everything runs on your own computer. Your footage never goes to our servers. Only the text of your chat goes to your AI provider, as normal.",
  },
  {
    q: "Do I need a Claude, ChatGPT or Cursor subscription?",
    a: "Yes. vibeediting runs inside your AI agent, so you need your own plan for it (for example Claude Pro, ChatGPT Plus for Codex, or Cursor Pro). That is paid separately to them. Long editing sessions use more of your plan's limits.",
  },
  {
    q: "Does it work on Claude.ai in the browser, or on my phone?",
    a: "No. Your videos are on your computer, so the AI agent must also run on your computer: Claude Code (desktop app or terminal), Codex or Cursor on Mac or Windows. Claude.ai web chat, Claude Code on the web and phones cannot reach your files.",
  },
  {
    q: "What computer do I need?",
    a: "A Mac or Windows laptop/desktop that can run Claude Code, Codex or Cursor. 8 GB RAM is enough for most Reels and Shorts; long 4K videos are faster with 16 GB.",
  },
  {
    q: "How do I get access after paying?",
    a: "Right after payment you see your license key on screen and we email it to you. The tutorials show where to paste it. Lost it? Use the \"Resend my key\" form on the Help page.",
  },
  {
    q: "Is the B-roll and stock footage copyright-free?",
    a: "Motion graphics are made fresh by your AI agent as code, so they belong to you. Stock clips come from Pexels and Pixabay, which are free to use under their licenses. Always use music and footage you have the rights to.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "UPI, debit and credit cards, net banking and wallets, through Razorpay.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes, within 7 days if the MCP does not work on your computer and our support could not fix it. See the Refund Policy for details.",
  },
];
