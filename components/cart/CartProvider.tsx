"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { CartItem } from "@/lib/types"
import { CartContext } from "@/hooks/useCart"

interface CartProviderProps {
  children: React.ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("coralreaf-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("coralreaf-cart", JSON.stringify(items))
  }, [items])

  const addItem = (item: Omit<CartItem, "id">) => {
    const existingItemIndex = items.findIndex(
      (cartItem) =>
        cartItem.productId === item.productId && cartItem.size === item.size && cartItem.color === item.color,
    )

    if (existingItemIndex > -1) {
      const updatedItems = [...items]
      updatedItems[existingItemIndex].quantity += item.quantity
      setItems(updatedItems)
    } else {
      const newItem: CartItem = {
        ...item,
        id: Date.now().toString(),
      }
      setItems([...items, newItem])
    }
  }

  const removeItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }
    setItems(items.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal >= 75 ? 0 : 9.99 // Free shipping over $75
  const total = subtotal + tax + shipping

  const contextValue = {
    items,
    itemCount,
    total,
    subtotal,
    tax,
    shipping,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}
