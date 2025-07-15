"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted/20 text-foreground py-12 px-6 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Description */}
          <div>
            <h3 className="text-primary font-semibold text-lg mb-3 font-primary">Coralreaf</h3>
            <p className="text-sm text-mud/70 leading-relaxed">
              Sustainable fashion that lets you express your unique style while caring for our planet.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-base font-semibold text-primary mb-3 uppercase tracking-wide">Shop</h4>
            <ul className="space-y-2 text-sm text-mud/70">
              {[
                ["All Products", "/shop"],
                ["T-Shirts", "/shop?category=tshirts"],
                ["Hoodies", "/shop?category=hoodies"],
                ["Accessories", "/shop?category=accessories"],
              ].map(([name, href]) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="hover:text-primary underline underline-offset-4 transition-all hover:no-underline"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-base font-semibold text-primary mb-3 uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm text-mud/70">
              {[
                ["About Us", "/about"],
                ["Contact", "/contact"],
                ["FAQ", "/faq"],
                ["Sustainability", "/sustainability"],
              ].map(([name, href]) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="hover:text-primary underline underline-offset-4 transition-all hover:no-underline"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-base font-semibold text-primary mb-3 uppercase tracking-wide">Support</h4>
            <ul className="space-y-2 text-sm text-mud/70">
              {[
                ["Size Guide", "/size-guide"],
                ["Shipping Info", "/shipping"],
                ["Returns", "/returns"],
                ["Track Order", "/track-order"],
              ].map(([name, href]) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="hover:text-primary underline underline-offset-4 transition-all hover:no-underline"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 border-t border-border pt-5 text-center text-xs text-mud/50">
          <p>© 2025 Coralreaf. All rights reserved. Made with 🌱 for a sustainable future.</p>
        </div>
      </div>
    </footer>
  )
}
