import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProduct } from "@/lib/db";
import { BULK } from "@/lib/site";

export async function POST(req: Request) {
  // Determine bundle type from the request body (defaults to single).
  let bundle: "single" | "bulk" = "single";
  try {
    const body = await req.json();
    if (body?.bundle === "bulk") bundle = "bulk";
  } catch {
    // no body → single
  }

  const product = await getProduct();
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const units = bundle === "bulk" ? BULK.qty : 1;

  if (product.stock < units) {
    return NextResponse.json(
      {
        error:
          bundle === "bulk"
            ? `Sorry, we don't have ${units} in stock right now. Please contact us.`
            : "Sorry, these are now sold out.",
      },
      { status: 409 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const isBulk = bundle === "bulk";
  const amount = isBulk ? BULK.priceCents : product.price_cents;
  const name = isBulk
    ? `Rhapis Palms — Bulk pack of ${BULK.qty}`
    : product.name;
  const description = isBulk
    ? `${BULK.qty} mature Rhapis (Lady) Palms, each averaging ~2m. Pickup only — Sunshine Coast.`
    : "Mature Rhapis (Lady) Palm, averaging ~2m. Pickup only — Sunshine Coast.";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    phone_number_collection: { enabled: true },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: product.currency,
          unit_amount: amount,
          product_data: { name, description },
        },
      },
    ],
    metadata: { product_slug: product.slug, units: String(units) },
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
