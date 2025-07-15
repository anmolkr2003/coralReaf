const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

// Configuration
const config = {
  inputDir: "./public/images/raw",
  outputDir: "./public/images",
  quality: {
    jpeg: 85,
    webp: 80,
    png: 90,
  },
  sizes: {
    thumbnail: 300,
    small: 600,
    medium: 1200,
    large: 1920,
  },
}

// Create output directories if they don't exist
function createDirectories() {
  const dirs = [
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

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      console.log(`Created directory: ${dir}`)
    }
  })
}

// Optimize single image
async function optimizeImage(inputPath, outputPath, options = {}) {
  const { width = null, height = null, quality = config.quality.jpeg, format = "jpeg" } = options

  try {
    let pipeline = sharp(inputPath)

    // Resize if dimensions provided
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: "inside",
        withoutEnlargement: true,
      })
    }

    // Apply format and quality
    switch (format) {
      case "webp":
        pipeline = pipeline.webp({ quality: config.quality.webp })
        break
      case "png":
        pipeline = pipeline.png({ quality: config.quality.png })
        break
      default:
        pipeline = pipeline.jpeg({ quality: config.quality.jpeg })
    }

    await pipeline.toFile(outputPath)
    console.log(`✅ Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`)
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message)
  }
}

// Process all images in a directory
async function processDirectory(inputDir, outputDir) {
  if (!fs.existsSync(inputDir)) {
    console.log(`Input directory ${inputDir} doesn't exist. Creating it...`)
    fs.mkdirSync(inputDir, { recursive: true })
    console.log(`Please add your raw images to ${inputDir} and run the script again.`)
    return
  }

  const files = fs.readdirSync(inputDir)
  const imageFiles = files.filter((file) => file.match(/\.(jpg|jpeg|png|webp)$/i))

  if (imageFiles.length === 0) {
    console.log(`No images found in ${inputDir}`)
    return
  }

  console.log(`Found ${imageFiles.length} images to process...`)

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file)
    const nameWithoutExt = path.parse(file).name

    // Generate different sizes
    const sizes = [
      { suffix: "", width: config.sizes.large },
      { suffix: "-medium", width: config.sizes.medium },
      { suffix: "-small", width: config.sizes.small },
      { suffix: "-thumb", width: config.sizes.thumbnail },
    ]

    for (const size of sizes) {
      const outputPath = path.join(outputDir, `${nameWithoutExt}${size.suffix}.jpg`)
      await optimizeImage(inputPath, outputPath, {
        width: size.width,
        quality: config.quality.jpeg,
      })

      // Also create WebP version
      const webpPath = path.join(outputDir, `${nameWithoutExt}${size.suffix}.webp`)
      await optimizeImage(inputPath, webpPath, {
        width: size.width,
        format: "webp",
      })
    }
  }
}

// Main function
async function main() {
  console.log("🖼️  Starting image optimization...")

  createDirectories()

  // Process different categories
  const categories = [
    { input: "./public/images/raw/hero", output: "./public/images/hero" },
    { input: "./public/images/raw/products", output: "./public/images/products" },
    { input: "./public/images/raw/collections", output: "./public/images/collections" },
    { input: "./public/images/raw/about", output: "./public/images/about" },
    { input: "./public/images/raw/team", output: "./public/images/about/team" },
  ]

  for (const category of categories) {
    console.log(`\n📁 Processing ${category.input}...`)
    await processDirectory(category.input, category.output)
  }

  console.log("\n✨ Image optimization complete!")
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { optimizeImage, processDirectory, main }
