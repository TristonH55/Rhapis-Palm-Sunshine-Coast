import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProduct } from "@/lib/db";

export async function POST() {
  const product = await getProduct();

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (product.stock <= 0) {
    return NextResponse.json(
      { error: "Sorry, these are now sold out." },
      { status: 409 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    phone_number_collection: { enabled: true },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: product.currency,
          unit_amount: product.price_cents,
          product_data: {
            name: product.name,
            description:
              "Mature Rhapis (Lady) Palm, approx. 2m tall. Pickup only — Sunshine Coast.",
          },
        },
      },
    ],
    metadata: { product_slug: product.slug },
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
