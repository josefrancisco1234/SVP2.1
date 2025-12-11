import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { StoreCatalog } from "@/components/store/catalog"
import { StoreInfo } from "@/components/store/info"
import { EmbedCode } from "@/components/store/embed-code"

interface StorePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: StorePageProps) {
  const supabase = await createClient()

  const { data: seller } = await supabase
    .from("sellers")
    .select("store_name, description")
    .eq("store_slug", params.slug)
    .single()

  if (!seller) return { title: "Store Not Found" }

  return {
    title: `${seller.store_name} - Catalog`,
    description: seller.description || `Shop at ${seller.store_name}`,
  }
}

export default async function StorePage({ params }: StorePageProps) {
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
    <div className="min-h-screen bg-gray-50">
      <StoreInfo seller={seller} />

      <main className="container mx-auto px-4 py-12">
        <StoreCatalog products={productList} />

        <div className="mt-12 border-t border-gray-200 pt-8">
          <EmbedCode slug={params.slug} />
        </div>
      </main>
    </div>
  )
}
