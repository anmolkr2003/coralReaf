// Enhanced product categorization system
export interface ProductCategory {
  id: string
  name: string
  description: string
  parentCategory?: string
  subcategories: string[]
  imageFolder: string
  sortOrder: number
  isActive: boolean
}

export interface ProductSubcategory {
  id: string
  name: string
  description: string
  parentCategory: string
  imageFolder: string
  sortOrder: number
  isActive: boolean
}

// T-Shirt Categories
export const tshirtCategories: ProductCategory[] = [
  {
    id: "basic",
    name: "Basic T-Shirts",
    description: "Essential everyday tees in organic materials",
    subcategories: ["organic-cotton-basic", "hemp-blend-basic"],
    imageFolder: "products/tshirts/basic",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "graphic",
    name: "Graphic T-Shirts",
    description: "Expressive designs with sustainable messages",
    subcategories: ["nature-prints", "text-designs", "abstract"],
    imageFolder: "products/tshirts/graphic",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "long-sleeve",
    name: "Long Sleeve T-Shirts",
    description: "Extended coverage with sustainable comfort",
    subcategories: ["casual", "fitted"],
    imageFolder: "products/tshirts/long-sleeve",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "crop-tops",
    name: "Crop Tops",
    description: "Modern cropped styles in eco-friendly fabrics",
    subcategories: [],
    imageFolder: "products/tshirts/crop-tops",
    sortOrder: 4,
    isActive: true,
  },
  {
    id: "oversized",
    name: "Oversized T-Shirts",
    description: "Relaxed, comfortable fits for casual wear",
    subcategories: [],
    imageFolder: "products/tshirts/oversized",
    sortOrder: 5,
    isActive: true,
  },
  {
    id: "vintage",
    name: "Vintage Style",
    description: "Retro-inspired designs with modern sustainability",
    subcategories: [],
    imageFolder: "products/tshirts/vintage",
    sortOrder: 6,
    isActive: true,
  },
  {
    id: "premium",
    name: "Premium T-Shirts",
    description: "Luxury sustainable materials and craftsmanship",
    subcategories: ["bamboo-silk-blend", "organic-pima-cotton"],
    imageFolder: "products/tshirts/premium",
    sortOrder: 7,
    isActive: true,
  },
  {
    id: "seasonal",
    name: "Seasonal Collections",
    description: "Limited time collections and special editions",
    subcategories: ["summer-2024", "fall-2024", "limited-edition"],
    imageFolder: "products/tshirts/seasonal",
    sortOrder: 8,
    isActive: true,
  },
]

// T-Shirt Subcategories
export const tshirtSubcategories: ProductSubcategory[] = [
  // Basic subcategories
  {
    id: "organic-cotton-basic",
    name: "Organic Cotton Basic",
    description: "100% organic cotton essential tees",
    parentCategory: "basic",
    imageFolder: "products/tshirts/basic/organic-cotton-basic",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "hemp-blend-basic",
    name: "Hemp Blend Basic",
    description: "Hemp-cotton blend for durability",
    parentCategory: "basic",
    imageFolder: "products/tshirts/basic/hemp-blend-basic",
    sortOrder: 2,
    isActive: true,
  },
  // Graphic subcategories
  {
    id: "nature-prints",
    name: "Nature Prints",
    description: "Beautiful nature-inspired designs",
    parentCategory: "graphic",
    imageFolder: "products/tshirts/graphic/nature-prints",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "text-designs",
    name: "Text Designs",
    description: "Meaningful messages and typography",
    parentCategory: "graphic",
    imageFolder: "products/tshirts/graphic/text-designs",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "abstract",
    name: "Abstract Designs",
    description: "Modern abstract and geometric patterns",
    parentCategory: "graphic",
    imageFolder: "products/tshirts/graphic/abstract",
    sortOrder: 3,
    isActive: true,
  },
  // Long sleeve subcategories
  {
    id: "casual",
    name: "Casual Long Sleeve",
    description: "Relaxed fit long sleeve tees",
    parentCategory: "long-sleeve",
    imageFolder: "products/tshirts/long-sleeve/casual",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "fitted",
    name: "Fitted Long Sleeve",
    description: "Tailored fit long sleeve tees",
    parentCategory: "long-sleeve",
    imageFolder: "products/tshirts/long-sleeve/fitted",
    sortOrder: 2,
    isActive: true,
  },
  // Premium subcategories
  {
    id: "bamboo-silk-blend",
    name: "Bamboo Silk Blend",
    description: "Luxurious bamboo and silk blend",
    parentCategory: "premium",
    imageFolder: "products/tshirts/premium/bamboo-silk-blend",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "organic-pima-cotton",
    name: "Organic Pima Cotton",
    description: "Premium long-staple organic cotton",
    parentCategory: "premium",
    imageFolder: "products/tshirts/premium/organic-pima-cotton",
    sortOrder: 2,
    isActive: true,
  },
  // Seasonal subcategories
  {
    id: "summer-2024",
    name: "Summer 2024",
    description: "Lightweight summer collection",
    parentCategory: "seasonal",
    imageFolder: "products/tshirts/seasonal/summer-2024",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "fall-2024",
    name: "Fall 2024",
    description: "Cozy fall collection",
    parentCategory: "seasonal",
    imageFolder: "products/tshirts/seasonal/fall-2024",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "limited-edition",
    name: "Limited Edition",
    description: "Special limited release designs",
    parentCategory: "seasonal",
    imageFolder: "products/tshirts/seasonal/limited-edition",
    sortOrder: 3,
    isActive: true,
  },
]

// Helper functions
export function getCategoryById(id: string): ProductCategory | undefined {
  return tshirtCategories.find((cat) => cat.id === id)
}

export function getSubcategoriesByParent(parentId: string): ProductSubcategory[] {
  return tshirtSubcategories.filter((sub) => sub.parentCategory === parentId)
}

export function getImagePath(category: string, subcategory?: string, filename?: string): string {
  let path = `/images/optimized/products/tshirts/${category}`
  if (subcategory) path += `/${subcategory}`
  if (filename) path += `/${filename}`
  return path
}
