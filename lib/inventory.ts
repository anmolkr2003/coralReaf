export interface InventoryItem {
  id: string
  productId: string
  productName: string
  sku: string
  size?: string
  color?: string
  currentStock: number
  availableStock: number
  reservedStock: number
  reorderLevel: number
  reorderQuantity: number
  cost: number
  price: number
  supplier?: string
  status: "in_stock" | "low_stock" | "out_of_stock" | "discontinued"
  lastRestocked?: string
  createdAt: string
  updatedAt: string
}

class InventoryManager {
  private inventory: InventoryItem[] = [
    {
      id: "INV-001",
      productId: "1",
      productName: "Organic Cotton Basic Tee",
      sku: "OCT-WHT-M",
      size: "M",
      color: "White",
      currentStock: 50,
      availableStock: 45,
      reservedStock: 5,
      reorderLevel: 10,
      reorderQuantity: 100,
      cost: 15.0,
      price: 29.99,
      supplier: "Organic Cotton Co.",
      status: "in_stock",
      lastRestocked: "2024-01-10T00:00:00Z",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "INV-002",
      productId: "1",
      productName: "Organic Cotton Basic Tee",
      sku: "OCT-BLK-L",
      size: "L",
      color: "Black",
      currentStock: 8,
      availableStock: 8,
      reservedStock: 0,
      reorderLevel: 10,
      reorderQuantity: 100,
      cost: 15.0,
      price: 29.99,
      supplier: "Organic Cotton Co.",
      status: "low_stock",
      lastRestocked: "2024-01-05T00:00:00Z",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "INV-003",
      productId: "2",
      productName: "Eco-Friendly Hoodie",
      sku: "EFH-GRY-L",
      size: "L",
      color: "Gray",
      currentStock: 0,
      availableStock: 0,
      reservedStock: 0,
      reorderLevel: 5,
      reorderQuantity: 50,
      cost: 30.0,
      price: 59.99,
      supplier: "Eco Textiles Ltd.",
      status: "out_of_stock",
      lastRestocked: "2023-12-20T00:00:00Z",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
  ]

  getAllInventory(): InventoryItem[] {
    return this.inventory
  }

  getInventoryItem(id: string): InventoryItem | undefined {
    return this.inventory.find((item) => item.id === id)
  }

  updateStock(id: string, quantity: number, type: "add" | "remove" | "set"): boolean {
    const item = this.inventory.find((i) => i.id === id)
    if (!item) return false

    switch (type) {
      case "add":
        item.currentStock += quantity
        item.availableStock += quantity
        break
      case "remove":
        if (item.availableStock >= quantity) {
          item.currentStock -= quantity
          item.availableStock -= quantity
        } else {
          return false
        }
        break
      case "set":
        item.currentStock = quantity
        item.availableStock = quantity - item.reservedStock
        break
    }

    // Update status based on stock levels
    if (item.availableStock === 0) {
      item.status = "out_of_stock"
    } else if (item.availableStock <= item.reorderLevel) {
      item.status = "low_stock"
    } else {
      item.status = "in_stock"
    }

    item.updatedAt = new Date().toISOString()
    return true
  }

  getLowStockItems(): InventoryItem[] {
    return this.inventory.filter((item) => item.status === "low_stock" || item.status === "out_of_stock")
  }

  getInventoryStats() {
    const totalItems = this.inventory.length
    const inStock = this.inventory.filter((i) => i.status === "in_stock").length
    const lowStock = this.inventory.filter((i) => i.status === "low_stock").length
    const outOfStock = this.inventory.filter((i) => i.status === "out_of_stock").length
    const totalValue = this.inventory.reduce((sum, item) => sum + item.currentStock * item.cost, 0)

    return {
      totalItems,
      inStock,
      lowStock,
      outOfStock,
      totalValue,
    }
  }
}

export const inventoryManager = new InventoryManager()
