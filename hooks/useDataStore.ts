"use client"

import { useState, useEffect } from "react"
import { dataStore } from "@/lib/data-store"
import type { Product, Collection, HeroSection, SiteSettings } from "@/lib/types"
import type { Order, } from "@/lib/types"  // Assuming Order is defined in types
import type { User } from "@/lib/types" // Assuming Customer is defined in types


export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await dataStore.getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getFeaturedProducts = () => dataStore.getFeaturedProducts()


  type NewProduct = Omit<Product, "id" | "createdAt" | "updatedAt">

  // ✅ Add product by Shine
 const addProduct = async ( product: NewProduct) => {
  try {
    const newProduct = await dataStore.createProduct(product)
    setProducts((prev) => [...prev, newProduct])
    return newProduct
  } catch (error) {
    console.error("Error adding product:", error)
    throw error
  }
}




  // ✅ Update product by Shine
  const updateProduct = async (updated: Product) => {
  try {
    const { id, ...updates } = updated
    const updatedProduct = await dataStore.updateProduct(id, updates)
    if (!updatedProduct) throw new Error("Product not found")

    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    )
    return updatedProduct
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}

  // ✅ Delete product
  const deleteProduct = async (productId: string) => {
    try {
      await dataStore.deleteProduct(productId)
      setProducts((prev) => prev.filter((p) => p.id !== productId))
    } catch (error) {
      console.error("Error deleting product:", error)
      throw error
    }
  }

  return {
    products,
    loading,
    getFeaturedProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Fetch all collections
  const fetchCollections = async () => {
    setLoading(true)
    try {
      const data = await dataStore.getCollections()
      setCollections(data)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCollections()
  }, [])

 const addCollection = async (newCollection: Omit<Collection, "id" | "createdAt" | "updatedAt">) => {
  try {
    const collectionWithId: Collection = {
      ...newCollection,
      id: Date.now().toString(), // or use UUID
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const created = await dataStore.addCollection(collectionWithId)
    setCollections(prev => [...prev, created])
  } catch (err) {
    console.error("Error adding collection:", err)
    setError(err as Error)
  }
}


  // Update existing collection
  const updateCollection = async (id: string, updatedData: Partial<Collection>) => {
    try {
      const updated = await dataStore.updateCollection(id, updatedData)
      setCollections(prev =>
        prev.map(col => (col.id === id ? { ...col, ...updated } : col))
      )
    } catch (err) {
      console.error("Error updating collection:", err)
      setError(err as Error)
    }
  }

  // Delete a collection
  const deleteCollection = async (id: string) => {
    try {
      await dataStore.deleteCollection(id)
      setCollections(prev => prev.filter(col => col.id !== id))
    } catch (err) {
      console.error("Error deleting collection:", err)
      setError(err as Error)
    }
  }

  // Get featured
  const getFeaturedCollections = () => dataStore.getFeaturedCollections()

  return {
    collections,
    loading,
    error,
    refetch: fetchCollections,
    getFeaturedCollections,
    addCollection,
    updateCollection,
    deleteCollection,
  }
}


export function useHeroSections() {
  const [heroSections, setHeroSections] = useState<HeroSection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHeroSections = async () => {
      try {
        const data = dataStore.getHeroSections()
        setHeroSections(data)
      } catch (error) {
        console.error("Error fetching hero sections:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroSections()
  }, [])

  const getActiveHeroSections = () => dataStore.getActiveHeroSections()

  return {
    heroSections,
    loading,
    getActiveHeroSections,
  }
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = dataStore.getSiteSettings()
        setSettings(data)
      } catch (error) {
        console.error("Error fetching site settings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return {
    settings,
    loading,
  }
}

// Convenience hooks for specific data
export function useFeaturedProducts() {
  const { getFeaturedProducts } = useProducts()
  return { products: getFeaturedProducts() }
}

export function useFeaturedCollections() {
  const { getFeaturedCollections } = useCollections()
  return { collections: getFeaturedCollections() }
}

// Order-related hooks by Shine

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {






    const fetchOrders = async () => {
      try {
        const data = await dataStore.getOrders() // ✅ Await this
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return { orders,setOrders, loading }
}

// in useDataStore.ts
// const useOrders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(false);

//   const updateOrder = (orderId: string, newStatus: string) => {
//     // implementation of updateOrder logic
//   };

//   return { orders, updateOrder, loading };
// };


export function useCustomers() {
  const [customers, setCustomers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await dataStore.getUsers()
        setCustomers(data)
      } catch (error) {
        console.error("Error fetching customers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  return { customers, loading }
}


