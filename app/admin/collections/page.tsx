"use client"

import { useState } from "react"
import Image from "next/image"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useCollections } from "@/hooks/useDataStore"
import type { Collection } from "@/lib/types"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

const mockProducts = [
  { id: "p1", name: "Denim" },
  { id: "p2", name: "T-Shirt" },
  { id: "p3", name: "Sneakers" },
  { id: "p4", name: "Jacket" },
  { id: "p5", name: "Hat" },
  { id: "p6", name: "Backpack" },
  { id: "p7", name: "Sunglasses" },
  { id: "p8", name: "Watch" },
  { id: "p9", name: "Belt" },
  { id: "p10", name: "Scarf" },
  { id: "p11", name: "Gloves" },
  { id: "p12", name: "Socks" },
  { id: "p13", name: "Shorts" },
  { id: "p14", name: "Sweater" },
  { id: "p15", name: "Boots" },
  { id: "p16", name: "Blazer" },
  { id: "p17", name: "Skirt" },
  { id: "p18", name: "Dress" },
  { id: "p19", name: "Pants" },
  { id: "p20", name: "Coat" },
]

export default function AdminCollections() {
  const { collections, addCollection, updateCollection, deleteCollection } = useCollections()

  const [editingCollection, setEditingCollection] = useState<Collection | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Omit<Collection, "id" | "createdAt" | "updatedAt"> | null>(null)

  const handleCreate = () => {
    setIsCreating(true)
    setFormData({
      name: "",
      description: "",
      image: "",
      products: [],
      isActive: true,
      featured: false,
      sortOrder: 0,
    })
  }

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection)
    setFormData({
      name: collection.name,
      description: collection.description,
      image: collection.image,
      products: collection.products ?? [],
      isActive: collection.isActive,
      featured: collection.featured,
      sortOrder: collection.sortOrder ?? 0,
    })
  }

  const handleSave = async () => {
    if (!formData) return

    try {
      if (isCreating) {
        await addCollection(formData)
        setIsCreating(false)
      } else if (editingCollection) {
        await updateCollection(editingCollection.id, formData)
        setEditingCollection(null)
      }
      setFormData(null)
    } catch (err) {
      console.error("Error saving collection:", err)
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingCollection(null)
    setFormData(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this collection?")) {
      deleteCollection(id)
    }
  }

  const toggleProductSelection = (productId: string) => {
    setFormData((prev) => {
      if (!prev) return prev
      const selected = new Set(prev.products ?? [])
      selected.has(productId) ? selected.delete(productId) : selected.add(productId)
      return { ...prev, products: Array.from(selected) }
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-red-900">Collections</h1>
            <p className="mt-2 text-red-700">
              Manage your product collections. Images are automatically optimized for web display.
            </p>
          </div>
          <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Collection
          </Button>
        </div>

        {(isCreating || editingCollection) && formData && (
          <Card>
            <CardHeader>
              <CardTitle>{isCreating ? "Create New Collection" : "Edit Collection"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Collection Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev!, name: e.target.value }))}
                      placeholder="Enter collection name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev!, description: e.target.value }))}
                      placeholder="Enter collection description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="featured">Featured</Label>
                    <Switch
                      id="featured"
                      checked={formData.featured || false}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev!, featured: checked }))}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive || false}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev!, isActive: checked }))}
                    />
                    <Label htmlFor="isActive">Active (show on website)</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="products">Select Products</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mockProducts.map((product) => (
                      <div key={product.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`product-${product.id}`}
                          checked={formData.products?.includes(product.id) || false}
                          onChange={() => toggleProductSelection(product.id)}
                        />
                        <Label htmlFor={`product-${product.id}`}>{product.name}</Label>
                      </div>
                    ))}
                  </div>
                  <ImageUpload
                    value={formData.image || ""}
                    onChange={(url) => setFormData((prev) => ({ ...prev!, image: url }))}
                    category="collections"
                    label="Collection Image"
                    aspectRatio="landscape"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Collection
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Card key={collection.id} className="overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                {collection.image ? (
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
                <div className="absolute top-2 right-2">
                  {collection.isActive ? (
                    <Badge className="bg-red-500">Active</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 border border-red-300">Inactive</Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-red-900">{collection.name}</h3>
                <p className="text-red-700 text-sm mb-4 line-clamp-2">{collection.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-700">{collection.products.length} products</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(collection)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(collection.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {collections.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-red-400 mb-4">
                <Plus className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-red-900 mb-2">No collections yet</h3>
              <p className="text-red-700 mb-4">
                Create your first collection to organize your products and showcase them on your homepage.
              </p>
              <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700 text-white">
                Create Collection
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-red-900 mb-3">💡 Image Management Tips</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-red-800">
              <div>
                <h4 className="font-semibold mb-2">📁 Where to Save Images:</h4>
                <ul className="space-y-1">
                  <li>• Upload directly through this admin panel</li>
                  <li>• Or save to: <code>public/images/raw/collections/</code></li>
                  <li>• Then run: <code>npm run optimize-images</code></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🌟 Best Practices:</h4>
                <ul className="space-y-1">
                  <li>• Use 1200x800px for collections</li>
                  <li>• JPG format for photos</li>
                  <li>• Descriptive filenames</li>
                  <li>• Keep files under 5MB</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
