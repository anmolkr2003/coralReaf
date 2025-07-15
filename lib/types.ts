export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
  totalOrders: number
  totalSpent: number
  lastOrderDate?: Date

}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  OriginalPrice?: number
  images:   {
    id: string;
    url: string;
    alt: string;
    type: string;
    isPrimary: boolean;
    sortOrder: number;
  }[]
  primaryImage: string
  category: string
  subcategory: string
  subSubcategory?: string
  sizes: string[]
  colors: string[]
  materials?: string[]
  careInstructions?: string[]
  rating?: number
  reviews?: number
  isNew?: boolean
  isSale?: boolean
  isFeatured?: boolean
  isLimitedEdition?: boolean
  customizable?: boolean
  sku: string
  weight?: number
  tags: string[]
  featured: boolean
  inStock: boolean
  stockQuantity: number
  inventory: number
  createdAt: Date
  updatedAt: Date
  lowStockThreshold: number
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
}

export interface Collection {
  id: string
  name: string
  description: string
  image: string
  featured: boolean
  products: string[]
  isActive: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}


export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface HeroSection {
  id: string
  title: string
  subtitle: string
  image: string
  ctaText: string
  ctaLink: string
  active: boolean
  order: number
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  socialLinks: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
}
