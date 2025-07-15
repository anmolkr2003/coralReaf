"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye } from "lucide-react"
import { useProductRecommendations } from "@/hooks/useProductRecommendations"
import { useCart } from "@/hooks/useCart"
import { WishlistButton } from "./WishlistButton"
import type { Product } from "@/types/product"
import Image from "next/image"
import Link from "next/link"

interface ProductRecommendationsProps {
  productId?: string
  userId?: string
  type?: "related" | "crossSell" | "upsell" | "trending" | "personalized"
  title?: string
  limit?: number
}

// Mock products for demonstration
const mockProducts: Product[] = [
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    description: "Soft, breathable organic cotton t-shirt perfect for everyday wear.",
    price: 29.99,
    compareAtPrice: 39.99,
    images: [{ id: "1", url: "/placeholder.svg?height=400&width=400", alt: "Organic Cotton T-Shirt", position: 1 }],
    category: "T-Shirts",
    tags: ["organic", "cotton", "sustainable"],
    variants: [],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy", "Olive"],
    materials: ["100% Organic Cotton"],
    features: ["Soft and comfortable", "Sustainable materials"],
    customizations: [],
    inventory: 100,
    lowStockThreshold: 10,
    featured: true,
    published: true,
    seo: { title: "", description: "", keywords: [], slug: "" },
    reviews: [],
    reviewStats: {
      average: 4.5,
      total: 89,
      distribution: { 5: 45, 4: 30, 3: 10, 2: 3, 1: 1 },
      aspects: { quality: 4.5, value: 4.2, comfort: 4.8, style: 4.3, fit: 4.4 },
    },
    rating: 4.5,
    reviewCount: 89,
    relatedProducts: [],
    crossSellProducts: [],
    upsellProducts: [],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "3",
    name: "Recycled Denim Jacket",
    description: "Stylish denim jacket made from 100% recycled materials.",
    price: 89.99,
    images: [{ id: "1", url: "/placeholder.svg?height=400&width=400", alt: "Recycled Denim Jacket", position: 1 }],
    category: "Jackets",
    tags: ["recycled", "denim", "sustainable"],
    variants: [],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    materials: ["100% Recycled Denim"],
    features: ["Durable construction", "Classic style"],
    customizations: [],
    inventory: 25,
    lowStockThreshold: 5,
    featured: true,
    published: true,
    seo: { title: "", description: "", keywords: [], slug: "" },
    reviews: [],
    reviewStats: {
      average: 4.7,
      total: 56,
      distribution: { 5: 35, 4: 15, 3: 4, 2: 1, 1: 1 },
      aspects: { quality: 4.8, value: 4.3, comfort: 4.5, style: 4.9, fit: 4.6 },
    },
    rating: 4.7,
    reviewCount: 56,
    relatedProducts: [],
    crossSellProducts: [],
    upsellProducts: [],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
]

export function ProductRecommendations({
  productId,
  userId,
  type = "related",
  title,
  limit = 4,
}: ProductRecommendationsProps) {
  const { recommendations, loading } = useProductRecommendations(productId, userId)
  const { addItem } = useCart()

  // Use mock data for now
  const products = mockProducts.slice(0, limit)

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || "/placeholder.svg",
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1,
    })
  }

  const getTitle = () => {
    if (title) return title

    switch (type) {
      case "related":
        return "You Might Also Like"
      case "crossSell":
        return "Complete the Look"
      case "upsell":
        return "Premium Alternatives"
      case "trending":
        return "Trending Now"
      case "personalized":
        return "Recommended for You"
      default:
        return "Recommended Products"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{getTitle()}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!products.length) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group space-y-3">
              {/* Product Image */}
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.images[0]?.url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Sale Badge */}
                {product.compareAtPrice && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    Save ${(product.compareAtPrice - product.price).toFixed(0)}
                  </Badge>
                )}

                {/* Quick Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <WishlistButton product={product} size="sm" showText={false} className="w-8 h-8 p-0" />
                </div>

                {/* Quick View */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" asChild className="bg-white/90 hover:bg-white">
                    <Link href={`/product/${product.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Quick View
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <Link href={`/product/${product.id}`} className="block hover:text-olive transition-colors">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1">
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

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-olive">${product.price.toFixed(2)}</span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.compareAtPrice.toFixed(2)}</span>
                  )}
                </div>

                {/* Add to Cart */}
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-olive hover:bg-olive/90 text-cream"
                >
                  <ShoppingCart className="w-3 h-3 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
