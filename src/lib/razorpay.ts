import { createHmac, timingSafeEqual } from "node:crypto";

function hmacHex(secret: string, payload: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

// Signature sent to the browser after a successful Checkout payment.
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  keySecret: string,
) {
  return safeEqual(hmacHex(keySecret, `${orderId}|${paymentId}`), signature);
}

// Signature on webhook calls (X-Razorpay-Signature over the raw request body).
export function verifyWebhookSignature(rawBody: string, signature: string, webhookSecret: string) {
  return safeEqual(hmacHex(webhookSecret, rawBody), signature);
}

export type RazorpayOrder = { id: string; amount: number; currency: string; status: string };

export async function createRazorpayOrder(
  keyId: string,
  keySecret: string,
  input: { amount: number; currency: string; receipt: string; notes: Record<string, string> },
): Promise<RazorpayOrder> {
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error(`Razorpay order failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}
