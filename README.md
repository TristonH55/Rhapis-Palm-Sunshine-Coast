# Rhapis Palms — Sunshine Coast

A small single-product shop for selling mature Rhapis (Lady) Palms.
**$1,200 AUD · 20 in stock · pickup only.**

- **Framework:** Next.js 16 (App Router) + TypeScript + Tailwind v4
- **Payments:** Stripe Checkout (hosted)
- **Database:** Neon (Postgres) — stores orders and live stock

## Requirements

- Node **v20.19.0** (via nvm). All commands below assume:
  ```bash
  export PATH="$HOME/.nvm/versions/node/v20.19.0/bin:$PATH"
  ```
- The `.env` file (already present locally — never commit it; it's in `.gitignore`).

### `.env`
```
DATABASE_URL=...            # Neon connection string
STRIPE_SECRET_KEY=...       # sk_test_... (swap to sk_live_... for real sales)
STRIPE_PUBLISHABLE_KEY=...  # pk_test_...
STRIPE_WEBHOOK_SECRET=...   # whsec_... (from `stripe listen`, see below)
NEXT_PUBLIC_BASE_URL=http://localhost:3000   # your domain in production
```

## First-time database setup

Creates the tables and seeds the product at 20 stock:
```bash
npm run db:setup
```
Reset to a clean launch state (stock 20, no orders) anytime:
```bash
npm run db:reset
```

## Local development

1. Run the app:
   ```bash
   npm run dev
   ```
2. In a second terminal, forward Stripe webhooks (no browser login needed):
   ```bash
   stripe listen --api-key "$STRIPE_SECRET_KEY" --forward-to localhost:3000/api/webhook
   ```
   Copy the printed `whsec_...` into `.env` as `STRIPE_WEBHOOK_SECRET` (only
   changes if you re-pair the CLI), then restart `npm run dev`.
3. Open http://localhost:3000, click **Buy**, pay with test card
   `4242 4242 4242 4242` (any future expiry, any CVC, any postcode).
4. On payment, the webhook records the order in Neon and decrements stock.

## How it works

- `app/page.tsx` — product page; reads live stock from Neon (`force-dynamic`).
- `app/api/checkout/route.ts` — checks stock, creates a Stripe Checkout Session
  (AUD, phone collected for pickup, no shipping), returns the redirect URL.
- `app/api/webhook/route.ts` — verifies the Stripe signature; on
  `checkout.session.completed` inserts the order and decrements stock. Idempotent
  via the unique `stripe_session_id`.
- `lib/db.ts`, `lib/stripe.ts` — Neon + Stripe clients.

> Note: npm scripts force IPv4 DNS (`--dns-result-order=ipv4first`) because this
> machine's IPv6 route to Neon is unreliable. Harmless in production.

## Deploy (Vercel)

1. Push to GitHub (you handle git).
2. Import the repo in Vercel.
3. Add env vars in Vercel: `DATABASE_URL`, `STRIPE_SECRET_KEY`,
   `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, and
   `NEXT_PUBLIC_BASE_URL=https://<your-domain>`.
4. In the Stripe Dashboard → Developers → Webhooks, add an endpoint
   `https://<your-domain>/api/webhook` for the `checkout.session.completed`
   event, and put **that** endpoint's signing secret in Vercel as
   `STRIPE_WEBHOOK_SECRET`.
5. When ready for real money, switch the Stripe keys from test to live.
