"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { CategorySelector } from "@/components/admin/CategorySelector"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useProducts } from "@/hooks/useDataStore"
import type { Product } from "@/lib/types"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Product>>({})

  const handleCreate = () => {
    setIsCreating(true)
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
      subcategory: "",
      subSubcategory: "",
      images: [],
      primaryImage: "",
      colors: [],
      sizes: [],
      materials: [],
      careInstructions: [],
      rating: 0,
      reviews: 0,
      isNew: false,
      isSale: false,
      isFeatured: false,
      isLimitedEdition: false,
      customizable: true,
      tags: [],
      sku: "",
      weight: 0,
      stockQuantity: 0,
      lowStockThreshold: 5,
    })
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData(product)
  }

  const handleSave = () => {
    if (isCreating) {
      addProduct(formData as Product)
      setIsCreating(false)
    } else if (editingProduct) {
      updateProduct({ ...editingProduct, ...formData })
      setEditingProduct(null)
    }
    setFormData({})
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingProduct(null)
    setFormData({})
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
    }
  }

  const handleImageUpload = (url: string, type: "primary" | "additional" = "primary") => {
    if (type === "primary") {
      setFormData((prev) => ({ ...prev, primaryImage: url }))
    } else {
      setFormData((prev) => ({
        ...prev,
        images: [
          ...(prev.images || []),
          { id: Date.now().toString(), url, alt: "", type: "front", isPrimary: false, sortOrder: 0 },
        ],
      }))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="mt-2 text-gray-600">
              Manage your t-shirt products with detailed categorization and multiple image support.
            </p>
          </div>
          <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {(isCreating || editingProduct) && (
          <Card>
            <CardHeader>
              <CardTitle>{isCreating ? "Create New Product" : "Edit Product"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter product description"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="originalPrice">Original Price ($)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={formData.OriginalPrice || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, originalPrice: Number.parseFloat(e.target.value) }))}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <CategorySelector
                    category={formData.category}
                    subcategory={formData.subcategory}
                    subSubcategory={formData.subSubcategory}
                    onCategoryChange={(category) => setFormData((prev) => ({ ...prev, category }))}
                    onSubcategoryChange={(subcategory) => setFormData((prev) => ({ ...prev, subcategory }))}
                    onSubSubcategoryChange={(subSubcategory) => setFormData((prev) => ({ ...prev, subSubcategory }))}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isNew"
                        checked={formData.isNew || false}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isNew: checked }))}
                      />
                      <Label htmlFor="isNew">New Product</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isSale"
                        checked={formData.isSale || false}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isSale: checked }))}
                      />
                      <Label htmlFor="isSale">On Sale</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isFeatured"
                        checked={formData.isFeatured || false}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isFeatured: checked }))}
                      />
                      <Label htmlFor="isFeatured">Featured</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="customizable"
                        checked={formData.customizable || false}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, customizable: checked }))}
                      />
                      <Label htmlFor="customizable">Customizable</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label>Primary Product Image</Label>
                    <ImageUpload
                      value={formData.primaryImage || ""}
                      onChange={(url) => handleImageUpload(url, "primary")}
                      category="products"
                      aspectRatio="square"
                      label=""
                    />
                  </div>
                  <div>
                    <Label>Additional Images</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((index) => (
                        <ImageUpload
                          key={index}
                          value=""
                          onChange={(url) => handleImageUpload(url, "additional")}
                          category="products"
                          aspectRatio="square"
                          label={`Image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Product
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-red-600 text-red-600 hover:bg-red-100 hover:border-red-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                {product.primaryImage || product.images?.[0] ? (
                  <img
                    src={product.primaryImage || product.images[0].url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {product.isNew && <Badge className="bg-green-500 text-xs">New</Badge>}
                  {product.isSale && <Badge className="bg-red-500 text-xs">Sale</Badge>}
                  {product.isFeatured && <Badge className="bg-blue-500 text-xs">Featured</Badge>}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.category && (
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  )}
                  {product.subcategory && (
                    <Badge variant="outline" className="text-xs">
                      {product.subcategory}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-red-600">${product.price}</span>
                    {product.OriginalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.OriginalPrice}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">Stock: {product.stockQuantity || 0}</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(product)} className="flex-1">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-500 mb-4">Create your first product to start building your catalog.</p>
              <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700 text-white">
                Create Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}