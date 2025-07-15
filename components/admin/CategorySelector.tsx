"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { tshirtCategories, getSubcategoriesByParent } from "@/lib/product-categories"

interface CategorySelectorProps {
  category?: string
  subcategory?: string
  subSubcategory?: string
  onCategoryChange: (category: string) => void
  onSubcategoryChange: (subcategory: string) => void
  onSubSubcategoryChange: (subSubcategory: string) => void
}

export function CategorySelector({
  category,
  subcategory,
  subSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  onSubSubcategoryChange,
}: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState(category || "")
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategory || "")

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setSelectedSubcategory("")
    onCategoryChange(value)
    onSubcategoryChange("")
    onSubSubcategoryChange("")
  }

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategory(value)
    onSubcategoryChange(value)
    onSubSubcategoryChange("")
  }

  const availableSubcategories = selectedCategory ? getSubcategoriesByParent(selectedCategory) : []

  return (
    <div className="space-y-4">
      <div>
        <Label>Product Category</Label>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {tshirtCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-xs text-gray-500">{cat.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && availableSubcategories.length > 0 && (
        <div>
          <Label>Subcategory</Label>
          <Select value={selectedSubcategory} onValueChange={handleSubcategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              {availableSubcategories.map((subcat) => (
                <SelectItem key={subcat.id} value={subcat.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{subcat.name}</span>
                    <span className="text-xs text-gray-500">{subcat.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Display selected path */}
      {selectedCategory && (
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Category: {tshirtCategories.find((c) => c.id === selectedCategory)?.name}</Badge>
          {selectedSubcategory && (
            <Badge variant="outline">
              Subcategory: {availableSubcategories.find((s) => s.id === selectedSubcategory)?.name}
            </Badge>
          )}
        </div>
      )}

      {/* Folder path display */}
      {selectedCategory && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
          <strong>Image folder path:</strong>
          <br />
          <code>
            public/images/raw/products/tshirts/{selectedCategory}
            {selectedSubcategory && `/${selectedSubcategory}`}/
          </code>
        </div>
      )}
    </div>
  )
}
