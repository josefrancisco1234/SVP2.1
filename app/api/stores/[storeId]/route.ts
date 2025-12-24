import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  const { storeId: storeSlug } = await params; // 👈 ES SLUG
  const supabase = await createClient();

  // 1️⃣ Buscar seller por slug
  const { data: seller, error: sellerErr } = await supabase
    .from("sellers")
    .select("id, store_name, store_slug, description")
    .eq("store_slug", storeSlug)
    .single();

  if (sellerErr || !seller) {
    return NextResponse.json(
      { error: "Seller not found", sellerErr },
      { status: 404 }
    );
  }

  // 2️⃣ Traer productos por seller_id
  const { data: products, error: prodErr } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      image_url,
      category,
      in_stock,
      description
    `)
    .eq("seller_id", seller.id)
    .order("order", { ascending: true });

  if (prodErr) {
    return NextResponse.json(
      { error: "Products error", prodErr },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      seller,
      products: products ?? [],
      generatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
