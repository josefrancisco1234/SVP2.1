-- Create indexes for better query performance
create index if not exists idx_products_seller_id on public.products(seller_id);
create index if not exists idx_sellers_store_slug on public.sellers(store_slug);
create index if not exists idx_products_created_at on public.products(created_at desc);
