import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { StoreCatalog } from "@/components/store/catalog"

interface EmbedPageProps {
  params: {
    slug: string
  }
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  const supabase = await createClient()

  const { data: seller, error: sellerError } = await supabase
    .from("sellers")
    .select("*")
    .eq("store_slug", params.slug)
    .single()

  if (sellerError || !seller) {
    notFound()
  }

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("seller_id", seller.id)
    .eq("in_stock", true)
    .order("order", { ascending: true })

  const productList = productsError ? [] : products || []

  return (
    <div className="w-full bg-white p-6">
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">{seller.store_name}</h2>
      </div>
      <StoreCatalog products={productList} />
    </div>
  )
}
