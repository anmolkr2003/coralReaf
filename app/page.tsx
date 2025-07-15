"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  useHeroSections,
  useFeaturedCollections,
  useFeaturedProducts,
} from "@/hooks/useDataStore"
import { useCart } from "@/hooks/useCart"
import {
  ArrowRight,
  Leaf,
  Recycle,
  Heart,
  ShoppingCart,
} from "lucide-react"

export default function HomePage() {
  const { heroSections } = useHeroSections()
  const { collections } = useFeaturedCollections()
  const { products } = useFeaturedProducts()
  const { addItem } = useCart()

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
      image: product.images?.[0],
    })
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* ✅ Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/raw/team/Munish.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Bold Looks. Sustainable Roots.
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Fashion that speaks your vibe & respects the planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-white hover:bg-highlight" asChild>
              <Link href="/shop">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/shop">
                Customize Your Style<ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ✅ Features */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Why Coralreaf?</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              We blend high-impact fashion with low-impact materials
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Leaf className="w-8 h-8 text-primary" />,
                title: "Eco-Friendly",
                desc: "Organic cotton, recycled fabrics & planet-first packaging.",
              },
              {
                icon: <Recycle className="w-8 h-8 text-primary" />,
                title: "Circular Fashion",
                desc: "Wear, repair, repeat. Built to last with a return program.",
              },
              {
                icon: <Heart className="w-8 h-8 text-primary" />,
                title: "Ethical Production",
                desc: "Fair wages, ethical factories & global impact.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {icon}
                </div>
                <h3 className="text-2xl font-semibold text-mud mb-3">{title}</h3>
                <p className="text-muted max-w-sm mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Featured Collections */}
      <section className="py-20 px-4 bg-primary/5 transition-all hover:bg-primary/10">
  <div className="container mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-mud mb-4">Featured Collections</h2>
      <p className="text-xl text-muted">
        Curated styles that redefine your wardrobe
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {collections.map((collection) => (
        <Link key={collection.id} href="/shop">
          <Card
            className="group cursor-pointer overflow-hidden border border-border bg-white hover:bg-primary/10 hover:border-primary transition-all shadow-sm"
          >
            <div className="relative h-64">
              <Image
                src={collection.image || "/placeholder.jpg"}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                <div className="text-white">
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-md">{collection.description}</p>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  </div>
</section>


      {/* ✅ Featured Products */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-mud mb-4">Hot Drops</h2>
            <p className="text-xl text-muted">Our most hyped sustainable picks</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="relative group hover:shadow-xl transition-shadow">
                <Link href={`/shop?product=${product.id}`} className="absolute inset-0 z-10" />
                <div className="relative h-64">
                  <Image
                    src={product.images?.[0]?.url || "/images/raw/team/Munish.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-white z-20">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardContent className="p-5 relative z-20">
                  <h3 className="text-lg font-semibold text-mud mb-2">{product.name}</h3>
                  <p className="text-muted mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">${product.price}</span>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                      className="bg-primary hover:bg-highlight text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {product.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/shop">
                View All Products <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
