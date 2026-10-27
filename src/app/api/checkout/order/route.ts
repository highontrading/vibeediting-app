import { z } from "zod";
import { getPlan } from "@/config/site";
import { env } from "@/lib/env";
import { sql } from "@/lib/db";
import { createRazorpayOrder } from "@/lib/razorpay";

const Body = z.object({
  planId: z.string(),
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ]{10,15}$/, "Enter a valid phone number"),
});

export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid details" }, { status: 400 });
  }
  const { planId, name, email, phone } = parsed.data;
  const plan = getPlan(planId);
  if (!plan) return Response.json({ error: "This plan is not available." }, { status: 400 });

  const amount = plan.priceInr * 100;
  try {
    const order = await createRazorpayOrder(env.razorpayKeyId(), env.razorpayKeySecret(), {
      amount,
      currency: "INR",
      receipt: `vibe_${Date.now()}`,
      notes: { plan_id: plan.id, email },
    });
    await sql()`
      insert into orders (id, plan_id, amount, currency, name, email, phone)
      values (${order.id}, ${plan.id}, ${amount}, 'INR', ${name}, ${email.toLowerCase()}, ${phone})`;

    return Response.json({
      orderId: order.id,
      amount,
      currency: "INR",
      keyId: env.razorpayKeyId(),
      planName: plan.name,
    });
  } catch (err) {
    console.error("[checkout/order]", err);
    return Response.json({ error: "Could not start the payment. Please try again." }, { status: 500 });
  }
}
