import { randomInt } from "node:crypto";

// No 0/O, 1/I/L or U, so keys are easy to read out and type.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ";
const KEY_PATTERN = /^VIBE(-[2-9A-HJKMNP-TV-Z]{4}){4}$/;

export function generateLicenseKey() {
  const groups = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join(""),
  );
  return `VIBE-${groups.join("-")}`;
}

export function normalizeLicenseKey(input: string) {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function isLicenseKeyFormat(key: string) {
  return KEY_PATTERN.test(key);
}
