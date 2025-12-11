interface StoreSeller {
  id: string
  store_name: string
  description: string | null
  logo_url: string | null
}

interface StoreInfoProps {
  seller: StoreSeller
}

export function StoreInfo({ seller }: StoreInfoProps) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-6">
          {seller.logo_url && (
            <img
              src={seller.logo_url || "/placeholder.svg"}
              alt={seller.store_name}
              className="h-20 w-20 rounded-lg object-cover"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{seller.store_name}</h1>
            {seller.description && <p className="mt-2 text-gray-600">{seller.description}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
