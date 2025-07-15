"use client"

import { useState, useEffect } from "react"

export function useImagePreloader(imageSources: string[]) {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (imageSources.length === 0) {
      setImagesLoaded(true)
      return
    }

    let loadedCount = 0
    const newLoadedImages = new Set<string>()

    imageSources.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        newLoadedImages.add(src)
        setLoadedImages(new Set(newLoadedImages))

        if (loadedCount === imageSources.length) {
          setImagesLoaded(true)
        }
      }
      img.onerror = () => {
        loadedCount++
        if (loadedCount === imageSources.length) {
          setImagesLoaded(true)
        }
      }
      img.src = src
    })
  }, [imageSources])

  return { imagesLoaded, loadedImages }
}
