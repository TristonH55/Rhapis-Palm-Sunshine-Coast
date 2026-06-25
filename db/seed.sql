-- Seed the single product. Re-running keeps the existing row (and its stock).
insert into products (slug, name, price_cents, currency, stock)
values ('rhapis-palm', 'Rhapis Palm — Sunshine Coast', 120000, 'aud', 37)
on conflict (slug) do nothing;
