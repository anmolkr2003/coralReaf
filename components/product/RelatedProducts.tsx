"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import Image from "next/image"
import Link from "next/link"

interface RelatedProductsProps {
  productId: string
  relatedProductIds: string[]
}

// Mock related products data
const mockRelatedProducts = [
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    compareAtPrice: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray", "Navy"],
  },
  {
    id: "3",
    name: "Recycled Denim Jacket",
    price: 89.99,
    compareAtPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Gray"],
  },
  {
    id: "4",
    name: "Bamboo Fiber Socks",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    sizes: ["S", "M", "L"],
    colors: ["White", "Black", "Gray", "Navy"],
  },
  {
    id: "5",
    name: "Hemp Canvas Backpack",
    price: 79.99,
    compareAtPrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviewCount: 67,
    inStock: false,
    sizes: ["One Size"],
    colors: ["Olive", "Brown", "Black"],
  },
]

export function RelatedProducts({ productId, relatedProductIds }: RelatedProductsProps) {
  const { addItem } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const [products, setProducts] = useState(mockRelatedProducts)

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

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      // Remove from wishlist logic would go here
    } else {
      addToWishlist(product.id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-mud">You Might Also Like</h2>
        <Button variant="outline" asChild>
          <Link href="/shop">View All Products</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {product.compareAtPrice && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  Save ${(product.compareAtPrice - product.price).toFixed(0)}
                </Badge>
              )}

              {!product.inStock && (
                <Badge className="absolute top-2 right-2 bg-gray-500 text-white">Out of Stock</Badge>
              )}

              {/* Quick Actions */}
              <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleWishlistToggle(product)}
                  className="w-8 h-8 p-0"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current text-red-500" : ""}`} />
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="w-8 h-8 p-0 bg-olive hover:bg-olive/90"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <CardContent className="p-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-mud mb-1 line-clamp-2 hover:text-olive transition-colors">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-600">({product.reviewCount})</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-olive">${product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.compareAtPrice.toFixed(2)}</span>
                )}
              </div>

              <div className="text-xs text-gray-500 mb-3">
                <div>Sizes: {product.sizes.slice(0, 3).join(", ")}</div>
                <div>Colors: {product.colors.slice(0, 3).join(", ")}</div>
              </div>

              <Button
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
                className="w-full bg-olive hover:bg-olive/90 text-cream"
                size="sm"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
