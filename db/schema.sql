create table if not exists products (
  id          serial primary key,
  slug        text unique not null,
  name        text not null,
  price_cents integer not null,
  currency    text not null default 'aud',
  stock       integer not null,
  created_at  timestamptz default now()
);

create table if not exists orders (
  id                 serial primary key,
  stripe_session_id  text unique not null,
  customer_name      text,
  customer_email     text,
  customer_phone     text,
  amount_cents       integer not null,
  status             text not null default 'paid',
  created_at         timestamptz default now()
);
