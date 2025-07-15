export interface ProductImage {
  id: string
  url: string
  alt: string
  position: number
  color?: string
  variant?: string
}

export interface ProductVariant {
  id: string
  size: string
  color: string
  sku: string
  price: number
  compareAtPrice?: number
  inventory: number
  images: ProductImage[]
}

export interface ProductReview {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  images: string[]
  verified: boolean
  helpful: number
  reported: number
  createdAt: string
  updatedAt: string
}

export interface ProductCustomization {
  id: string
  type: "text" | "embroidery" | "color" | "size"
  name: string
  options: string[]
  price: number
  required: boolean
  maxLength?: number
  preview?: boolean
}

export interface EnhancedProduct {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  variants: ProductVariant[]
  images: ProductImage[]
  category: string
  subcategory: string
  brand: string
  tags: string[]
  materials: string[]
  careInstructions: string[]
  features: string[]
  customizations: ProductCustomization[]
  sizes: string[]
  colors: string[]
  inventory: number
  lowStockThreshold: number
  featured: boolean
  published: boolean
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  reviews: ProductReview[]
  rating: number
  reviewCount: number
  viewCount: number
  salesCount: number
  relatedProducts: string[]
  createdAt: string
  updatedAt: string
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  variant?: {
    size: string
    color: string
  }
  createdAt: string
}

export interface RecentlyViewed {
  id: string
  userId: string
  productId: string
  viewedAt: string
}
