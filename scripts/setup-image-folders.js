const fs = require("fs")
const path = require("path")

// Create all necessary image folders
const folders = [
  // Raw images (where you put original images)
  "public/images/raw/hero",
  "public/images/raw/products/tshirts",
  "public/images/raw/products/hoodies",
  "public/images/raw/products/tanks",
  "public/images/raw/products/accessories",
  "public/images/raw/collections",
  "public/images/raw/about",
  "public/images/raw/team",
  "public/images/raw/backgrounds",

  // Optimized images (output)
  "public/images/hero",
  "public/images/products/tshirts",
  "public/images/products/hoodies",
  "public/images/products/tanks",
  "public/images/products/accessories",
  "public/images/collections",
  "public/images/about/team",
  "public/images/icons",
  "public/images/backgrounds",
]

function createFolders() {
  console.log("📁 Creating image folder structure...")

  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true })
      console.log(`✅ Created: ${folder}`)
    } else {
      console.log(`⏭️  Already exists: ${folder}`)
    }
  })

  // Create a README file with instructions
  const readmeContent = `# Image Management Guide

## Folder Structure

### Raw Images (/public/images/raw/)
Put your original, unoptimized images here:
- hero/ - Hero section images
- products/ - Product photos (organized by category)
- collections/ - Collection showcase images
- about/ - About page images
- team/ - Team member photos
- backgrounds/ - Background images

### Optimized Images (/public/images/)
Processed images will be saved here automatically.

## Usage

1. Add your raw images to the appropriate /raw/ folder
2. Run: npm run optimize-images
3. Use the optimized images in your components

## Naming Convention

Use descriptive, kebab-case names:
- ✅ eco-hoodie-olive-front.jpg
- ✅ sarah-chen-headshot.jpg
- ❌ IMG_001.jpg
- ❌ photo1.png

## Recommended Sizes

- Hero images: 1920x1080px
- Product images: 1200x1200px (square)
- Collection images: 1200x800px
- Team photos: 800x800px
- Icons: SVG format preferred
`

  fs.writeFileSync("public/images/README.md", readmeContent)
  console.log("📝 Created README.md with usage instructions")

  console.log("\n🎉 Image folder structure created successfully!")
  console.log("\n📋 Next steps:")
  console.log("1. Add your images to public/images/raw/ folders")
  console.log("2. Install sharp: npm install sharp --save-dev")
  console.log("3. Run: npm run optimize-images")
}

createFolders()
