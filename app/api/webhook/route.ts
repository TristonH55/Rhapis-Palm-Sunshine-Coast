import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { sql, PRODUCT_SLUG } from "@/lib/db";

// Stripe needs the raw body to verify the signature, so don't let Next parse it.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured." },
      { status: 500 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Idempotent insert: a duplicate webhook for the same session is ignored,
    // so stock is only decremented once.
    const inserted = (await sql`
      INSERT INTO orders (
        stripe_session_id, customer_name, customer_email,
        customer_phone, amount_cents, status
      )
      VALUES (
        ${session.id},
        ${session.customer_details?.name ?? null},
        ${session.customer_details?.email ?? null},
        ${session.customer_details?.phone ?? null},
        ${session.amount_total ?? 0},
        'paid'
      )
      ON CONFLICT (stripe_session_id) DO NOTHING
      RETURNING id
    `) as { id: number }[];

    if (inserted.length > 0) {
      await sql`
        UPDATE products
        SET stock = stock - 1
        WHERE slug = ${PRODUCT_SLUG} AND stock > 0
      `;
    }
  }

  return NextResponse.json({ received: true });
}
