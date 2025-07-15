"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Type, Upload, Palette, X } from "lucide-react"

interface CustomizationOption {
  id: string
  type: "text" | "embroidery" | "color" | "size"
  name: string
  options: string[]
  price: number
  required: boolean
  maxLength?: number
  preview?: boolean
}

interface ProductCustomizationProps {
  customizations: CustomizationOption[]
  selectedCustomizations: Record<string, any>
  onCustomizationChange: (customizations: Record<string, any>) => void
}

export function ProductCustomization({
  customizations,
  selectedCustomizations,
  onCustomizationChange,
}: ProductCustomizationProps) {
  const [textColor, setTextColor] = useState("#000000")
  const [textPosition, setTextPosition] = useState("")
  const [embroideryFile, setEmbroideryFile] = useState<File | null>(null)

  const handleTextChange = (customizationId: string, value: string) => {
    onCustomizationChange({
      ...selectedCustomizations,
      [customizationId]: {
        type: "text",
        value,
        color: textColor,
        position: textPosition,
        price: customizations.find((c) => c.id === customizationId)?.price || 0,
      },
    })
  }

  const handleEmbroideryUpload = (customizationId: string, file: File) => {
    setEmbroideryFile(file)
    onCustomizationChange({
      ...selectedCustomizations,
      [customizationId]: {
        type: "embroidery",
        file,
        position: textPosition,
        price: customizations.find((c) => c.id === customizationId)?.price || 0,
      },
    })
  }

  const removeCustomization = (customizationId: string) => {
    const updated = { ...selectedCustomizations }
    delete updated[customizationId]
    onCustomizationChange(updated)
  }

  const totalCustomizationPrice = Object.values(selectedCustomizations).reduce(
    (sum, custom: any) => sum + (custom.price || 0),
    0,
  )

  return (
    <div className="space-y-4">
      {customizations.map((customization) => (
        <Card key={customization.id}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                {customization.type === "text" && <Type className="w-4 h-4 text-olive" />}
                {customization.type === "embroidery" && <Upload className="w-4 h-4 text-olive" />}
                {customization.type === "color" && <Palette className="w-4 h-4 text-olive" />}
                {customization.name}
                {customization.required && <span className="text-red-500 text-sm">*</span>}
              </div>
              <div className="text-sm font-normal text-gray-600">+${customization.price.toFixed(2)}</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customization.type === "text" && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`text-${customization.id}`} className="text-sm font-medium">
                    Custom Text
                  </Label>
                  <Input
                    id={`text-${customization.id}`}
                    value={selectedCustomizations[customization.id]?.value || ""}
                    onChange={(e) => handleTextChange(customization.id, e.target.value)}
                    placeholder="Enter your text..."
                    maxLength={customization.maxLength || 50}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {(selectedCustomizations[customization.id]?.value || "").length}/{customization.maxLength || 50}{" "}
                    characters
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium">Text Color</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-10 h-10 rounded border border-gray-300"
                      />
                      <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Position</Label>
                    <Select value={textPosition} onValueChange={setTextPosition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {customization.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {customization.preview && selectedCustomizations[customization.id]?.value && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium mb-2">Preview:</div>
                    <div className="text-lg font-semibold" style={{ color: textColor }}>
                      {selectedCustomizations[customization.id]?.value}
                    </div>
                  </div>
                )}
              </div>
            )}

            {customization.type === "embroidery" && (
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Upload Design</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-olive transition-colors">
                    <input
                      type="file"
                      accept="image/*,.svg,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleEmbroideryUpload(customization.id, file)
                      }}
                      className="hidden"
                      id={`embroidery-${customization.id}`}
                    />
                    <label htmlFor={`embroidery-${customization.id}`} className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">
                        {embroideryFile ? embroideryFile.name : "Click to upload or drag and drop"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">PNG, JPG, SVG, PDF up to 10MB</div>
                    </label>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Position</Label>
                  <Select value={textPosition} onValueChange={setTextPosition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {customization.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {selectedCustomizations[customization.id] && (
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">
                  {customization.name} added (+${customization.price.toFixed(2)})
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCustomization(customization.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {totalCustomizationPrice > 0 && (
        <div className="bg-olive/10 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium">Total Customization Cost:</span>
            <span className="text-lg font-bold text-olive">+${totalCustomizationPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
