// Reset shop to a clean launch state: 37 in stock, no orders.
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);
await sql.query("delete from orders");
await sql.query("update products set stock = 37 where slug = 'rhapis-palm'");
const p = await sql.query("select stock from products where slug='rhapis-palm'");
const c = await sql.query("select count(*)::int as n from orders");
console.log(`reset done — stock=${p[0]?.stock} orders=${c[0]?.n}`);
