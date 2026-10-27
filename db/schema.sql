-- vibeediting.app database schema.
-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.

create table if not exists orders (
  id            text primary key,              -- Razorpay order id (order_...)
  plan_id       text not null,
  amount        integer not null,              -- in paise
  currency      text not null default 'INR',
  name          text not null,
  email         text not null,
  phone         text,
  status        text not null default 'created' check (status in ('created', 'paid')),
  payment_id    text,
  created_at    timestamptz not null default now(),
  paid_at       timestamptz
);

create index if not exists orders_email_idx on orders (lower(email));

create table if not exists licenses (
  key              text primary key,           -- VIBE-XXXX-XXXX-XXXX-XXXX
  order_id         text unique references orders (id),
  email            text not null,
  name             text,
  plan_id          text not null,
  max_activations  integer not null,
  expires_at       timestamptz,                -- null = never expires
  revoked          boolean not null default false,
  created_at       timestamptz not null default now(),
  last_emailed_at  timestamptz
);

create index if not exists licenses_email_idx on licenses (lower(email));

create table if not exists activations (
  license_key  text not null references licenses (key) on delete cascade,
  machine_id   text not null,
  first_seen   timestamptz not null default now(),
  last_seen    timestamptz not null default now(),
  mcp_version  text,
  primary key (license_key, machine_id)
);

-- The website talks to the database with the server connection string only.
-- Turn on Row Level Security with no policies so the public anon key cannot read anything.
alter table orders enable row level security;
alter table licenses enable row level security;
alter table activations enable row level security;
