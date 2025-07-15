"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"

interface RecentlyViewedItem {
  id: string
  productId: string
  viewedAt: string
}

export function useRecentlyViewed() {
  const { user } = useAuth()
  const [items, setItems] = useState<RecentlyViewedItem[]>([])

  // Load recently viewed from localStorage on mount
  useEffect(() => {
    const storageKey = user ? `recently-viewed-${user.id}` : "recently-viewed-guest"
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading recently viewed:", error)
      }
    }
  }, [user])

  // Save recently viewed to localStorage whenever items change
  useEffect(() => {
    const storageKey = user ? `recently-viewed-${user.id}` : "recently-viewed-guest"
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items, user])

  const addToRecentlyViewed = (productId: string) => {
    const newItem: RecentlyViewedItem = {
      id: Date.now().toString(),
      productId,
      viewedAt: new Date().toISOString(),
    }

    setItems((prev) => {
      // Remove existing item if it exists
      const filtered = prev.filter((item) => item.productId !== productId)
      // Add new item to the beginning
      const updated = [newItem, ...filtered]
      // Keep only the last 20 items
      return updated.slice(0, 20)
    })
  }

  const clearRecentlyViewed = () => {
    setItems([])
  }

  return {
    items,
    addToRecentlyViewed,
    clearRecentlyViewed,
  }
}
