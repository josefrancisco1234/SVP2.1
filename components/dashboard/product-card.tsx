"use client"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  in_stock: boolean
}

interface ProductCardProps {
  product: Product
  onDeleted: () => void
}

export function ProductCard({ product, onDeleted }: ProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const supabase = createClient()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return

    setIsDeleting(true)
    const { error } = await supabase.from("products").delete().eq("id", product.id)

    if (!error) {
      onDeleted()
    }
    setIsDeleting(false)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {product.image_url && (
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg">{product.name}</CardTitle>
        {product.category && <p className="text-xs text-gray-600 mt-1">{product.category}</p>}
      </CardHeader>

      <CardContent className="space-y-4">
        {product.description && <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
            <p className="text-xs text-gray-600">{product.in_stock ? "In Stock" : "Out of Stock"}</p>
          </div>
          <Button onClick={handleDelete} disabled={isDeleting} variant="destructive" size="sm">
            {isDeleting ? "..." : "Delete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
