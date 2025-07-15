"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Recycle, Heart, Users } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: "Sustainable Materials",
      description:
        "We use only organic cotton, hemp, and recycled fibers in our products, ensuring minimal environmental impact.",
    },
    {
      icon: Recycle,
      title: "Zero Waste Production",
      description:
        "Our manufacturing process is designed to eliminate waste, with all scraps recycled into new products.",
    },
    {
      icon: Heart,
      title: "Ethical Manufacturing",
      description:
        "We partner with fair-trade certified facilities that provide safe working conditions and fair wages.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "We believe in building a community of conscious consumers who care about their impact on the world.",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "Founded",
      description: "Coralreaf was born from a vision to make sustainable fashion accessible to everyone.",
    },
    {
      year: "2021",
      title: "First Collection",
      description: "Launched our debut collection of organic cotton basics.",
    },
    {
      year: "2022",
      title: "Customization Platform",
      description: "Introduced our innovative design-your-own platform.",
    },
    {
      year: "2023",
      title: "Carbon Neutral",
      description: "Achieved carbon neutrality across our entire supply chain.",
    },
    {
      year: "2024",
      title: "Global Impact",
      description: "Reached 100,000+ customers worldwide and planted 50,000 trees.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-cream to-white">
        <div className="container mx-auto max-w-4xl text-center">
      <Badge className="mb-6 bg-rose-100 text-primary border-primary/20 text-base px-4 py-2 uppercase hover:text-white">
  Our Story
</Badge>

          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
            Fashion with a <span className="text-mud block">Purpose</span>
          </h1>
          <p className="text-xl text-mud/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            At Coralreaf, we believe your fashion should reflect your values. That’s why we combine stunning design with sustainability.
          </p>
        </div>
      </section>

      {/* ✅ Mission */}
      <section className="py-20 px-4 bg-primary/5 transition-all hover:bg-primary/10">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-lg text-mud/80 mb-6 leading-relaxed">
              We're reshaping the fashion industry through responsible design. Every item is crafted to blend style and sustainability.
            </p>
            <p className="text-lg text-mud/80 mb-8 leading-relaxed">
              From personalized designs to eco-conscious production, we empower individuality while protecting the planet.
            </p>
            <Button size="lg" className="bg-primary hover:bg-highlight text-white rounded-full px-8" asChild>
              <Link href="/shop">Explore Collection</Link>
            </Button>
          </div>
          <div className="relative">
            <Image
              src="/images/raw/team/Munish.jpg"
              alt="Sustainable fashion"
              width={600}
              height={500}
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ✅ Values */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Values</h2>
          <p className="text-lg text-mud/70 mb-12">We walk the talk of sustainability, ethics, and community.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <Card key={i} className="bg-white/60 shadow-md border-0 text-center backdrop-blur">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{value.title}</h3>
                  <p className="text-mud/70">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Timeline
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Our Journey</h2>
          <p className="text-lg text-mud/70 mb-12">How we grew from idea to impact</p>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-primary text-white font-bold rounded-full flex items-center justify-center">
                  {m.year}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-primary">{m.title}</h3>
                  <p className="text-mud/70">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ✅ Impact Stats
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg mb-12 text-white/90">Your purchases help us move the planet forward</p>
          <div className="grid md:grid-cols-4 gap-10">
            {[
              { value: "100K+", label: "Happy Customers" },
              { value: "50K", label: "Trees Planted" },
              { value: "1M+", label: "Plastic Bottles Recycled" },
              { value: "Zero", label: "Waste to Landfill" },
            ].map(({ value, label }, i) => (
              <div key={i}>
                <div className="text-5xl font-extrabold mb-2">{value}</div>
                <p className="text-white/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ✅ Team */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Meet the Team</h2>
          <p className="text-lg text-mud/70 mb-12 max-w-2xl mx-auto">
            The minds shaping Coralreaf’s sustainable mission
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
            {[
              {
                name: "Rahul",
                role: "CEO & Founder",
                image: "/images/raw/team/Rahul.jpg",
                description: "Visionary leader focused on sustainable fashion and strategic growth.",
              },
              {
                name: "Sujal",
                role: "Co-Founder & Designer",
                image: "/images/raw/team/Sujal.jpg",
                description: "Creative force behind brand development and customer engagement.",
              },
              {
                name: "Munish Choudhary",
                role: "Marketing & Modeling Director",
                image: "/images/raw/team/Munish.jpg",
                description: "Leads our campaigns and models Coralreaf's bold identity.",
              },
              {
                name: "Vivek Prabhat",
                role: "Tech & Ops Director",
                image: "/images/raw/team/Vivek.jpg",
                description: "Drives all tech systems, frontend/backend development & logistics.",
              },
            ].map((member, i) => (
              <Card key={i} className="shadow-lg border-0 text-center bg-white/60 backdrop-blur">
                <CardContent className="p-8">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                  />
                  <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
                  <p className="text-mud font-medium">{member.role}</p>
                  <p className="text-sm text-mud/60 mt-2">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ CTA */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Coralreaf Revolution</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Sustainable fashion is the future. Start building your conscious wardrobe today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-muted px-8 py-6 rounded-full font-bold"
              asChild
            >
              <Link href="/customize">Start Designing</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-primary hover:bg-muted px-8 py-6 rounded-full font-bold  "
              asChild
            >
              <Link href="/shop">Shop Collection</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
