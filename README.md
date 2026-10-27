# vibeediting.app

The website that sells the vibeediting MCP: landing page, Razorpay checkout, license keys, tutorials and
legal pages. The MCP itself lives in a separate repository; see [MCP_INTEGRATION.md](MCP_INTEGRATION.md).

Built with Next.js 16, Tailwind CSS 4, Postgres (Supabase), Razorpay and Resend. Hosted on Vercel.

## Where to change things

| What | File |
|---|---|
| Prices, plans, features, FAQ, business details, MCP package name | `src/config/site.ts` |
| Tutorials | `content/docs/*.md` (add `video: YOUTUBE_ID` at the top to embed a video) |
| Terms, Privacy, Refund, Delivery | `content/legal/*.md` |
| Landing page layout | `src/app/page.tsx` |

Markdown files can use `{{TOKENS}}` such as `{{SUPPORT_EMAIL}}` or `{{MCP_PACKAGE}}`; see `src/lib/content.ts`.

## How a sale works

1. Buyer fills the checkout form → `POST /api/checkout/order` creates a Razorpay order (price read from the config, never from the browser) and saves it in the `orders` table.
2. Razorpay Checkout opens (UPI, cards, net banking, wallets).
3. On success the browser calls `POST /api/checkout/verify`, which checks Razorpay's signature, marks the order paid, creates a license key and emails it. The key is also shown on screen.
4. Backup: Razorpay's webhook (`POST /api/webhooks/razorpay`) does the same if the buyer closes the tab. Both paths are safe to run twice; one order gets exactly one key.
5. The MCP checks the key with `POST /api/license/verify` (2 computers per key by default).

## Setup (one time)

1. **Supabase:** create a project (region Mumbai). Open **SQL Editor**, paste `db/schema.sql`, run it. Copy the *Transaction pooler* connection string.
2. **Razorpay:** create an account and finish KYC. Razorpay checks your website for the Contact, Terms, Privacy, Refund and Delivery pages, so fill in the `TODO` items in `src/config/site.ts` first. Copy the **test** API keys first.
3. **Resend:** create an account, verify your domain `vibeediting.app`, create an API key.
4. **Vercel:** import this GitHub repo, add the variables from `.env.example`, deploy, and connect the domain.
5. **Razorpay webhook:** Dashboard → Webhooks → Add → URL `https://vibeediting.app/api/webhooks/razorpay`, choose a secret (same as `RAZORPAY_WEBHOOK_SECRET`), events `payment.captured` and `order.paid`. Make sure payments are set to **auto-capture**.
6. Test a purchase with Razorpay test mode, then switch to live keys.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
npm test                     # unit tests
npm run lint
```
