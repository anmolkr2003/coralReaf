"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"
import { useSiteSettings, useProducts } from "@/hooks/useDataStore"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  Search,
} from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, isAdmin } = useAuth()
  const { itemCount, setIsOpen: setCartOpen } = useCart()
  const { settings } = useSiteSettings()
  const { products } = useProducts()

  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return []
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5)
  }, [products, searchQuery])

  return (
    <nav className="sticky top-0 z-50 bg-white text-foreground shadow-sm border-b border-border font-poppins">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-extrabold text-primary"
          >
            {settings?.siteName || "Coralreaf"}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {["shop", "customize", "about", "contact"].map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className="text-sm font-semibold text-muted hover:text-primary transition-colors tracking-wide"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}

            {/* Search */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowResults(true)
                }}
                onBlur={() => setTimeout(() => setShowResults(false), 150)}
                className="pl-10 bg-white border border-border focus:ring-primary text-sm"
              />

              {showResults && filteredProducts.length > 0 && (
                <div className="absolute mt-2 w-full bg-white border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop?search=${encodeURIComponent(product.name)}`}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-gray-100"
                      onClick={() => setSearchQuery("")}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCartOpen(true)}
              className="relative text-muted hover:text-primary"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center">
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* User Dropdown */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted hover:text-primary">
                    <User className="h-5 w-5 mr-1" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="text-sm font-medium text-foreground">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="text-sm font-medium text-foreground">Orders</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="text-sm font-medium text-foreground">
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-sm font-medium text-foreground"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild className="text-muted hover:text-primary">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button size="sm" className="bg-primary hover:bg-highlight text-white text-xs rounded-md" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setCartOpen(true)} className="relative text-muted hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center">
                  {itemCount}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-muted hover:text-primary">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 px-4 space-y-3">
            {["shop", "customize", "about", "contact"].map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className="text-sm font-semibold text-muted hover:text-primary block"
                onClick={() => setIsOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}

            <div className="pt-4 border-t border-border space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-muted">Signed in as {user?.name}</div>
                  <Link href="/profile" className="text-sm font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Profile</Link>
                  <Link href="/orders" className="text-sm font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Orders</Link>
                  {isAdmin && (
                    <Link href="/admin" className="text-sm font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
                  )}
                  <button onClick={() => { signOut(); setIsOpen(false) }} className="text-left text-sm font-medium text-foreground hover:text-primary">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="text-sm text-muted hover:text-primary block" onClick={() => setIsOpen(false)}>Sign In</Link>
                  <Link href="/auth/signup" className="text-sm bg-primary text-white px-4 py-2 rounded-md block text-center hover:bg-highlight" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
