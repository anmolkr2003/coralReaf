"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  X,
  Home,
  Layers,
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAdmin } = useAuth()

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-primary">Access Denied</h1>
          <p className="text-muted-foreground">You don’t have permission to view this page.</p>
          <Button asChild className="bg-primary hover:bg-highlight text-white rounded-full">
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Collections", href: "/admin/collections", icon: Layers },
    { name: "Inventory", href: "/admin/inventory", icon: Settings },
    { name: "Returns", href: "/admin/returns", icon: Package },
  ]

  return (
    <div className="min-h-screen flex bg-background text-foreground font-poppins">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h2 className="text-lg font-bold text-primary">Admin Panel</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        <div className="px-4 mt-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-sm font-medium text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href="/" onClick={() => setSidebarOpen(false)}>
              <Home className="w-4 h-4 mr-3" />
              Back to Site
            </Link>
          </Button>
        </div>

        <nav className="mt-4 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center px-3 py-2 rounded-md font-medium transition-colors text-sm
                  ${isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-primary/10 hover:text-primary"}
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 w-full px-6 py-4 border-t border-border">
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs">{user?.email}</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-border px-6 flex items-center shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-muted-foreground hover:text-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <span className="ml-2 text-sm text-muted-foreground">Welcome, {user?.name}</span>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 md:p-6 bg-background">{children}</main>
      </div>
    </div>
  )
}
