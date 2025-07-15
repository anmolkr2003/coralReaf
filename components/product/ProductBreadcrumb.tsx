"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ProductBreadcrumbProps {
  product: {
    name: string
    category: string
    subcategory?: string
  }
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  return (
    <nav className="mb-8">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-olive transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/shop" className="hover:text-olive transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-olive transition-colors">
          {product.category}
        </Link>
        {product.subcategory && (
          <>
            <ChevronRight className="w-4 h-4" />
            <Link
              href={`/shop?category=${product.category.toLowerCase()}&subcategory=${product.subcategory.toLowerCase()}`}
              className="hover:text-olive transition-colors"
            >
              {product.subcategory}
            </Link>
          </>
        )}
        <ChevronRight className="w-4 h-4" />
        <span className="text-mud font-medium">{product.name}</span>
      </div>
    </nav>
  )
}
