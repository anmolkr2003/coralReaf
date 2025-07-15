"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed"
import { ProductImageGallery } from "@/components/product/ProductImageGallery"
import { ProductReviews } from "@/components/product/ProductReviews"
import { ProductCustomization } from "@/components/product/ProductCustomization"
import { RelatedProducts } from "@/components/product/RelatedProducts"
import { ShareProduct } from "@/components/product/ShareProduct"
import { ProductBreadcrumb } from "@/components/product/ProductBreadcrumb"
import { Star, Heart, ShoppingCart, Truck, RotateCcw, Shield, Plus, Minus, AlertCircle, Check } from "lucide-react"

// Import the CustomizationOption type for type assertion
import type { CustomizationOption } from "@/components/product/ProductCustomization"

// Enhanced mock data
const mockProduct = {
  id: "1",
  name: "Eco-Friendly Organic Cotton Hoodie",
  description:
    "This premium hoodie combines comfort with sustainability. Made from 100% organic cotton with eco-friendly dyes, it features a relaxed fit perfect for everyday wear. The soft brushed interior provides warmth while the durable exterior ensures long-lasting wear.",
  shortDescription: "Premium organic cotton hoodie with sustainable materials and comfortable fit.",
  price: 59.99,
  compareAtPrice: 79.99,
  variants: [
    {
      id: "v1",
      size: "M",
      color: "Gray",
      sku: "ECO-HOO-GRY-M",
      price: 59.99,
      inventory: 25,
      images: [
        { id: "i1", url: "/placeholder.svg?height=600&width=600", alt: "Gray hoodie front", position: 0 },
        { id: "i2", url: "/placeholder.svg?height=600&width=600", alt: "Gray hoodie back", position: 1 },
      ],
    },
  ],
  images: [
    { id: "i1", url: "/placeholder.svg?height=600&width=600", alt: "Hoodie front view", position: 0 },
    { id: "i2", url: "/placeholder.svg?height=600&width=600", alt: "Hoodie back view", position: 1 },
    { id: "i3", url: "/placeholder.svg?height=600&width=600", alt: "Hoodie side view", position: 2 },
    { id: "i4", url: "/placeholder.svg?height=600&width=600", alt: "Hoodie detail view", position: 3 },
    { id: "i5", url: "/placeholder.svg?height=600&width=600", alt: "Hoodie lifestyle", position: 4 },
  ],
  category: "Clothing",
  subcategory: "Hoodies",
  brand: "Coralreaf",
  tags: ["sustainable", "organic", "cotton", "eco-friendly", "unisex"],
  materials: ["100% Organic Cotton", "Eco-friendly dyes", "Recycled polyester drawstrings"],
  careInstructions: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Iron on low heat"],
  features: [
    "100% organic cotton construction",
    "Eco-friendly dyes and materials",
    "Soft brushed interior lining",
    "Adjustable drawstring hood",
    "Kangaroo pocket with hidden phone compartment",
    "Ribbed cuffs and hem for comfort",
    "Unisex sizing and fit",
  ],
  customizations: [
    {
      id: "c1",
      type: "text" as const,
      name: "Custom Text",
      options: ["Front", "Back", "Sleeve"],
      price: 8.99,
      required: false,
      maxLength: 20,
      preview: true,
    },
    {
      id: "c2",
      type: "embroidery" as const,
      name: "Logo Embroidery",
      options: ["Left Chest", "Right Chest", "Back"],
      price: 12.99,
      required: false,
      preview: true,
    },
  ] as CustomizationOption[],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["Gray", "Navy", "Olive", "Cream", "Black"],
  inventory: 125,
  lowStockThreshold: 10,
  featured: true,
  published: true,
  weight: 0.8,
  dimensions: { length: 25, width: 20, height: 2 },
  reviews: [],
  rating: 4.8,
  reviewCount: 127,
  viewCount: 1250,
  salesCount: 89,
  relatedProducts: ["2", "3", "4"],
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-15T00:00:00Z",
}

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToRecentlyViewed } = useRecentlyViewed()

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  type CustomizationValue = { price?: number; [key: string]: any }
  const [customizations, setCustomizations] = useState<Record<string, CustomizationValue>>({})
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showCustomization, setShowCustomization] = useState(false)

  const product = mockProduct
  const isWishlisted = isInWishlist(product.id)
  const isLowStock = product.inventory <= product.lowStockThreshold
  const isOutOfStock = product.inventory === 0

  useEffect(() => {
    // Add to recently viewed
    addToRecentlyViewed(product.id)
  }, [product.id])

  interface SizeChangeHandler {
    (size: string): void
  }

  const handleSizeChange: SizeChangeHandler = (size) => {
    setSelectedSize(size)
    // Update available colors based on size
  }

  interface ColorChangeHandler {
    (color: string): void
  }

  const handleColorChange: ColorChangeHandler = (color) => {
    setSelectedColor(color)
    // Update product images based on color
  }

  interface HandleQuantityChange {
    (change: number): void
  }

  const handleQuantityChange: HandleQuantityChange = (change) => {
    const newQuantity = Math.max(1, Math.min(product.inventory, quantity + change))
    setQuantity(newQuantity)
  }

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color")
      return
    }

    setIsLoading(true)

    try {
      await addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[selectedImage]?.url,
        size: selectedSize,
        color: selectedColor,
        quantity,
      })

      // Show success message
      alert("Added to cart successfully!")
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("Failed to add to cart")
    } finally {
      setIsLoading(false)
    }
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id, { size: selectedSize, color: selectedColor })
    }
  }
  const totalPrice = product.price + Object.values(customizations).reduce((sum, custom) => sum + (custom.price || 0), 0)

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <ProductBreadcrumb product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery
              images={product.images}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                {product.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {product.featured && <Badge className="bg-olive text-cream">Featured</Badge>}
              </div>

              <h1 className="text-3xl font-bold text-mud mb-3">{product.name}</h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">{product.salesCount} sold</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-olive">${totalPrice.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.compareAtPrice.toFixed(2)}</span>
                    <Badge variant="destructive" className="bg-red-500">
                      Save ${(product.compareAtPrice - product.price).toFixed(0)}
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              {/* Size Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Size {!selectedSize && <span className="text-red-500">*</span>}
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`py-3 px-4 border rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-olive bg-olive text-cream shadow-md"
                          : "border-gray-300 hover:border-olive hover:shadow-sm"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Color {!selectedColor && <span className="text-red-500">*</span>}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`py-3 px-4 border rounded-lg text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-olive bg-olive text-cream shadow-md"
                          : "border-gray-300 hover:border-olive hover:shadow-sm"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Quantity</Label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.inventory}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">{product.inventory} available</span>
                </div>
              </div>

              {/* Customization Options */}
              {product.customizations.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium">Customization</Label>
                    <Button variant="outline" size="sm" onClick={() => setShowCustomization(!showCustomization)}>
                      {showCustomization ? "Hide" : "Add"} Customization
                    </Button>
                  </div>
                  {showCustomization && (
                    <ProductCustomization
                      customizations={product.customizations}
                      selectedCustomizations={customizations}
                      onCustomizationChange={setCustomizations}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Stock Status */}
            {isLowStock && !isOutOfStock && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="text-orange-700 text-sm font-medium">Only {product.inventory} left in stock!</span>
              </div>
            )}

            {isOutOfStock && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-red-700 text-sm font-medium">Currently out of stock</span>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={isLoading || isOutOfStock || !selectedSize || !selectedColor}
                className="w-full bg-olive hover:bg-olive/90 text-cream py-4 text-lg font-semibold"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                    Adding to Cart...
                  </div>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {isOutOfStock ? "Out of Stock" : `Add to Cart - $${totalPrice.toFixed(2)}`}
                  </>
                )}
              </Button>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleWishlistToggle} className="flex-1 bg-transparent">
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
                <ShareProduct product={product} />
              </div>
            </div>

            {/* Trust Badges */}
            <Card className="bg-white/50">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span>Free shipping over $75</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-blue-600" />
                    <span>30-day returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="size-guide">Size Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Materials & Care</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Materials</h4>
                      <ul className="space-y-1">
                        {product.materials.map((material, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            • {material}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Care Instructions</h4>
                      <ul className="space-y-1">
                        {product.careInstructions.map((instruction, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            • {instruction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ProductReviews
              productId={product.id}
              reviews={product.reviews}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Shipping Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Free Standard Shipping</div>
                        <div className="text-sm text-gray-600">5-7 business days • Orders over $75</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Express Shipping - $9.99</div>
                        <div className="text-sm text-gray-600">2-3 business days</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Overnight Shipping - $19.99</div>
                        <div className="text-sm text-gray-600">Next business day</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Returns & Exchanges</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <RotateCcw className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">30-Day Returns</div>
                        <div className="text-sm text-gray-600">Free returns on all orders</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <RotateCcw className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Easy Exchanges</div>
                        <div className="text-sm text-gray-600">Size or color exchanges</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Quality Guarantee</div>
                        <div className="text-sm text-gray-600">100% satisfaction guaranteed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="size-guide" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Size Guide</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Size</th>
                        <th className="text-left p-2">Chest (inches)</th>
                        <th className="text-left p-2">Length (inches)</th>
                        <th className="text-left p-2">Sleeve (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-medium">XS</td>
                        <td className="p-2">34-36</td>
                        <td className="p-2">26</td>
                        <td className="p-2">24</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">S</td>
                        <td className="p-2">36-38</td>
                        <td className="p-2">27</td>
                        <td className="p-2">25</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">M</td>
                        <td className="p-2">38-40</td>
                        <td className="p-2">28</td>
                        <td className="p-2">26</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">L</td>
                        <td className="p-2">40-42</td>
                        <td className="p-2">29</td>
                        <td className="p-2">27</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">XL</td>
                        <td className="p-2">42-44</td>
                        <td className="p-2">30</td>
                        <td className="p-2">28</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">XXL</td>
                        <td className="p-2">44-46</td>
                        <td className="p-2">31</td>
                        <td className="p-2">29</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts productId={product.id} relatedProductIds={product.relatedProducts} />
        </div>
      </div>
    </div>
  )
}
