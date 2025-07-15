import type { User, Product, Collection, Order, HeroSection, SiteSettings } from "./types"

// In-memory data store (replace with real database in production)
class DataStore {
  private users: User[] = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@coralreaf.com",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      totalOrders: 0,
      totalSpent: 0,
    },
        {
      id: "0",
      name: "test",
      email: "admin@coralreaf.com",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      totalOrders: 0,
      totalSpent: 0,
    },
    {
      id: "2",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      
      createdAt: new Date(),
      updatedAt: new Date(),
      totalOrders: 5,
      totalSpent: 150.75,
    },
    {
      id: "3",
      name: "test",
      email: "test@example.com",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      totalOrders: 0,
      totalSpent: 0,
    },
  ]

  private products: Product[] = [
    {
      id: "1",
      name: "Eco-Friendly Hoodie",
      description: "Comfortable hoodie made from hemp and organic cotton blend.",
      price: 59.99,
      images: ["/images/raw/team/Munish.jpg?height=400&width=400"],
      primaryImage: "/images/raw/team/Munish.jpg?height=400&width=400",
      subcategory: "hoodies",
      category: "clothing",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Gray", "Green", "Brown"],
      tags: ["hemp", "organic"],
      featured: true,
      inStock: true,
      stockQuantity: 50, // Added stock quantity
      inventory: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Organic Cotton T-Shirt",
      description: "Soft, breathable organic cotton t-shirt perfect for everyday wear.",
      price: 29.99,
      images: ["/images/raw/team/Munish.jpg?height=400&width=400"],
      primaryImage: "/images/raw/team/Munish.jpg?height=400&width=400",
      subcategory: "t-shirts",
      category: "clothing",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Black", "Navy", "Olive"],
      tags: ["organic", "cotton"],
      featured: true,
      inStock: true,
      stockQuantity: 100, // Added stock quantity
      inventory: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Recycled Denim Jacket",
      description: "Stylish denim jacket made from 100% recycled materials.",
      price: 89.99,
      images: ["/images/raw/team/Munis.jpg?height=400&width=400"],
      primaryImage: "/images/raw/team/Munis.jpg?height=400&width=400",
      subcategory: "jackets",
      subSubcategory: "denim",
      category: "clothing",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Black"],
      tags: ["recycled", "denim"],
      featured: true,
      inStock: true,
      stockQuantity: 25, // Added stock quantity
      inventory: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      name: "Bamboo Fiber Socks",
      description: "Ultra-soft socks made from sustainable bamboo fiber.",
      price: 15.99,
      images: ["/placeholder.svg?height=400&width=400"],
      primaryImage: "/placeholder.svg?height=400&width=400",
      subcategory: "socks",
      subSubcategory: "bamboo",
      category: "accessories",
      sizes: ["S", "M", "L"],
      colors: ["White", "Black", "Gray"],
      tags: ["bamboo", "sustainable"],
      featured: false,
      inStock: true,
      stockQuantity: 200, // Added stock quantity
      inventory: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

 
 private collections: Collection[] = [
  {
    id: "1",
    name: "Ocean Breeze",
    description: "Light and airy pieces inspired by coastal living",
    image: "/images/raw/team/Munish.jpg?height=300&width=400",
    featured: true,
    products: ["1", "2"],
    isActive: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Earth Tones",
    description: "Natural colors that connect you with nature",
    image: "/images/raw/team/Munih.jpg?height=300&width=400",
    featured: true,
    products: ["3", "4"],
    isActive: true,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

   // Collections
  getCollections(): Collection[] {
    return this.collections
  }

  // Add a new collection
  async addCollection(collection: Collection): Promise<Collection> {
    const newCollection = {
      ...collection,
      id: Date.now().toString(), // or use UUID
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.collections.push(newCollection)
    return newCollection
  }

  // Update an existing collection by ID
  async updateCollection(id: string, updates: Partial<Collection>): Promise<Collection | null> {
    const index = this.collections.findIndex(col => col.id === id)
    if (index === -1) return null

    const updatedCollection = {
      ...this.collections[index],
      ...updates,
      updatedAt: new Date(),
    }
    this.collections[index] = updatedCollection
    return updatedCollection
  }



   // Delete a collection by ID
  async deleteCollection(id: string): Promise<void> {
    this.collections = this.collections.filter(col => col.id !== id)
  }




  private orders: Order[] = []

  private heroSections: HeroSection[] = [
    {
      id: "1",
      title: "Sustainable Fashion for Everyone",
      subtitle: "Discover eco-friendly clothing that doesn't compromise on style",
      image: "/placeholder.svg?height=600&width=1200",
      ctaText: "Shop Now",
      ctaLink: "/shop",
      active: true,
      order: 1,
    },
  ]

  private siteSettings: SiteSettings = {
    siteName: "Coralreaf",
    siteDescription: "Sustainable fashion for conscious consumers",
    contactEmail: "hello@coralreaf.com",
    socialLinks: {
      instagram: "https://instagram.com/coralreaf",
      facebook: "https://facebook.com/coralreaf",
    },
  }

  // Users
  getUsers(): User[] {
    return this.users
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id)
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email)
  }

  createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): User {
    const user: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.users.push(user)
    return user
  }

  // Products
  getProducts(): Product[] {
    return this.products
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id)
  }

  getFeaturedProducts(): Product[] {
    return this.products.filter((product) => product.featured)
  }

  createProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const product: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.products.push(product)
    return product
  }

  updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const index = this.products.findIndex((product) => product.id === id)
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates, updatedAt: new Date() }
      return this.products[index]
    }
    return undefined
  }



// Delete product by ID by Shine 
  deleteProduct(id: string): boolean {
    const index = this.products.findIndex((product) => product.id === id)
    if (index !== -1) {
      this.products.splice(index, 1)
      return true
    }
    return false
  }


 


  getFeaturedCollections(): Collection[] {
    return this.collections.filter((collection) => collection.featured)
  }

  // Orders
  getOrders(): Order[] {
    return this.orders
  }

  createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Order {
    const order: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.orders.push(order)
    return order
  }

  // Hero Sections
  getHeroSections(): HeroSection[] {
    return this.heroSections
  }

  getActiveHeroSections(): HeroSection[] {
    return this.heroSections.filter((section) => section.active).sort((a, b) => a.order - b.order)
  }

  // Site Settings
  getSiteSettings(): SiteSettings {
    return this.siteSettings
  }

  updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
    this.siteSettings = { ...this.siteSettings, ...updates }
    return this.siteSettings
  }
}

export const dataStore = new DataStore()
