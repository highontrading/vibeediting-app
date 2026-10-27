import "server-only";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const env = {
  databaseUrl: () => required("DATABASE_URL"),
  razorpayKeyId: () => required("RAZORPAY_KEY_ID"),
  razorpayKeySecret: () => required("RAZORPAY_KEY_SECRET"),
  razorpayWebhookSecret: () => required("RAZORPAY_WEBHOOK_SECRET"),
  resendApiKey: () => process.env.RESEND_API_KEY,
  emailFrom: () => process.env.EMAIL_FROM ?? "vibeediting <hello@vibeediting.app>",
};
