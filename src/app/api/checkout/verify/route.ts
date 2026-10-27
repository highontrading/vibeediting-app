import { z } from "zod";
import { env } from "@/lib/env";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { fulfilOrder, markEmailed } from "@/lib/license";
import { sendLicenseEmail } from "@/lib/email";

const Body = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

// Called by the browser right after Razorpay Checkout succeeds.
export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid request" }, { status: 400 });
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  if (!verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature, env.razorpayKeySecret())) {
    return Response.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  try {
    const result = await fulfilOrder({ orderId: razorpay_order_id, paymentId: razorpay_payment_id });
    if (!result) return Response.json({ error: "Order not found." }, { status: 404 });
    if (result.created) {
      await sendLicenseEmail(result.license);
      await markEmailed(result.license.key);
    }
    return Response.json({ licenseKey: result.license.key, email: result.license.email });
  } catch (err) {
    console.error("[checkout/verify]", err);
    return Response.json({ error: "Something went wrong. Your key will be emailed to you." }, { status: 500 });
  }
}
