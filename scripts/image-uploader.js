const fs = require("fs")
const path = require("path")
const sharp = require("sharp")

// Enhanced image uploader with automatic processing
class ImageUploader {
  constructor() {
    this.uploadDir = "./public/images/raw"
    this.outputDir = "./public/images/optimized"
    this.maxFileSize = 10 * 1024 * 1024 // 10MB
    this.allowedFormats = ["jpg", "jpeg", "png", "webp"]
  }

  // Process uploaded file
  async processUpload(filePath, category, filename) {
    try {
      // Validate file
      const stats = fs.statSync(filePath)
      if (stats.size > this.maxFileSize) {
        throw new Error("File too large. Maximum size is 10MB.")
      }

      // Get file extension
      const ext = path.extname(filename).toLowerCase().slice(1)
      if (!this.allowedFormats.includes(ext)) {
        throw new Error(`Unsupported format. Use: ${this.allowedFormats.join(", ")}`)
      }

      // Create category directories
      const rawCategoryDir = path.join(this.uploadDir, category)
      const outputCategoryDir = path.join(this.outputDir, category)

      if (!fs.existsSync(rawCategoryDir)) {
        fs.mkdirSync(rawCategoryDir, { recursive: true })
      }
      if (!fs.existsSync(outputCategoryDir)) {
        fs.mkdirSync(outputCategoryDir, { recursive: true })
      }

      // Copy to raw directory
      const rawPath = path.join(rawCategoryDir, filename)
      fs.copyFileSync(filePath, rawPath)

      // Process and optimize
      await this.optimizeImage(rawPath, outputCategoryDir, filename)

      return {
        success: true,
        rawPath: `/images/raw/${category}/${filename}`,
        optimizedPath: `/images/optimized/${category}/${filename}`,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Optimize single image with multiple sizes
  async optimizeImage(inputPath, outputDir, filename) {
    const nameWithoutExt = path.parse(filename).name
    const sizes = [
      { suffix: "", width: null }, // Original size
      { suffix: "-large", width: 1920 },
      { suffix: "-medium", width: 1200 },
      { suffix: "-small", width: 600 },
      { suffix: "-thumb", width: 300 },
    ]

    for (const size of sizes) {
      // JPEG version
      const jpegPath = path.join(outputDir, `${nameWithoutExt}${size.suffix}.jpg`)
      let pipeline = sharp(inputPath)

      if (size.width) {
        pipeline = pipeline.resize(size.width, null, {
          fit: "inside",
          withoutEnlargement: true,
        })
      }

      await pipeline.jpeg({ quality: 85, progressive: true }).toFile(jpegPath)

      // WebP version
      const webpPath = path.join(outputDir, `${nameWithoutExt}${size.suffix}.webp`)
      pipeline = sharp(inputPath)

      if (size.width) {
        pipeline = pipeline.resize(size.width, null, {
          fit: "inside",
          withoutEnlargement: true,
        })
      }

      await pipeline.webp({ quality: 80 }).toFile(webpPath)
    }

    console.log(`✅ Optimized: ${filename}`)
  }

  // Get image info
  async getImageInfo(imagePath) {
    try {
      const metadata = await sharp(imagePath).metadata()
      const stats = fs.statSync(imagePath)

      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: stats.size,
        sizeFormatted: this.formatFileSize(stats.size),
      }
    } catch (error) {
      return null
    }
  }

  // Format file size
  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // List images in category
  listImages(category) {
    const categoryDir = path.join(this.outputDir, category)
    if (!fs.existsSync(categoryDir)) return []

    return fs
      .readdirSync(categoryDir)
      .filter((file) => {
        const ext = path.extname(file).toLowerCase()
        return [".jpg", ".jpeg", ".png", ".webp"].includes(ext)
      })
      .map((file) => ({
        filename: file,
        path: `/images/optimized/${category}/${file}`,
        url: `/images/optimized/${category}/${file}`,
      }))
  }
}

module.exports = { ImageUploader }
