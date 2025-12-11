-- Create sellers table
create table if not exists public.sellers (
  id uuid primary key references auth.users(id) on delete cascade,
  store_name text not null,
  store_slug text unique not null,
  description text,
  logo_url text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  name text not null,
  description text,
  price decimal(10, 2) not null,
  image_url text,
  category text,
  in_stock boolean default true,
  order bigint default 0,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Enable Row Level Security
alter table public.sellers enable row level security;
alter table public.products enable row level security;

-- Sellers policies
create policy "sellers_select_own" on public.sellers for select using (auth.uid() = id);
create policy "sellers_insert_own" on public.sellers for insert with check (auth.uid() = id);
create policy "sellers_update_own" on public.sellers for update using (auth.uid() = id);
create policy "sellers_delete_own" on public.sellers for delete using (auth.uid() = id);
create policy "sellers_select_public" on public.sellers for select using (true);

-- Products policies
create policy "products_select_own" on public.products for select using (auth.uid() = seller_id);
create policy "products_insert_own" on public.products for insert with check (auth.uid() = seller_id);
create policy "products_update_own" on public.products for update using (auth.uid() = seller_id);
create policy "products_delete_own" on public.products for delete using (auth.uid() = seller_id);
create policy "products_select_public" on public.products for select using (true);

-- Create trigger to auto-create seller on signup
create or replace function public.handle_new_seller()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.sellers (id, store_name, store_slug)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'store_name', 'My Store'),
    coalesce(new.raw_user_meta_data ->> 'store_slug', new.id::text)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_seller_created on auth.users;
create trigger on_seller_created
  after insert on auth.users
  for each row
  execute function public.handle_new_seller();
