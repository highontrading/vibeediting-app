import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifyPaymentSignature, verifyWebhookSignature } from "./razorpay";

const hmac = (secret: string, data: string) => createHmac("sha256", secret).update(data).digest("hex");

describe("verifyPaymentSignature", () => {
  it("accepts Razorpay's order_id|payment_id signature", () => {
    const sig = hmac("secret", "order_1|pay_1");
    expect(verifyPaymentSignature("order_1", "pay_1", sig, "secret")).toBe(true);
  });

  it("rejects a signature for another payment or secret", () => {
    const sig = hmac("secret", "order_1|pay_1");
    expect(verifyPaymentSignature("order_1", "pay_2", sig, "secret")).toBe(false);
    expect(verifyPaymentSignature("order_1", "pay_1", sig, "other")).toBe(false);
    expect(verifyPaymentSignature("order_1", "pay_1", "short", "secret")).toBe(false);
  });
});

describe("verifyWebhookSignature", () => {
  it("checks the signature over the raw body", () => {
    const body = '{"event":"payment.captured"}';
    expect(verifyWebhookSignature(body, hmac("wh", body), "wh")).toBe(true);
    expect(verifyWebhookSignature(body + " ", hmac("wh", body), "wh")).toBe(false);
  });
});
