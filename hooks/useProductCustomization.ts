"use client"

import { useState, useCallback } from "react"
import type { Product, ProductVariant } from "@/types/product"
import type { CustomizationState, CustomizationValue, CustomizationPreview } from "@/types/customization"

export function useProductCustomization(product: Product, variant: ProductVariant) {
  const [customizationState, setCustomizationState] = useState<CustomizationState>({
    productId: product.id,
    variant,
    customizations: {},
    totalPrice: variant.price,
  })

  const [previewLoading, setPreviewLoading] = useState(false)

  const updateCustomization = useCallback((customizationId: string, value: CustomizationValue) => {
    setCustomizationState((prev) => {
      const newCustomizations = {
        ...prev.customizations,
        [customizationId]: value,
      }

      // Calculate total price
      const basePrice = prev.variant.price
      const customizationPrice = Object.values(newCustomizations).reduce((sum, custom) => sum + custom.price, 0)

      return {
        ...prev,
        customizations: newCustomizations,
        totalPrice: basePrice + customizationPrice,
      }
    })
  }, [])

  const removeCustomization = useCallback((customizationId: string) => {
    setCustomizationState((prev) => {
      const newCustomizations = { ...prev.customizations }
      delete newCustomizations[customizationId]

      const basePrice = prev.variant.price
      const customizationPrice = Object.values(newCustomizations).reduce((sum, custom) => sum + custom.price, 0)

      return {
        ...prev,
        customizations: newCustomizations,
        totalPrice: basePrice + customizationPrice,
      }
    })
  }, [])

  const generatePreview = useCallback(async () => {
    setPreviewLoading(true)
    try {
      // Mock preview generation
      const preview: CustomizationPreview = {
        baseImage: variant.image || product.images[0]?.url || "/placeholder.svg",
        overlays: Object.entries(customizationState.customizations).map(([id, custom]) => ({
          type: custom.type as "text" | "image" | "embroidery",
          content: custom.value.toString(),
          position: { x: 50, y: 50 },
          style: {
            fontSize: 16,
            fontFamily: "Arial",
            color: custom.color || "#000000",
          },
          bounds: { width: 100, height: 20 },
        })),
      }

      setCustomizationState((prev) => ({
        ...prev,
        preview,
      }))
    } catch (error) {
      console.error("Error generating preview:", error)
    } finally {
      setPreviewLoading(false)
    }
  }, [customizationState.customizations, variant, product])

  const resetCustomizations = useCallback(() => {
    setCustomizationState({
      productId: product.id,
      variant,
      customizations: {},
      totalPrice: variant.price,
    })
  }, [product.id, variant])

  const validateCustomizations = useCallback((): { valid: boolean; errors: string[] } => {
    const errors: string[] = []

    product.customizations.forEach((customization) => {
      if (customization.required && !customizationState.customizations[customization.id]) {
        errors.push(`${customization.name} is required`)
      }

      const value = customizationState.customizations[customization.id]
      if (value && customization.type === "text" && customization.maxLength) {
        if (value.value.toString().length > customization.maxLength) {
          errors.push(`${customization.name} exceeds maximum length of ${customization.maxLength}`)
        }
      }
    })

    return {
      valid: errors.length === 0,
      errors,
    }
  }, [product.customizations, customizationState.customizations])

  return {
    customizationState,
    previewLoading,
    updateCustomization,
    removeCustomization,
    generatePreview,
    resetCustomizations,
    validateCustomizations,
  }
}
