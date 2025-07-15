export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage?: string
  price: number
  quantity: number
  size?: string
  color?: string
  customization?: {
    text?: string
    font?: string
    color?: string
    position?: string
  }
  total: number
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  status: OrderStatus
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  trackingNumber?: string
  createdAt: string
  updatedAt: string
}

class OrderManager {
  private orders: Order[] = [
    {
      id: "ORD-001",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "+1-555-0123",
      items: [
        {
          id: "1",
          productId: "1",
          productName: "Organic Cotton Basic Tee",
          productImage: "/placeholder.svg?height=100&width=100",
          price: 29.99,
          quantity: 2,
          size: "M",
          color: "White",
          total: 59.98,
        },
      ],
      subtotal: 59.98,
      tax: 4.8,
      shipping: 9.99,
      discount: 0,
      total: 74.77,
      status: "processing",
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      trackingNumber: "TRK123456789",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T14:20:00Z",
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      items: [
        {
          id: "2",
          productId: "2",
          productName: "Eco-Friendly Hoodie",
          productImage: "/placeholder.svg?height=100&width=100",
          price: 59.99,
          quantity: 1,
          size: "L",
          color: "Gray",
          total: 59.99,
        },
      ],
      subtotal: 59.99,
      tax: 4.8,
      shipping: 9.99,
      discount: 5.0,
      total: 69.78,
      status: "shipped",
      shippingAddress: {
        street: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "USA",
      },
      trackingNumber: "TRK987654321",
      createdAt: "2024-01-14T09:15:00Z",
      updatedAt: "2024-01-16T11:45:00Z",
    },
  ]

  getAllOrders(): Order[] {
    return this.orders
  }

  getOrder(id: string): Order | undefined {
    return this.orders.find((order) => order.id === id)
  }

  updateOrderStatus(id: string, status: OrderStatus): boolean {
    const order = this.orders.find((o) => o.id === id)
    if (!order) return false

    order.status = status
    order.updatedAt = new Date().toISOString()
    return true
  }

  getOrderStats() {
    const total = this.orders.length
    const pending = this.orders.filter((o) => o.status === "pending").length
    const processing = this.orders.filter((o) => o.status === "processing").length
    const shipped = this.orders.filter((o) => o.status === "shipped").length
    const delivered = this.orders.filter((o) => o.status === "delivered").length
    const cancelled = this.orders.filter((o) => o.status === "cancelled").length
    const totalRevenue = this.orders
      .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
      .reduce((sum, order) => sum + order.total, 0)

    return {
      total,
      pending,
      processing,
      shipped,
      delivered,
      cancelled,
      totalRevenue,
    }
  }
}

export const orderManager = new OrderManager()
