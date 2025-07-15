"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  images: Array<{
    id: string
    url: string
    alt: string
    position: number
  }>
  selectedImage: number
  onImageSelect: (index: number) => void
  productName: string
}

export function ProductImageGallery({ images, selectedImage, onImageSelect, productName }: ProductImageGalleryProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenIndex, setFullscreenIndex] = useState(0)

  const nextImage = () => {
    const nextIndex = (selectedImage + 1) % images.length
    onImageSelect(nextIndex)
  }

  const prevImage = () => {
    const prevIndex = (selectedImage - 1 + images.length) % images.length
    onImageSelect(prevIndex)
  }

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index)
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  const nextFullscreenImage = () => {
    setFullscreenIndex((prev) => (prev + 1) % images.length)
  }

  const prevFullscreenImage = () => {
    setFullscreenIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden group">
        <Image
          src={images[selectedImage]?.url || "/placeholder.svg"}
          alt={images[selectedImage]?.alt || productName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="bg-white/80 hover:bg-white rounded-full shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="bg-white/80 hover:bg-white rounded-full shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Fullscreen Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => openFullscreen(selectedImage)}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Expand className="w-4 h-4" />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => onImageSelect(index)}
            className={cn(
              "aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all",
              selectedImage === index ? "border-olive shadow-md" : "border-gray-200 hover:border-gray-300",
            )}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.alt}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl max-h-4xl">
            <Image
              src={images[fullscreenIndex]?.url || "/placeholder.svg"}
              alt={images[fullscreenIndex]?.alt || productName}
              fill
              className="object-contain"
            />

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeFullscreen}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevFullscreenImage}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextFullscreenImage}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {fullscreenIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
