import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProductList } from "@/components/dashboard/product-list"
import { StoreHeader } from "@/components/dashboard/store-header"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect("/auth/login")

  // 1) Buscar seller
  let { data: seller } = await supabase
    .from("sellers")
    .select("*")
    .eq("id", user.id)
    .single()

  // 2) Si no existe, créalo (sirve para usuarios viejos o si el trigger no corrió)
  if (!seller) {
    const defaultSlug = user.id.replaceAll("-", "")
    await supabase.from("sellers").upsert(
      {
        id: user.id,
        store_name: "My Store",
        store_slug: defaultSlug,
        description: null,
      },
      { onConflict: "id" }
    )

    const res2 = await supabase
      .from("sellers")
      .select("*")
      .eq("id", user.id)
      .single()

    seller = res2.data ?? null
  }

  if (!seller) redirect("/auth/login")

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <StoreHeader seller={seller} />
      <main className="container mx-auto px-4 py-8">
        <ProductList sellerId={user.id} />
      </main>
    </div>
  )
}
