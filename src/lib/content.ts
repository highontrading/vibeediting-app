import fs from "node:fs";
import path from "node:path";
import { business, mcp, site } from "@/config/site";

// Markdown files in /content can use these {{TOKENS}} so details live in one place (src/config/site.ts).
const tokens: Record<string, string> = {
  SITE_URL: site.url,
  DOMAIN: site.domain,
  MCP_PACKAGE: mcp.npmPackage,
  SERVER_NAME: mcp.serverName,
  LICENSE_ENV: mcp.licenseEnvVar,
  BUSINESS_NAME: business.legalName,
  ADDRESS: business.address,
  SUPPORT_EMAIL: business.email,
  PHONE: business.phone,
  JURISDICTION: business.jurisdiction,
  LAST_UPDATED: business.lastUpdated,
};

export type Doc = {
  slug: string;
  title: string;
  description: string;
  section: string;
  order: number;
  video?: string; // YouTube video id
  body: string;
};

function parse(slug: string, raw: string): Doc {
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw);
  const meta: Record<string, string> = {};
  for (const line of (match?.[1] ?? "").split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
  }
  const body = (match?.[2] ?? raw).replace(/\{\{([A-Z_]+)\}\}/g, (all, name) => tokens[name] ?? all);
  return {
    slug,
    title: meta.title ?? slug,
    description: meta.description ?? "",
    section: meta.section ?? "Guides",
    order: Number(meta.order ?? 99),
    video: meta.video || undefined,
    body,
  };
}

function readDir(dir: string): Doc[] {
  const full = path.join(process.cwd(), "content", dir);
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, ""), fs.readFileSync(path.join(full, f), "utf8")))
    .sort((a, b) => a.order - b.order);
}

export const getDocs = () => readDir("docs");
export const getDoc = (slug: string) => getDocs().find((d) => d.slug === slug);
export const getLegal = (slug: string) => readDir("legal").find((d) => d.slug === slug);
