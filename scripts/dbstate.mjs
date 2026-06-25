import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);
const p = await sql.query("select stock from products where slug='rhapis-palm'");
const c = await sql.query("select count(*)::int as n from orders");
console.log(JSON.stringify({ stock: p[0]?.stock, orders: c[0]?.n }));
