export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"

export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded"

export interface OrderItem {
  id: string
  productId: string
  name: string
  description: string
  price: number
  quantity: number
  size?: string
  color?: string
  image: string
  customization?: {
    text?: string
    font?: string
    color?: string
    position?: string
    uploadedDesign?: string
  }
  total: number
}

export interface ShippingAddress {
  id?: string
  name: string
  company?: string
  street: string
  street2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault?: boolean
}

export interface Order {
  id: string
  orderNumber: string
  userId?: string
  email: string
  customerName: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  paymentIntentId?: string
  shippingAddress: ShippingAddress
  billingAddress: ShippingAddress
  trackingNumber?: string
  trackingUrl?: string
  notes?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
}

export interface OrderSummary {
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  itemCount: number
}

export interface OrderFilters {
  status?: OrderStatus[]
  paymentStatus?: PaymentStatus[]
  dateFrom?: string
  dateTo?: string
  search?: string
}

export interface OrderStats {
  total: number
  pending: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
  totalRevenue: number
  averageOrderValue: number
}
