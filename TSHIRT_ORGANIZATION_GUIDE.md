# 👕 T-Shirt Organization System

## 🗂️ **Detailed T-Shirt Folder Structure**

\`\`\`
public/images/raw/products/tshirts/
├── basic/                          # Basic/Essential T-Shirts
│   ├── organic-cotton-basic/
│   │   ├── organic-basic-white-front.jpg
│   │   ├── organic-basic-white-back.jpg
│   │   ├── organic-basic-olive-front.jpg
│   │   ├── organic-basic-olive-back.jpg
│   │   └── organic-basic-cream-front.jpg
│   └── hemp-blend-basic/
│       ├── hemp-basic-sage-front.jpg
│       └── hemp-basic-mud-front.jpg
│
├── graphic/                        # Graphic/Print T-Shirts
│   ├── nature-prints/
│   │   ├── forest-print-olive-front.jpg
│   │   ├── forest-print-olive-detail.jpg
│   │   └── ocean-waves-blue-front.jpg
│   ├── text-designs/
│   │   ├── eco-warrior-cream-front.jpg
│   │   └── sustainable-living-olive-front.jpg
│   └── abstract/
│       ├── geometric-sage-front.jpg
│       └── minimalist-lines-mud-front.jpg
│
├── long-sleeve/                    # Long Sleeve T-Shirts
│   ├── casual/
│   │   ├── hemp-longsleeve-olive-front.jpg
│   │   ├── hemp-longsleeve-olive-back.jpg
│   │   └── organic-longsleeve-cream-front.jpg
│   └── fitted/
│       ├── fitted-longsleeve-sage-front.jpg
│       └── fitted-longsleeve-mud-front.jpg
│
├── crop-tops/                      # Crop Top Style T-Shirts
│   ├── organic-crop-cream-front.jpg
│   ├── organic-crop-cream-back.jpg
│   ├── hemp-crop-olive-front.jpg
│   └── fitted-crop-sage-front.jpg
│
├── oversized/                      # Oversized/Relaxed Fit
│   ├── oversized-organic-olive-front.jpg
│   ├── oversized-organic-olive-back.jpg
│   ├── relaxed-hemp-cream-front.jpg
│   └── boxy-fit-sage-front.jpg
│
├── vintage/                        # Vintage/Distressed Style
│   ├── vintage-wash-olive-front.jpg
│   ├── vintage-wash-olive-detail.jpg
│   ├── distressed-cream-front.jpg
│   └── retro-style-mud-front.jpg
│
├── premium/                        # Premium/Luxury T-Shirts
│   ├── bamboo-silk-blend/
│   │   ├── bamboo-silk-cream-front.jpg
│   │   └── bamboo-silk-sage-front.jpg
│   └── organic-pima-cotton/
│       ├── pima-cotton-olive-front.jpg
│       └── pima-cotton-mud-front.jpg
│
└── seasonal/                       # Seasonal Collections
    ├── summer-2024/
    │   ├── summer-lightweight-cream.jpg
    │   └── summer-breathable-sage.jpg
    ├── fall-2024/
    │   ├── fall-cozy-olive.jpg
    │   └── fall-warm-mud.jpg
    └── limited-edition/
        ├── earth-day-special-olive.jpg
        └── ocean-cleanup-blue.jpg
\`\`\`

## 📊 **Product Data Structure for Categories**

\`\`\`typescript
// Enhanced product categories
const tshirtCategories = {
  basic: {
    name: "Basic T-Shirts",
    description: "Essential everyday tees in organic materials",
    subcategories: ["organic-cotton-basic", "hemp-blend-basic"]
  },
  graphic: {
    name: "Graphic T-Shirts", 
    description: "Expressive designs with sustainable messages",
    subcategories: ["nature-prints", "text-designs", "abstract"]
  },
  "long-sleeve": {
    name: "Long Sleeve T-Shirts",
    description: "Extended coverage with sustainable comfort",
    subcategories: ["casual", "fitted"]
  },
  "crop-tops": {
    name: "Crop Tops",
    description: "Modern cropped styles in eco-friendly fabrics",
    subcategories: []
  },
  oversized: {
    name: "Oversized T-Shirts",
    description: "Relaxed, comfortable fits for casual wear",
    subcategories: []
  },
  vintage: {
    name: "Vintage Style",
    description: "Retro-inspired designs with modern sustainability",
    subcategories: []
  },
  premium: {
    name: "Premium T-Shirts",
    description: "Luxury sustainable materials and craftsmanship",
    subcategories: ["bamboo-silk-blend", "organic-pima-cotton"]
  },
  seasonal: {
    name: "Seasonal Collections",
    description: "Limited time collections and special editions",
    subcategories: ["summer-2024", "fall-2024", "limited-edition"]
  }
}
\`\`\`
