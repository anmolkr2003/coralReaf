"use client"

import { useState } from "react"
import { useWishlist } from "@/hooks/useWishlist"
import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, X, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock wishlist products data
const mockWishlistProducts = [
  {
    id: "1",
    name: "Eco-Friendly Hoodie",
    price: 59.99,
    compareAtPrice: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Navy", "Olive"],
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
  },
  {
    id: "3",
    name: "Recycled Denim Jacket",
    price: 89.99,
    compareAtPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    inStock: false,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
  },
]

export default function WishlistPage() {
  const { user } = useAuth()
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-mud mb-2">Your Wishlist</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your wishlist</p>
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1,
    })
  }

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId)
  }

  const handleSelectItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleAddSelectedToCart = () => {
    const selectedProducts = mockWishlistProducts.filter((p) => selectedItems.includes(p.id))
    selectedProducts.forEach((product) => {
      if (product.inStock) {
        handleAddToCart(product)
      }
    })
    setSelectedItems([])
  }

  const handleRemoveSelected = () => {
    selectedItems.forEach((productId) => {
      removeFromWishlist(productId)
    })
    setSelectedItems([])
  }

  const inStockCount = mockWishlistProducts.filter((p) => p.inStock).length
  const totalValue = mockWishlistProducts.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-mud mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {mockWishlistProducts.length} items • {inStockCount} in stock • Total value: ${totalValue.toFixed(2)}
          </p>
        </div>

        {mockWishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-mud mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save items you love by clicking the heart icon on any product</p>
            <Button asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Bulk Actions */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === mockWishlistProducts.length}
                    onChange={(e) => setSelectedItems(e.target.checked ? mockWishlistProducts.map((p) => p.id) : [])}
                    className="rounded border-gray-300 text-olive focus:ring-olive"
                  />
                  <span className="text-sm font-medium">Select all ({selectedItems.length} selected)</span>
                </label>
              </div>

              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleAddSelectedToCart}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveSelected}
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              )}
            </div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockWishlistProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(product.id)}
                        onChange={() => handleSelectItem(product.id)}
                        className="w-5 h-5 rounded border-gray-300 text-olive focus:ring-olive"
                      />
                    </div>

                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>

                    <div className="aspect-square relative">
                      <Link href={`/product/${product.id}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {product.compareAtPrice && (
                        <Badge className="absolute bottom-2 left-2 bg-red-500 text-white">
                          Save ${(product.compareAtPrice - product.price).toFixed(0)}
                        </Badge>
                      )}

                      {!product.inStock && (
                        <Badge className="absolute bottom-2 right-2 bg-gray-500 text-white">Out of Stock</Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-mud mb-2 line-clamp-2 hover:text-olive transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-olive">${product.price.toFixed(2)}</span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.compareAtPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="text-xs text-gray-500 mb-4">
                      <div>Sizes: {product.sizes.join(", ")}</div>
                      <div>Colors: {product.colors.join(", ")}</div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="flex-1 bg-olive hover:bg-olive/90 text-cream"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                      <Button variant="outline" size="sm" className="px-3 bg-transparent">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={clearWishlist}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                Clear Wishlist
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
                <Button
                  onClick={handleAddSelectedToCart}
                  disabled={selectedItems.length === 0}
                  className="bg-olive hover:bg-olive/90 text-cream"
                >
                  Add Selected to Cart ({selectedItems.length})
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
