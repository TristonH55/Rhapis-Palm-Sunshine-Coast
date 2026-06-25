import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

// Uses the account's default API version. No version pin to avoid type drift.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
