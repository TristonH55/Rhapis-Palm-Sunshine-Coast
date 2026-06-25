// One-off: set current remaining stock. Usage: node --env-file=.env scripts/setstock.mjs 17
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);
const n = parseInt(process.argv[2] ?? "17", 10);
await sql.query("update products set stock = $1 where slug = 'rhapis-palm'", [n]);
const r = await sql.query("select stock from products where slug='rhapis-palm'");
console.log(`stock set to ${r[0]?.stock}`);
