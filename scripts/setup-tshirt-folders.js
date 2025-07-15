const fs = require("fs")
const path = require("path")

// Create detailed t-shirt folder structure
const tshirtFolders = [
  // Basic t-shirts
  "public/images/raw/products/tshirts/basic/organic-cotton-basic",
  "public/images/raw/products/tshirts/basic/hemp-blend-basic",

  // Graphic t-shirts
  "public/images/raw/products/tshirts/graphic/nature-prints",
  "public/images/raw/products/tshirts/graphic/text-designs",
  "public/images/raw/products/tshirts/graphic/abstract",

  // Long sleeve
  "public/images/raw/products/tshirts/long-sleeve/casual",
  "public/images/raw/products/tshirts/long-sleeve/fitted",

  // Crop tops
  "public/images/raw/products/tshirts/crop-tops",

  // Oversized
  "public/images/raw/products/tshirts/oversized",

  // Vintage
  "public/images/raw/products/tshirts/vintage",

  // Premium
  "public/images/raw/products/tshirts/premium/bamboo-silk-blend",
  "public/images/raw/products/tshirts/premium/organic-pima-cotton",

  // Seasonal
  "public/images/raw/products/tshirts/seasonal/summer-2024",
  "public/images/raw/products/tshirts/seasonal/fall-2024",
  "public/images/raw/products/tshirts/seasonal/limited-edition",

  // Corresponding optimized folders
  "public/images/optimized/products/tshirts/basic/organic-cotton-basic",
  "public/images/optimized/products/tshirts/basic/hemp-blend-basic",
  "public/images/optimized/products/tshirts/graphic/nature-prints",
  "public/images/optimized/products/tshirts/graphic/text-designs",
  "public/images/optimized/products/tshirts/graphic/abstract",
  "public/images/optimized/products/tshirts/long-sleeve/casual",
  "public/images/optimized/products/tshirts/long-sleeve/fitted",
  "public/images/optimized/products/tshirts/crop-tops",
  "public/images/optimized/products/tshirts/oversized",
  "public/images/optimized/products/tshirts/vintage",
  "public/images/optimized/products/tshirts/premium/bamboo-silk-blend",
  "public/images/optimized/products/tshirts/premium/organic-pima-cotton",
  "public/images/optimized/products/tshirts/seasonal/summer-2024",
  "public/images/optimized/products/tshirts/seasonal/fall-2024",
  "public/images/optimized/products/tshirts/seasonal/limited-edition",
]

function createTshirtFolders() {
  console.log("📁 Creating detailed t-shirt folder structure...")

  tshirtFolders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true })
      console.log(`✅ Created: ${folder}`)
    } else {
      console.log(`⏭️  Already exists: ${folder}`)
    }
  })

  // Create detailed README for t-shirt organization
  const readmeContent = `# 👕 T-Shirt Image Organization Guide

## 📂 Folder Structure

### Basic T-Shirts
- \`basic/organic-cotton-basic/\` - 100% organic cotton essentials
- \`basic/hemp-blend-basic/\` - Hemp-cotton blend basics

### Graphic T-Shirts  
- \`graphic/nature-prints/\` - Nature-inspired designs
- \`graphic/text-designs/\` - Typography and messages
- \`graphic/abstract/\` - Abstract and geometric patterns

### Long Sleeve T-Shirts
- \`long-sleeve/casual/\` - Relaxed fit long sleeves
- \`long-sleeve/fitted/\` - Tailored fit long sleeves

### Specialized Styles
- \`crop-tops/\` - Cropped style t-shirts
- \`oversized/\` - Relaxed, oversized fits
- \`vintage/\` - Vintage and distressed styles

### Premium Collection
- \`premium/bamboo-silk-blend/\` - Luxury bamboo-silk blend
- \`premium/organic-pima-cotton/\` - Premium pima cotton

### Seasonal Collections
- \`seasonal/summer-2024/\` - Summer collection
- \`seasonal/fall-2024/\` - Fall collection  
- \`seasonal/limited-edition/\` - Special limited releases

## 🏷️ Image Naming Convention

### Format: \`[style]-[material]-[color]-[view].jpg\`

**Examples:**
- \`organic-basic-olive-front.jpg\`
- \`organic-basic-olive-back.jpg\`
- \`hemp-longsleeve-cream-front.jpg\`
- \`forest-print-sage-detail.jpg\`
- \`eco-warrior-text-olive-front.jpg\`
- \`bamboo-silk-premium-cream-front.jpg\`

### View Types:
- \`front\` - Front view of product
- \`back\` - Back view of product  
- \`side\` - Side profile view
- \`detail\` - Close-up of design/texture
- \`lifestyle\` - Model wearing product
- \`flat\` - Flat lay product shot

## 🎨 Color Codes:
- \`olive\` - Olive green (#6B7C32)
- \`cream\` - Natural cream (#F5F5DC)
- \`mud\` - Earth brown (#8B4513)
- \`sage\` - Sage green (#9CAF88)
- \`charcoal\` - Charcoal gray (#36454F)

## 📐 Image Specifications:
- **Resolution**: 1200x1200px minimum
- **Format**: JPG for photos, PNG for graphics
- **Quality**: High resolution for print details
- **Background**: White or transparent for product shots

## 🚀 Usage Workflow:

1. **Add Images**: Place in appropriate \`raw/\` folder
2. **Optimize**: Run \`npm run optimize-images\`
3. **Admin Panel**: Reference optimized images
4. **Website**: Images appear automatically

## 📱 Responsive Sizes Generated:
- Thumbnail: 300px
- Small: 600px
- Medium: 1200px  
- Large: 1920px
- WebP versions for all sizes
`

  fs.writeFileSync("public/images/TSHIRT_ORGANIZATION.md", readmeContent)
  console.log("📝 Created detailed t-shirt organization guide")

  console.log("\n🎉 T-shirt folder structure created successfully!")
  console.log("\n📋 Next steps:")
  console.log("1. Add your t-shirt images to the appropriate raw/ folders")
  console.log("2. Use descriptive naming: style-material-color-view.jpg")
  console.log("3. Run: npm run optimize-images")
  console.log("4. Reference optimized images in admin panel")
}

createTshirtFolders()
