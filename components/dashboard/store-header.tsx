"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface StoreHeaderProps {
  seller: {
    id: string
    store_name: string
    store_slug: string
    description: string | null
  }
}

export function StoreHeader({ seller }: StoreHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const storeUrl = `${window.location.origin}/stores/${seller.store_slug}`

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{seller.store_name}</h1>
            {seller.description && <p className="mt-1 text-gray-600">{seller.description}</p>}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Store URL</p>
              <code className="text-sm font-mono text-blue-600">{storeUrl}</code>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
