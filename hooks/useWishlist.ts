"use client"

import { useState, useEffect, createContext } from "react"
import { useAuth } from "@/hooks/useAuth"

interface WishlistItem {
  id: string
  productId: string
  variant?: {
    size: string
    color: string
  }
  createdAt: string
}

interface WishlistContextType {
  items: WishlistItem[]
  isLoading: boolean
  addToWishlist: (productId: string, variant?: { size: string; color: string }) => Promise<void>
  removeFromWishlist: (productId: string) => Promise<void>
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => Promise<void>
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function useWishlist() {
  const { user } = useAuth()
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist-${user.id}`)
      if (savedWishlist) {
        try {
          setItems(JSON.parse(savedWishlist))
        } catch (error) {
          console.error("Error loading wishlist:", error)
        }
      }
    }
  }, [user])

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    if (user && items.length >= 0) {
      localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(items))
    }
  }, [items, user])

  const addToWishlist = async (productId: string, variant?: { size: string; color: string }) => {
    if (!user) {
      alert("Please sign in to add items to your wishlist")
      return
    }

    setIsLoading(true)
    try {
      const newItem: WishlistItem = {
        id: Date.now().toString(),
        productId,
        variant,
        createdAt: new Date().toISOString(),
      }

      setItems((prev) => [...prev, newItem])

      // In a real app, you'd make an API call here
      // await api.wishlist.add(newItem)
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromWishlist = async (productId: string) => {
    if (!user) return

    setIsLoading(true)
    try {
      setItems((prev) => prev.filter((item) => item.productId !== productId))

      // In a real app, you'd make an API call here
      // await api.wishlist.remove(productId)
    } catch (error) {
      console.error("Error removing from wishlist:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.productId === productId)
  }

  const clearWishlist = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      setItems([])

      // In a real app, you'd make an API call here
      // await api.wishlist.clear()
    } catch (error) {
      console.error("Error clearing wishlist:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    items,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  }
}

export { WishlistContext }
