import { env } from "@/lib/env";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { AmountMismatchError, fulfilOrder, markEmailed } from "@/lib/license";
import { sendLicenseEmail } from "@/lib/email";

type PaymentEntity = { id: string; order_id: string | null; amount: number; status: string };

// Backup path: issues the license even if the buyer closed the tab before the
// browser could call /api/checkout/verify. Subscribe to payment.captured and order.paid.
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(rawBody, signature, env.razorpayWebhookSecret())) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(rawBody) as {
    event: string;
    payload: { payment?: { entity: PaymentEntity } };
  };
  if (event.event !== "payment.captured" && event.event !== "order.paid") {
    return new Response("Ignored", { status: 200 });
  }

  const payment = event.payload.payment?.entity;
  if (!payment?.order_id) return new Response("No order", { status: 200 });

  try {
    const result = await fulfilOrder({ orderId: payment.order_id, paymentId: payment.id, amount: payment.amount });
    if (result?.created) {
      await sendLicenseEmail(result.license);
      await markEmailed(result.license.key);
    }
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("[webhooks/razorpay]", err);
    // Amount mismatches will never succeed on retry; anything else should be retried by Razorpay.
    return new Response("Error", { status: err instanceof AmountMismatchError ? 200 : 500 });
  }
}
