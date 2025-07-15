"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, Facebook, Twitter, Link2, Mail, Check } from "lucide-react"

interface ShareProductProps {
  product: {
    id: string
    name: string
    price: number
    images: Array<{ url: string }>
  }
}

export function ShareProduct({ product }: ShareProductProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const productUrl = `${window.location.origin}/product/${product.id}`
  const shareText = `Check out this amazing ${product.name} for $${product.price.toFixed(2)}!`

  const handleShare = (platform: string) => {
    let url = ""

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`
        break
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`
        break
      case "email":
        url = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${productUrl}`)}`
        break
      default:
        return
    }

    window.open(url, "_blank")
    setShowShareMenu(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(productUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setShowShareMenu(!showShareMenu)} className="bg-transparent">
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      {showShareMenu && (
        <Card className="absolute top-full mt-2 right-0 w-64 z-50 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Share this product</h4>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Facebook</span>
                </button>

                <button
                  onClick={() => handleShare("twitter")}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Twitter className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Twitter</span>
                </button>

                <button
                  onClick={() => handleShare("email")}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Email</span>
                </button>

                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4 text-gray-600" />}
                  <span className="text-sm">{copied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
