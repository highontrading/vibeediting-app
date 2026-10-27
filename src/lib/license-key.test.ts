import { describe, expect, it } from "vitest";
import { generateLicenseKey, isLicenseKeyFormat, normalizeLicenseKey } from "./license-key";

describe("license keys", () => {
  it("generates well-formed, unique keys", () => {
    const keys = new Set(Array.from({ length: 1000 }, generateLicenseKey));
    expect(keys.size).toBe(1000);
    for (const key of keys) expect(isLicenseKeyFormat(key)).toBe(true);
  });

  it("normalises what users paste", () => {
    expect(normalizeLicenseKey("  vibe-abcd-efgh-jkmn-pqrs \n")).toBe("VIBE-ABCD-EFGH-JKMN-PQRS");
  });

  it("rejects look-alike characters and bad shapes", () => {
    expect(isLicenseKeyFormat("VIBE-0000-AAAA-BBBB-CCCC")).toBe(false);
    expect(isLicenseKeyFormat("VIBE-AAAA-BBBB-CCCC")).toBe(false);
    expect(isLicenseKeyFormat("NOPE-AAAA-BBBB-CCCC-DDDD")).toBe(false);
  });
});
