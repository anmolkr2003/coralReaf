"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useWishlist } from "@/hooks/useWishlist"
import type { Product, ProductVariant } from "@/types/product"

interface WishlistButtonProps {
  product: Product
  variant?: ProductVariant
  customizations?: Record<string, any>
  size?: "sm" | "default" | "lg"
  showText?: boolean
  className?: string
}

export function WishlistButton({
  product,
  variant,
  customizations,
  size = "default",
  showText = true,
  className = "",
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist, isLoading } = useWishlist()
  const [isAnimating, setIsAnimating] = useState(false)

  const inWishlist = isInWishlist(variant ? `${product.id}-${variant.id}` : product.id)

  const handleToggle = async () => {
    setIsAnimating(true)

    try {
      if (inWishlist) {
        // Find the wishlist item to remove
        // This would need to be implemented in the useWishlist hook
        await removeFromWishlist(`${product.id}-${variant?.id || "default"}`)
      } else {
        await addToWishlist(product.id, variant)
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error)
    } finally {
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  return (
    <Button
      variant={inWishlist ? "default" : "outline"}
      size={size}
      onClick={handleToggle}
      disabled={isLoading}
      className={`transition-all duration-300 ${
        inWishlist
          ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
          : "hover:border-red-500 hover:text-red-500 bg-transparent"
      } ${isAnimating ? "scale-110" : ""} ${className}`}
    >
      <Heart
        className={`w-4 h-4 ${showText ? "mr-2" : ""} transition-all duration-300 ${
          inWishlist ? "fill-current" : ""
        } ${isAnimating ? "animate-pulse" : ""}`}
      />
      {showText && <span>{isLoading ? "..." : inWishlist ? "Wishlisted" : "Add to Wishlist"}</span>}
    </Button>
  )
}
