import type { ShippingAddress, PaymentMethod } from "./someModule" // Assuming ShippingAddress and PaymentMethod are declared in another module

export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  phone?: string
  dateOfBirth?: string
  gender?: "male" | "female" | "other" | "prefer_not_to_say"
  role: "user" | "admin"
  image?: string
  preferences: {
    newsletter: boolean
    smsNotifications: boolean
    orderUpdates: boolean
    promotions: boolean
  }
  addresses: ShippingAddress[]
  paymentMethods: PaymentMethod[]
  wishlist: string[]
  orders: string[]
  totalOrders: number
  totalSpent: number
  orderCount: number
  
  loyaltyPoints: number
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

export interface UserProfile {
  name: string
  email: string
  phone?: string
  dateOfBirth?: string
  gender?: string
  preferences: {
    newsletter: boolean
    smsNotifications: boolean
    orderUpdates: boolean
    promotions: boolean
  }
}

export interface UserStats {
  totalUsers: number
  newUsersThisMonth: number
  activeUsers: number
  topCustomers: Array<{
    id: string
    name: string
    email: string
    totalSpent: number
    orderCount: number
  }>
}
