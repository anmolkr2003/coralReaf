export interface ProductVariant {
  id: string
  size: string
  color: string
  sku: string
  price: number
  compareAtPrice?: number
  inventory: number
  image?: string
  customizable?: boolean
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  position: number
  variant?: string
  zoom?: string
}

export interface ProductCustomization {
  id: string
  type: "text" | "embroidery" | "print" | "color" | "size"
  name: string
  description: string
  options: CustomizationOption[]
  required: boolean
  price: number
  maxLength?: number
  allowedPositions?: string[]
  previewImage?: string
}

export interface CustomizationOption {
  id: string
  name: string
  value: string
  price: number
  image?: string
  hexColor?: string
}

export interface ProductReview {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  pros?: string[]
  cons?: string[]
  verified: boolean
  helpful: number
  notHelpful: number
  images?: ReviewImage[]
  size?: string
  color?: string
  fit?: "small" | "true" | "large"
  quality?: number
  value?: number
  comfort?: number
  style?: number
  createdAt: string
  updatedAt: string
  status: "pending" | "approved" | "rejected"
  moderatorNote?: string
}

export interface ReviewImage {
  id: string
  url: string
  alt: string
  thumbnail: string
}

export interface ReviewStats {
  average: number
  total: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  aspects: {
    quality: number
    value: number
    comfort: number
    style: number
    fit: number
  }
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  slug: string
  ogImage?: string
  schema?: any
}

export interface Product {
  id: string
  name: string
  description: string
  shortDescription?: string
  price: number
  compareAtPrice?: number
  images: ProductImage[]
  category: string
  subcategory?: string
  brand?: string
  tags: string[]
  variants: ProductVariant[]
  sizes: string[]
  colors: string[]
  materials: string[]
  careInstructions?: string[]
  features: string[]
  customizations: ProductCustomization[]
  inventory: number
  lowStockThreshold: number
  featured: boolean
  published: boolean
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  seo: SEOData
  reviews: ProductReview[]
  reviewStats: ReviewStats
  rating: number
  reviewCount: number
  relatedProducts: string[]
  crossSellProducts: string[]
  upsellProducts: string[]
  createdAt: string
  updatedAt: string
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  product: Product
  variant?: ProductVariant
  customizations?: Record<string, any>
  addedAt: string
  notes?: string
}

export interface Wishlist {
  id: string
  userId: string
  name: string
  description?: string
  items: WishlistItem[]
  isPublic: boolean
  shareToken?: string
  createdAt: string
  updatedAt: string
}

export interface RecentlyViewed {
  productId: string
  viewedAt: string
  variant?: ProductVariant
}

export interface ProductRecommendation {
  type: "related" | "crossSell" | "upsell" | "trending" | "personalized"
  products: Product[]
  reason?: string
}
