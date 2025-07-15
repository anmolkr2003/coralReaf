"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Type, Palette, Upload, RotateCcw, Eye } from "lucide-react"
import type { Product, ProductVariant } from "@/types/product"
import { useProductCustomization } from "@/hooks/useProductCustomization"
import Image from "next/image"

interface ProductCustomizerProps {
  product: Product
  variant: ProductVariant
  onCustomizationChange: (customizations: Record<string, any>, totalPrice: number) => void
}

export function ProductCustomizer({ product, variant, onCustomizationChange }: ProductCustomizerProps) {
  const {
    customizationState,
    previewLoading,
    updateCustomization,
    removeCustomization,
    generatePreview,
    resetCustomizations,
    validateCustomizations,
  } = useProductCustomization(product, variant)

  const [activeTab, setActiveTab] = useState("text")

  const handleCustomizationUpdate = (customizationId: string, value: any) => {
    const customization = product.customizations.find((c) => c.id === customizationId)
    if (!customization) return

    const customizationValue = {
      type: customization.type,
      value,
      price: customization.price,
      option: customization.options?.find((o) => o.value === value),
    }

    updateCustomization(customizationId, customizationValue)
    onCustomizationChange(customizationState.customizations, customizationState.totalPrice)
  }

  const textCustomizations = product.customizations.filter((c) => c.type === "text" || c.type === "embroidery")
  const colorCustomizations = product.customizations.filter((c) => c.type === "color")
  const uploadCustomizations = product.customizations.filter((c) => c.type === "print")

  if (!product.customizations.length) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Customize Your Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Text
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
          </TabsList>

          {/* Text Customizations */}
          <TabsContent value="text" className="space-y-6">
            {textCustomizations.map((customization) => (
              <div key={customization.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">
                    {customization.name}
                    {customization.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {customization.price > 0 && <Badge variant="secondary">+${customization.price.toFixed(2)}</Badge>}
                </div>

                <p className="text-sm text-gray-600">{customization.description}</p>

                {customization.type === "text" ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`text-${customization.id}`}>Your Text</Label>
                      <Input
                        id={`text-${customization.id}`}
                        placeholder="Enter your text..."
                        maxLength={customization.maxLength}
                        value={customizationState.customizations[customization.id]?.value || ""}
                        onChange={(e) => handleCustomizationUpdate(customization.id, e.target.value)}
                      />
                      {customization.maxLength && (
                        <div className="text-xs text-gray-500 mt-1">
                          {customizationState.customizations[customization.id]?.value?.toString().length || 0} /{" "}
                          {customization.maxLength} characters
                        </div>
                      )}
                    </div>

                    {/* Font Selection */}
                    <div>
                      <Label>Font Style</Label>
                      <Select onValueChange={(value) => handleCustomizationUpdate(`${customization.id}-font`, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="arial">Arial</SelectItem>
                          <SelectItem value="helvetica">Helvetica</SelectItem>
                          <SelectItem value="times">Times New Roman</SelectItem>
                          <SelectItem value="script">Script</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Color Selection */}
                    <div>
                      <Label>Text Color</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="color"
                          className="w-12 h-10 rounded border border-gray-300"
                          onChange={(e) => handleCustomizationUpdate(`${customization.id}-color`, e.target.value)}
                        />
                        <Input
                          placeholder="#000000"
                          className="flex-1"
                          onChange={(e) => handleCustomizationUpdate(`${customization.id}-color`, e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Position Selection */}
                    {customization.allowedPositions && (
                      <div>
                        <Label>Position</Label>
                        <Select
                          onValueChange={(value) => handleCustomizationUpdate(`${customization.id}-position`, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose position" />
                          </SelectTrigger>
                          <SelectContent>
                            {customization.allowedPositions.map((position) => (
                              <SelectItem key={position} value={position}>
                                {position.charAt(0).toUpperCase() + position.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                ) : (
                  // Embroidery customization
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`embroidery-${customization.id}`}>Embroidery Text</Label>
                      <Input
                        id={`embroidery-${customization.id}`}
                        placeholder="Enter text for embroidery..."
                        maxLength={customization.maxLength}
                        value={customizationState.customizations[customization.id]?.value || ""}
                        onChange={(e) => handleCustomizationUpdate(customization.id, e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Thread Color</Label>
                      <div className="grid grid-cols-6 gap-2 mt-2">
                        {["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFD700"].map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded border-2 border-gray-300"
                            style={{ backgroundColor: color }}
                            onClick={() => handleCustomizationUpdate(`${customization.id}-thread-color`, color)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <Separator />
              </div>
            ))}
          </TabsContent>

          {/* Color Customizations */}
          <TabsContent value="colors" className="space-y-6">
            {colorCustomizations.map((customization) => (
              <div key={customization.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">{customization.name}</Label>
                  {customization.price > 0 && <Badge variant="secondary">+${customization.price.toFixed(2)}</Badge>}
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {customization.options.map((option) => (
                    <button
                      key={option.id}
                      className={`aspect-square rounded-lg border-2 p-2 transition-colors ${
                        customizationState.customizations[customization.id]?.value === option.value
                          ? "border-olive"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleCustomizationUpdate(customization.id, option.value)}
                    >
                      <div className="w-full h-full rounded" style={{ backgroundColor: option.hexColor }} />
                      <div className="text-xs mt-1 text-center">{option.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Upload Customizations */}
          <TabsContent value="upload" className="space-y-6">
            {uploadCustomizations.map((customization) => (
              <div key={customization.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">{customization.name}</Label>
                  {customization.price > 0 && <Badge variant="secondary">+${customization.price.toFixed(2)}</Badge>}
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-olive transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id={`upload-${customization.id}`}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          handleCustomizationUpdate(customization.id, event.target?.result)
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                  <label htmlFor={`upload-${customization.id}`} className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-lg font-medium text-gray-700 mb-2">Upload Your Design</div>
                    <div className="text-sm text-gray-500">
                      PNG, JPG, SVG up to 10MB
                      <br />
                      Recommended: 300 DPI, RGB color mode
                    </div>
                  </label>
                </div>

                {customizationState.customizations[customization.id]?.value && (
                  <div className="text-center">
                    <img
                      src={(customizationState.customizations[customization.id].value as string) || "/placeholder.svg"}
                      alt="Uploaded design"
                      className="max-w-32 max-h-32 mx-auto rounded border"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCustomization(customization.id)}
                      className="mt-2"
                    >
                      Remove Design
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Preview and Actions */}
        <div className="mt-8 space-y-4">
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm text-gray-600">Customization Total</div>
              <div className="text-lg font-semibold text-olive">
                +${(customizationState.totalPrice - variant.price).toFixed(2)}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={resetCustomizations}
                className="flex items-center gap-2 bg-transparent"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
              <Button
                onClick={generatePreview}
                disabled={previewLoading}
                className="flex items-center gap-2 bg-olive hover:bg-olive/90"
              >
                <Eye className="w-4 h-4" />
                {previewLoading ? "Generating..." : "Preview"}
              </Button>
            </div>
          </div>

          {/* Preview */}
          {customizationState.preview && (
            <div className="mt-6">
              <Label className="text-base font-medium mb-4 block">Preview</Label>
              <div className="relative bg-gray-50 rounded-lg p-8 text-center">
                <Image
                  src={customizationState.preview.baseImage || "/placeholder.svg"}
                  alt="Product preview"
                  width={300}
                  height={300}
                  className="mx-auto"
                />

                {/* Overlay customizations */}
                {customizationState.preview.overlays.map((overlay, index) => (
                  <div
                    key={index}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${overlay.position.x}%`,
                      top: `${overlay.position.y}%`,
                      transform: "translate(-50%, -50%)",
                      fontSize: overlay.style.fontSize,
                      fontFamily: overlay.style.fontFamily,
                      color: overlay.style.color,
                      transform: `translate(-50%, -50%) rotate(${overlay.style.rotation || 0}deg) scale(${overlay.style.scale || 1})`,
                    }}
                  >
                    {overlay.content}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
