import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

const sql = neon(process.env.DATABASE_URL);

const files = ["db/schema.sql", "db/seed.sql"];
for (const file of files) {
  const content = readFileSync(file, "utf8");
  for (const stmt of content.split(/;\s*\n/).map((s) => s.trim()).filter(Boolean)) {
    await sql.query(stmt);
  }
  console.log(`applied ${file}`);
}

const rows = await sql.query(
  "select slug, name, price_cents, currency, stock from products"
);
console.log("products:", JSON.stringify(rows));
