"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFormProps {
  sellerId: string
  onSuccess: () => void
}

export function ProductForm({ sellerId, onSuccess }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "general",
    in_stock: true,
  })

  const supabase = createClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)

    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(f ? URL.createObjectURL(f) : null)
  }

  const uploadProductImage = async (imageFile: File) => {
    // valida tipo
    if (!imageFile.type.startsWith("image/")) {
      throw new Error("El archivo debe ser una imagen.")
    }

    // nombre único (por seller)
    const ext = imageFile.name.split(".").pop() || "jpg"
    const filePath = `${sellerId}/${crypto.randomUUID()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: imageFile.type,
      })

    if (uploadError) throw uploadError

    // si el bucket es PUBLIC:
    const { data } = supabase.storage.from("product-images").getPublicUrl(filePath)
    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const price = Number.parseFloat(formData.price)
      if (isNaN(price) || price < 0) {
        throw new Error("Price must be a valid positive number")
      }

      let imageUrl: string | null = null
      if (file) {
        imageUrl = await uploadProductImage(file)
      }

      const { error: insertError } = await supabase.from("products").insert({
        seller_id: sellerId,
        name: formData.name,
        description: formData.description || null,
        price,
        category: formData.category,
        image_url: imageUrl, // <-- aquí guardas la URL del storage
        in_stock: formData.in_stock,
      })

      if (insertError) throw insertError

      // reset
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "general",
        in_stock: true,
      })
      setFile(null)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add product")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name*</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter product name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (USD)*</Label>
          <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required placeholder="0.00" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description" rows={3} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={handleCategoryChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="beauty">Beauty</SelectItem>
              <SelectItem value="home">Home</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Product Image</Label>
          <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 h-28 w-28 rounded object-cover border"
            />
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
        {isLoading ? "Adding..." : "Add Product"}
      </Button>
    </form>
  )
}
