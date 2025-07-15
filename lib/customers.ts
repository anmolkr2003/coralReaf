export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  totalOrders: number
  totalSpent: number
  status: "active" | "inactive" | "blocked"
  createdAt: string
  updatedAt: string
}

class CustomerManager {
  private customers: Customer[] = [
    {
      id: "CUST-001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1-555-0123",
      avatar: "/placeholder.svg?height=100&width=100",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      totalOrders: 3,
      totalSpent: 189.97,
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T14:20:00Z",
    },
    {
      id: "CUST-002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1-555-0456",
      address: {
        street: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "USA",
      },
      totalOrders: 2,
      totalSpent: 129.78,
      status: "active",
      createdAt: "2024-01-02T00:00:00Z",
      updatedAt: "2024-01-16T11:45:00Z",
    },
  ]

  getAllCustomers(): Customer[] {
    return this.customers
  }

  getCustomer(id: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === id)
  }

  updateCustomerStatus(id: string, status: Customer["status"]): boolean {
    const customer = this.customers.find((c) => c.id === id)
    if (!customer) return false

    customer.status = status
    customer.updatedAt = new Date().toISOString()
    return true
  }

  getCustomerStats() {
    const total = this.customers.length
    const active = this.customers.filter((c) => c.status === "active").length
    const inactive = this.customers.filter((c) => c.status === "inactive").length
    const blocked = this.customers.filter((c) => c.status === "blocked").length
    const totalRevenue = this.customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
    const averageOrderValue = total > 0 ? totalRevenue / this.customers.reduce((sum, c) => sum + c.totalOrders, 0) : 0

    return {
      total,
      active,
      inactive,
      blocked,
      totalRevenue,
      averageOrderValue,
    }
  }
}

export const customerManager = new CustomerManager()
