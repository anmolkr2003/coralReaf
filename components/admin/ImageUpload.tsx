"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Check, AlertCircle } from "lucide-react"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  category: "hero" | "products" | "collections" | "team" | "about"
  label?: string
  aspectRatio?: "square" | "landscape" | "portrait"
  maxSize?: number // in MB
}

export function ImageUpload({
  value,
  onChange,
  category,
  label = "Image",
  aspectRatio = "landscape",
  maxSize = 10,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    setError(null)
    setUploading(true)

    try {
      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        throw new Error(`File too large. Maximum size is ${maxSize}MB.`)
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("Please select an image file.")
      }

      // Create file URL for preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onChange(result)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeImage = () => {
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "portrait":
        return "aspect-[3/4]"
      default:
        return "aspect-[16/9]"
    }
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {/* URL Input */}
      <div className="space-y-2">
        <Input
          placeholder="Or paste image URL here..."
          value={typeof value === "string" && value.startsWith("http") ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragOver
            ? "border-olive bg-olive/5"
            : value
              ? "border-green-300 bg-green-50"
              : "border-gray-300 hover:border-olive"
        }`}
      >
        <CardContent className="p-6">
          {value ? (
            // Preview
            <div className="space-y-4">
              <div className={`relative ${getAspectRatioClass()} w-full bg-gray-100 rounded-lg overflow-hidden`}>
                <Image src={value || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                <Button size="sm" variant="destructive" className="absolute top-2 right-2" onClick={removeImage}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <Check className="w-4 h-4 mr-2" />
                Image uploaded successfully
              </div>
            </div>
          ) : (
            // Upload Area
            <div
              className="text-center py-8"
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
            >
              <Upload className={`w-12 h-12 mx-auto mb-4 ${dragOver ? "text-olive" : "text-gray-400"}`} />
              <p className="text-gray-600 mb-2">{dragOver ? "Drop image here" : "Drag and drop your image here"}</p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="border-olive text-olive hover:bg-olive hover:text-cream"
              >
                {uploading ? "Uploading..." : "Choose File"}
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
              <p className="text-xs text-gray-500 mt-2">Supported: JPG, PNG, WebP • Max size: {maxSize}MB</p>
            </div>
          )}

          {error && (
            <div className="flex items-center text-sm text-red-600 mt-2">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommended Sizes */}
      <div className="text-xs text-gray-500">
        <strong>Recommended size:</strong> {category === "hero" && "1920x1080px (landscape)"}
        {category === "products" && "1200x1200px (square)"}
        {category === "collections" && "1200x800px (landscape)"}
        {category === "team" && "800x800px (square)"}
        {category === "about" && "1200x800px (landscape)"}
      </div>
    </div>
  )
}
