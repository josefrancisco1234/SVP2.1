import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProductList } from "@/components/dashboard/product-list"
import { StoreHeader } from "@/components/dashboard/store-header"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: seller, error: sellerError } = await supabase
    .from("sellers")
    .select("*")
    .eq("id", data.user.id)
    .single()

  if (sellerError || !seller) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <StoreHeader seller={seller} />
      <main className="container mx-auto px-4 py-8">
        <ProductList sellerId={data.user.id} />
      </main>
    </div>
  )
}
