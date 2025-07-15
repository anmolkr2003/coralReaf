// app/user/dashboard/layout.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const navItems = [
  { name: "Dashboard", href: "/user/dashboard" },
  { name: "Orders", href: "/user/dashboard/orders" },
  { name: "Profile", href: "/user/dashboard/profile" },
]

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border p-6">
        <h2 className="text-2xl font-bold text-primary mb-6">My Account</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "block px-4 py-2 rounded-md text-mud hover:bg-primary/10",
                pathname === item.href && "bg-primary text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-cream overflow-y-auto">{children}</main>
    </div>
  )
}
