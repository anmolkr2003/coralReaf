"use client"

import Link from "next/link"
import {
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Image as ImageIcon,
} from "lucide-react"

import { AdminLayout } from "@/components/admin/AdminLayout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOrders, useCustomers, useProducts } from "@/hooks/useDataStore"
import { useReturns } from "@/hooks/useReturns"
import { useState } from "react"

export default function AdminDashboard() {
  const { orders } = useOrders()
  const { customers } = useCustomers()
  const { products } = useProducts()
  const { returns } = useReturns()

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((order) => order.status === "pending").length
  const lowStockProducts = products.filter((product) => product.stockQuantity < 10)
  const recentOrders = orders.slice(0, 5)

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      description: "Total sales this month",
      color: "text-green-600",
    },
    {
      title: "Orders",
      value: orders.length.toString(),
      icon: ShoppingCart,
      description: `${pendingOrders} pending`,
      color: "text-primary",
    },
    {
      title: "Customers",
      value: customers.length.toString(),
      icon: Users,
      description: "Total registered users",
      color: "text-purple-600",
    },
    {
      title: "Products",
      value: products.length.toString(),
      icon: Package,
      description: `${lowStockProducts.length} low stock`,
      color: "text-orange-600",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-mud font-poppins">Admin Dashboard</h1>
          <p className="text-muted font-medium">Welcome back, admin!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition duration-300 hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-muted font-medium">{stat.title}</CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-mud">{stat.value}</div>
                <p className="text-xs text-muted mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders + Low Stock Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="bg-white border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-primary font-poppins">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Recent Orders
              </CardTitle>
              <CardDescription>Latest customer purchases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-cream/30">
                  <div>
                    <p className="font-semibold text-mud">Order #{order.id}</p>
                    <p className="text-sm text-muted">{order.shippingAddress.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                    <Badge
                      variant={order.status === "delivered" ? "default" : "secondary"}
                      className="text-xs capitalize"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card className="bg-white border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-600 font-poppins">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Low Stock Alert
              </CardTitle>
              <CardDescription>Products with less than 10 units in stock</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lowStockProducts.length === 0 ? (
                <p className="text-muted text-center py-4">All products are well stocked!</p>
              ) : (
                lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-white/70">
                    <div>
                      <p className="font-semibold text-mud">{product.name}</p>
                      <p className="text-sm text-muted">{product.category}</p>
                    </div>
                    <div>
                      <Badge variant="destructive" className="text-xs">
                        {product.stockQuantity} left
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-primary font-poppins">Quick Actions</CardTitle>
            <CardDescription>Perform quick tasks and management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  href: "/admin/products",
                  icon: Package,
                  title: "Add Product",
                  desc: "Create a new product",
                },
                {
                  href: "/admin/orders",
                  icon: ShoppingCart,
                  title: "View Orders",
                  desc: "Manage orders",
                },
                {
                  href: "/admin/customers",
                  icon: Users,
                  title: "Manage Users",
                  desc: "Customer accounts",
                },
              ].map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="p-4 bg-white border border-olive/10 rounded-lg hover:bg-cream hover:scale-[1.02] hover:shadow-md hover:border-olive transition-all"
                >
                  <action.icon className="w-7 h-7 text-olive mb-2" />
                  <h3 className="font-semibold text-mud font-poppins">{action.title}</h3>
                  <p className="text-sm text-muted">{action.desc}</p>
                </Link>
              ))}
              {/* Analytics Placeholder */}
              <button className="p-4 border border-border rounded-lg hover:bg-cream/50 transition-all">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-semibold text-mud">View Analytics</p>
              </button>
            </div>
          </CardContent>
        </Card>
        
      </div>
    </AdminLayout>
  )
}
