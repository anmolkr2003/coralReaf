"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/useCart"
import { Upload, ShoppingCart, RotateCcw, RotateCw } from "lucide-react"
import { useDropzone } from "react-dropzone"
import Draggable from "react-draggable"

export default function CustomizePage() {
  const { addItem } = useCart()
  const [customText, setCustomText] = useState("")
  const [textColor, setTextColor] = useState("#000000")
  const [fontFamily, setFontFamily] = useState("Arial")
  const [zoom, setZoom] = useState(1)
  const [textRotation, setTextRotation] = useState(0)
  const [designRotation, setDesignRotation] = useState(0)
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null)
  const [history, setHistory] = useState<any[]>([])
  const [future, setFuture] = useState<any[]>([])

  const product = {
    id: "custom-tshirt",
    name: "Custom T-Shirt",
    basePrice: 29.99,
    image: "/images/shirt.png",
  }

  const customizationFee = customText || uploadedDesign ? 5.99 : 0
  const totalPrice = product.basePrice + customizationFee

  const onDrop = (acceptedFiles: File[]) => {
    const reader = new FileReader()
    reader.onload = (e) => setUploadedDesign(e.target?.result as string)
    reader.readAsDataURL(acceptedFiles[0])
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  })

  const saveSnapshot = () => {
    setHistory([...history, { customText, textColor, fontFamily, textRotation, designRotation, uploadedDesign }])
    setFuture([])
  }

  const Undo = () => {
    const prev = history.pop()
    if (prev) {
      setFuture([{ customText, textColor, fontFamily, textRotation, designRotation, uploadedDesign }, ...future])
      setCustomText(prev.customText)
      setTextColor(prev.textColor)
      setFontFamily(prev.fontFamily)
      setTextRotation(prev.textRotation)
      setDesignRotation(prev.designRotation)
      setUploadedDesign(prev.uploadedDesign)
      setHistory([...history])
    }
  }

  const Redo = () => {
    const next = future.shift()
    if (next) {
      setHistory([...history, { customText, textColor, fontFamily, textRotation, designRotation, uploadedDesign }])
      setCustomText(next.customText)
      setTextColor(next.textColor)
      setFontFamily(next.fontFamily)
      setTextRotation(next.textRotation)
      setDesignRotation(next.designRotation)
      setUploadedDesign(next.uploadedDesign)
      setFuture([...future])
    }
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: totalPrice,
      image: product.image,
      size: "M",
      color: "White",
      quantity: 1,
      customization: {
        text: customText,
        uploadedDesign,
      },
    })
  }

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-red-600 mb-12 font-poppins">
          Design Your Own Style
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Preview */}
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-red-600 text-xl font-poppins">Live Preview</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={Undo}><RotateCcw /></Button>
                <Button variant="ghost" onClick={Redo}><RotateCw /></Button>
              </div>
            </CardHeader>
            <CardContent className="relative h-[500px] flex items-center justify-center">
              <div
                className="relative"
                style={{ width: 300, height: 400, transform: `scale(${zoom})`, transformOrigin: "center" }}
              >
                <Image src={product.image} alt="Product" fill className="object-contain" />

                {uploadedDesign && (
                  <Draggable bounds="parent" onStop={saveSnapshot}>
                    <div className="absolute top-[40%] left-[30%] w-24 h-24">
                      <img
                        src={uploadedDesign}
                        alt="Uploaded Design"
                        className="w-full h-full object-contain z-10"
                        style={{
                          transform: `rotate(${designRotation}deg) scale(${1 / zoom})`,
                          transformOrigin: "center",
                        }}
                      />
                    </div>
                  </Draggable>
                )}

                {customText && (
                  <Draggable bounds="parent" onStop={saveSnapshot}>
                    <div className="absolute top-[70%] left-[30%] z-20">
                      <div
                        style={{
                          transform: `rotate(${textRotation}deg) scale(${1 / zoom})`,
                          transformOrigin: "center",
                          color: textColor,
                          fontFamily,
                          fontSize: "1.125rem",
                          fontWeight: "bold",
                        }}
                      >
                        {customText}
                      </div>
                    </div>
                  </Draggable>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-600 font-poppins">Customize Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={customText}
                  onChange={(e) => {
                    setCustomText(e.target.value)
                    saveSnapshot()
                  }}
                  placeholder="Add your text"
                />
                <div className="flex gap-4 items-center">
                  <label className="text-mud">Color:</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => {
                      setTextColor(e.target.value)
                      saveSnapshot()
                    }}
                  />
                </div>
                <div>
                  <label className="text-mud">Font:</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => {
                      setFontFamily(e.target.value)
                      saveSnapshot()
                    }}
                    className="p-2 border rounded w-full"
                  >
                    {["Arial", "Georgia", "Courier New", "Pacifico", "Verdana"].map((font) => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-mud">Rotate Text (°):</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={textRotation}
                    onChange={(e) => {
                      setTextRotation(parseInt(e.target.value))
                      saveSnapshot()
                    }}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-600 font-poppins">Upload Design</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div {...getRootProps()} className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer">
                  <input {...getInputProps()} />
                  <Upload className="mx-auto mb-2" />
                  <p className="text-mud">Click or drag & drop to upload design</p>
                </div>
                <div>
                  <label className="text-mud">Rotate Design (°):</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={designRotation}
                    onChange={(e) => {
                      setDesignRotation(parseInt(e.target.value))
                      saveSnapshot()
                    }}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-600 font-poppins">Zoom</CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => {
                    setZoom(parseFloat(e.target.value))
                    saveSnapshot()
                  }}
                  className="w-full"
                />
              </CardContent>
            </Card>

            <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-6 rounded-full" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2" /> Add to Cart - ${totalPrice.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}