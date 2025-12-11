"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"

interface EmbedCodeProps {
  slug: string
}

export function EmbedCode({ slug }: EmbedCodeProps) {
  const [copiedType, setCopiedType] = useState<"iframe" | "link" | null>(null)

  const embedCode = `<iframe src="${typeof window !== "undefined" ? window.location.origin : ""}/embed/${slug}" width="100%" height="600" style="border: none; border-radius: 8px;" title="Store Catalog"></iframe>`
  const directLink = `${typeof window !== "undefined" ? window.location.origin : ""}/stores/${slug}`

  const handleCopy = (type: "iframe" | "link") => {
    const text = type === "iframe" ? embedCode : directLink
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compartir Tu Catálogo</CardTitle>
        <CardDescription>Copia el código para incrustar tu catálogo en otra página web</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Direct Link */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Link Directo a tu Tienda</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={directLink}
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700"
            />
            <Button onClick={() => handleCopy("link")} variant="outline" size="sm" className="whitespace-nowrap">
              {copiedType === "link" ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copiar
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Comparte este link directo a tu tienda</p>
        </div>

        {/* Iframe Code */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Código para Incrustar (Iframe)</label>
          <div className="rounded-lg bg-gray-50 p-3 mb-2 border border-gray-300">
            <code className="text-xs text-gray-800 break-all">{embedCode}</code>
          </div>
          <Button onClick={() => handleCopy("iframe")} className="w-full bg-blue-600 hover:bg-blue-700">
            {copiedType === "iframe" ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar Código
              </>
            )}
          </Button>
          <p className="text-xs text-gray-500 mt-2">Pega este código HTML en otra página web</p>
        </div>
      </CardContent>
    </Card>
  )
}
