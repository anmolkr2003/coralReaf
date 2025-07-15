import type { CartItem } from "./types"

class CartManager {
  private items: CartItem[] = []

  getItems(): CartItem[] {
    return this.items
  }

  addItem(item: Omit<CartItem, "id" | "total">): void {
    const existingItem = this.items.find(
      (i) => i.productId === item.productId && i.size === item.size && i.color === item.color,
    )

    if (existingItem) {
      existingItem.quantity += item.quantity
      existingItem.total = existingItem.price * existingItem.quantity
    } else {
      const newItem: CartItem = {
        ...item,
        id: Date.now().toString(),
        total: item.price * item.quantity,
      }
      this.items.push(newItem)
    }
  }

  updateQuantity(id: string, quantity: number): void {
    const item = this.items.find((i) => i.id === id)
    if (item) {
      item.quantity = quantity
      item.total = item.price * quantity
    }
  }

  removeItem(id: string): void {
    this.items = this.items.filter((i) => i.id !== id)
  }

  clear(): void {
    this.items = []
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0)
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0)
  }
}

export const cartManager = new CartManager()
