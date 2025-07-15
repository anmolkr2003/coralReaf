"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { useProducts, useCollections } from "@/hooks/useDataStore"
import { Package, ImageIcon, Users, DollarSign, TrendingUp, ShoppingCart, Eye, Star } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { user, isAdmin, isLoading } = useAuth()
  const { products } = useProducts()
  const { collections } = useCollections()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/auth/signin")
    }
  }, [user, isAdmin, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-olive"></div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  // Mock analytics data (replace with real data)
  const analytics = {
    totalRevenue: 45678.9,
    totalOrders: 234,
    totalCustomers: 1456,
    conversionRate: 3.2,
    recentOrders: [
      { id: "1", customer: "John Doe", amount: 89.99, status: "completed" },
      { id: "2", customer: "Jane Smith", amount: 156.5, status: "processing" },
      { id: "3", customer: "Mike Johnson", amount: 67.25, status: "shipped" },
    ],
    topProducts: [
      { id: "1", name: "Organic Cotton Basic Tee", sales: 45, revenue: 1347.55 },
      { id: "2", name: "Eco-Friendly Hoodie", sales: 23, revenue: 1379.77 },
      { id: "3", name: "Hemp Blend Long Sleeve", sales: 34, revenue: 1189.66 },
    ],
  }

  const stats = [
    {
      name: "Total Revenue",
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+12.5%",
      changeType: "positive" as const,
    },
    {
      name: "Total Orders",
      value: analytics.totalOrders.toString(),
      icon: ShoppingCart,
      change: "+8.2%",
      changeType: "positive" as const,
    },
    {
      name: "Total Products",
      value: products.length.toString(),
      icon: Package,
      change: "+3",
      changeType: "positive" as const,
    },
    {
      name: "Active Collections",
      value: collections.filter((c) => c.isActive).length.toString(),
      icon: ImageIcon,
      change: "+1",
      changeType: "positive" as const,
    },
    {
      name: "Total Customers",
      value: analytics.totalCustomers.toString(),
      icon: Users,
      change: "+15.3%",
      changeType: "positive" as const,
    },
    {
      name: "Conversion Rate",
      value: `${analytics.conversionRate}%`,
      icon: TrendingUp,
      change: "+0.5%",
      changeType: "positive" as const,
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Welcome Header */}
        <div className="pt-0 mt-0">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your Coralreaf store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-8 w-8 text-olive" />
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-olive" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-olive">${order.amount}</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-olive" />
                Top Selling Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-olive text-cream rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-olive">${product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white border-olive/10">
          <CardHeader>
            <CardTitle className="text-mud font-poppins">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/admin/products"
                className="p-4 bg-white border border-olive/10 rounded-lg hover:bg-cream hover:scale-105 hover:shadow-md hover:border-olive transition-all duration-200 ease-in-out cursor-pointer"
              >
                <Package className="w-8 h-8 text-olive mb-2" />
                <h3 className="font-medium text-mud font-poppins">Add Product</h3>
                <p className="text-sm text-mud/80">Create a new product listing</p>
              </Link>
              <Link
                href="/admin/collections"
                className="p-4 bg-white border border-olive/10 rounded-lg hover:bg-cream hover:scale-105 hover:shadow-md hover:border-olive transition-all duration-200 ease-in-out cursor-pointer"
              >
                <Users className="w-8 h-8 text-olive mb-2" />
                <h3 className="font-medium text-mud font-poppins">Create Collection</h3>
                <p className="text-sm text-mud/80">Organize products into collections</p>
              </Link>
              <Link
                href="/admin/customers"
                className="p-4 bg-white border border-olive/10 rounded-lg hover:bg-cream hover:scale-105 hover:shadow-md hover:border-olive transition-all duration-200 ease-in-out cursor-pointer"
              >
                <ImageIcon className="w-8 h-8 text-olive mb-2" />
                <h3 className="font-medium text-mud font-poppins">Manage Users</h3>
                <p className="text-sm text-mud/80">View and manage customer accounts</p>
              </Link>
              <Link
                href="/"
                className="p-4 bg-white border border-olive/10 rounded-lg hover:bg-cream hover:scale-105 hover:shadow-md hover:border-olive transition-all duration-200 ease-in-out cursor-pointer"
              >
                <Eye className="w-8 h-8 text-olive mb-2" />
                <h3 className="font-medium text-mud font-poppins">View Website</h3>
                <p className="text-sm text-mud/80">See your store from customer perspective</p>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-green-900">All Systems Operational</h3>
                <p className="text-green-700">
                  Your store is running smoothly. Last updated: {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}