"use client"

import { useState, useMemo } from "react"
import { useProducts } from "@/hooks/useDataStore"
import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Search, ShoppingCart, Filter } from "lucide-react"
import Link from "next/link"

export default function ShopPage() {
  const { products, loading } = useProducts()
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category)
    return ["all", ...Array.from(new Set(cats))]
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [products, searchQuery, selectedCategory, sortBy])

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/placeholder.svg",
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e71318] mx-auto mb-4"></div>
          <p className="text-[#4A4A4A] font-bold">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-primary">
      <section className="bg-primary/10 py-16">
  <div className="container mx-auto px-4">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-[#1F1F1F] mb-4">Shop Sustainable Fashion</h1>
      <p className="text-xl text-[#666666] max-w-2xl mx-auto">
        Discover our collection of eco-friendly clothing made with love for you and the planet
      </p>
    </div>
  </div>
</section>


     {/* Filter/Search Bar Section */}
<section className="bg-white border-t py-6 shadow-sm sticky top-0 z-20">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#999999] w-4 h-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-300 focus:ring-[#e71318]"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300 focus:ring-[#e71318]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-300 z-30">
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300 focus:ring-[#e71318]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-300 z-30">
          <SelectItem value="name">Name A-Z</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</section>

{/* ✅ Product Listing with Background Hover Theme */}
<section className="py-12 px-4 bg-primary/5 transition-all hover:bg-primary/10">
  <div className="container mx-auto">
    {filteredAndSortedProducts.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-xl text-[#666666] font-bold">No products found matching your criteria.</p>
      </div>
    ) : (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow bg-white">
            <div className="relative h-64">
              <Image
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-[#1F1F1F] text-white font-bold">Featured</Badge>
              )}
              {!product.inStock && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white font-bold">Out of Stock</Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-[#1F1F1F] mb-2 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-[#666666] mb-3 line-clamp-2">{product.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {product.tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-bold">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#e71318]">${product.price.toFixed(2)}</span>
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="bg-[#e71318] hover:bg-[#c11115] text-white disabled:opacity-50 font-bold"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>

              <div className="mt-3 text-xs text-[#999999]">
                <p>Sizes: {product.sizes.join(", ")}</p>
                <p>Colors: {product.colors.join(", ")}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </div>
</section>
    </div>
  )
}