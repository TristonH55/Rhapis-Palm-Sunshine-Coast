import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Neon serverless driver — runs SQL over HTTP, ideal for Vercel + Next.js.
export const sql = neon(process.env.DATABASE_URL);

// The single product this shop sells.
export const PRODUCT_SLUG = "rhapis-palm";

export type Product = {
  id: number;
  slug: string;
  name: string;
  price_cents: number;
  currency: string;
  stock: number;
};

export async function getProduct(): Promise<Product | null> {
  const rows = (await sql`
    SELECT id, slug, name, price_cents, currency, stock
    FROM products
    WHERE slug = ${PRODUCT_SLUG}
    LIMIT 1
  `) as Product[];
  return rows[0] ?? null;
}
