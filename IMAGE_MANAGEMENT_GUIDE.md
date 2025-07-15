# 📸 Complete Image Management Guide for Coralreaf

## 🗂️ **Folder Structure Overview**

\`\`\`
public/
├── images/
│   ├── raw/                    # 📁 PUT YOUR ORIGINAL IMAGES HERE
│   │   ├── hero/              # Hero section images
│   │   ├── products/          # Product photos
│   │   │   ├── tshirts/
│   │   │   ├── hoodies/
│   │   │   ├── tanks/
│   │   │   └── accessories/
│   │   ├── collections/       # Collection showcase images
│   │   ├── about/            # About page images
│   │   ├── team/             # Team member photos
│   │   └── backgrounds/      # Background images
│   │
│   └── optimized/            # ✨ PROCESSED IMAGES (AUTO-GENERATED)
│       ├── hero/
│       ├── products/
│       ├── collections/
│       ├── about/
│       └── team/
\`\`\`

## 🎯 **Step-by-Step Image Upload Process**

### **Method 1: Direct File Upload (Recommended)**

1. **Save images to the `public/images/raw/` folders:**
   \`\`\`
   public/images/raw/hero/my-hero-image.jpg
   public/images/raw/products/tshirts/olive-tee-front.jpg
   public/images/raw/collections/earth-essentials.jpg
   \`\`\`

2. **Run the optimization script:**
   \`\`\`bash
   npm run optimize-images
   \`\`\`

3. **Use in admin panel:**
   - The optimized images will be available at `/images/optimized/...`
   - Reference them in admin as: `/images/optimized/hero/my-hero-image.jpg`

### **Method 2: Admin Panel Upload**

1. **Go to admin panel** (`/admin`)
2. **Navigate to Collections/Products/Hero sections**
3. **Click "Choose File" or drag & drop**
4. **Images are automatically processed and saved**

## 📋 **Image Requirements by Type**

### **Hero Images**
- **Size**: 1920x1080px (16:9 ratio)
- **Format**: JPG, PNG, WebP
- **Location**: `public/images/raw/hero/`
- **Usage**: Homepage hero background
- **Example**: `hero-sustainable-fashion.jpg`

### **Product Images**
- **Size**: 1200x1200px (1:1 ratio)
- **Format**: JPG, PNG
- **Location**: `public/images/raw/products/[category]/`
- **Usage**: Product listings, detail pages
- **Example**: `organic-tee-olive-front.jpg`

### **Collection Images**
- **Size**: 1200x800px (3:2 ratio)
- **Format**: JPG, PNG
- **Location**: `public/images/raw/collections/`
- **Usage**: Homepage carousel, collection pages
- **Example**: `earth-essentials-collection.jpg`

### **Team Photos**
- **Size**: 800x800px (1:1 ratio)
- **Format**: JPG, PNG
- **Location**: `public/images/raw/team/`
- **Usage**: About page team section
- **Example**: `sarah-chen-headshot.jpg`

## 🔧 **Setup Instructions**

### **1. Create Folder Structure**
\`\`\`bash
npm run setup-images
\`\`\`
This creates all necessary folders automatically.

### **2. Add Your Images**
Place your original, high-quality images in the appropriate `raw/` folders:

\`\`\`
public/images/raw/
├── hero/
│   ├── main-hero.jpg           # Homepage hero
│   └── about-hero.jpg          # About page hero
├── products/
│   ├── tshirts/
│   │   ├── classic-tee-olive.jpg
│   │   ├── classic-tee-cream.jpg
│   │   └── hemp-longsleeve.jpg
│   ├── hoodies/
│   │   ├── eco-hoodie-olive.jpg
│   │   └── recycled-sweatshirt.jpg
│   └── accessories/
│       ├── organic-tote-bag.jpg
│       └── recycled-beanie.jpg
├── collections/
│   ├── earth-essentials.jpg
│   ├── urban-nature.jpg
│   └── eco-hoodies.jpg
└── team/
    ├── sarah-chen.jpg
    ├── marcus-rodriguez.jpg
    └── aisha-patel.jpg
\`\`\`

### **3. Optimize Images**
\`\`\`bash
npm run optimize-images
\`\`\`

### **4. Use in Admin Panel**
Reference optimized images as: `/images/optimized/[category]/[filename]`

## 🎨 **Admin Panel Image Upload**

### **Collections**
1. Go to `/admin/collections`
2. Click "Add Collection" or edit existing
3. **Upload Method 1**: Click "Choose File" → Select image
4. **Upload Method 2**: Paste image URL in text field
5. Preview appears automatically
6. Save collection

### **Products**
1. Go to `/admin/products`
2. Add/edit product
3. Upload multiple images for product gallery
4. Set primary image for listings
5. Images auto-resize for different uses

### **Hero Sections**
1. Go to `/admin/hero`
2. Upload background image
3. Preview shows immediately
4. Toggle active/inactive

## 📱 **Image Display System**

### **Automatic Optimization**
The system creates multiple sizes:
- **Thumbnail**: 300px
- **Small**: 600px  
- **Medium**: 1200px
- **Large**: 1920px
- **WebP versions** for better performance

### **Responsive Display**
Images automatically adapt to:
- Mobile devices (320px-768px)
- Tablets (768px-1024px)
- Desktop (1024px+)

### **Fallback System**
If image fails to load:
- Shows placeholder with correct dimensions
- Maintains layout integrity
- Provides alt text for accessibility

## 🔗 **Image URL Patterns**

### **Raw Images** (Your uploads)
\`\`\`
/images/raw/hero/my-image.jpg
/images/raw/products/tshirts/product.jpg
/images/raw/collections/collection.jpg
\`\`\`

### **Optimized Images** (Auto-generated)
\`\`\`
/images/optimized/hero/my-image.jpg          # Original size
/images/optimized/hero/my-image-medium.jpg   # 1200px
/images/optimized/hero/my-image-small.jpg    # 600px
/images/optimized/hero/my-image-thumb.jpg    # 300px
/images/optimized/hero/my-image.webp         # WebP format
\`\`\`

## ⚡ **Performance Tips**

### **Image Optimization**
- **Compress before upload**: Use tools like TinyPNG
- **Correct dimensions**: Don't upload 4K images for thumbnails
- **WebP format**: Automatically generated for better performance
- **Lazy loading**: Images load as user scrolls

### **File Naming**
✅ **Good**: `organic-cotton-tee-olive-front.jpg`
❌ **Bad**: `IMG_001.jpg`

Use descriptive, kebab-case names:
- `product-name-color-view.jpg`
- `collection-name-hero.jpg`
- `team-member-name-headshot.jpg`

## 🛠️ **Troubleshooting**

### **Image Not Showing?**
1. **Check file path**: Ensure correct folder structure
2. **Run optimization**: `npm run optimize-images`
3. **Verify format**: Use JPG, PNG, or WebP
4. **Check permissions**: Ensure files are readable

### **Slow Loading?**
1. **Optimize file size**: Compress large images
2. **Use correct dimensions**: Don't upload oversized images
3. **Check network**: Verify internet connection
4. **Clear cache**: Refresh browser cache

### **Upload Failing?**
1. **File size**: Keep under 10MB per image
2. **File format**: Use supported formats (JPG, PNG, WebP)
3. **File name**: Avoid special characters
4. **Browser**: Try different browser if issues persist

## 📊 **Image Management Workflow**

### **For New Products**
1. Take/receive product photos
2. Save to `public/images/raw/products/[category]/`
3. Run `npm run optimize-images`
4. Add product in admin panel
5. Reference optimized image paths

### **For Collections**
1. Create collection hero image
2. Save to `public/images/raw/collections/`
3. Optimize images
4. Create collection in admin
5. Upload image via admin panel

### **For Team Updates**
1. Get team member photos
2. Save to `public/images/raw/team/`
3. Optimize images
4. Update team section in admin
5. Images appear on About page

## 🎯 **Quick Reference**

### **Image Sizes**
- Hero: 1920x1080px
- Products: 1200x1200px
- Collections: 1200x800px
- Team: 800x800px

### **Commands**
- Setup: `npm run setup-images`
- Optimize: `npm run optimize-images`
- Dev server: `npm run dev`

### **Admin URLs**
- Dashboard: `/admin`
- Collections: `/admin/collections`
- Products: `/admin/products`
- Hero: `/admin/hero`
- Team: `/admin/team`

This system ensures your images are properly optimized, responsive, and display correctly across all devices! 🚀
