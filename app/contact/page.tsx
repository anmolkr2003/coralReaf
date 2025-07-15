"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill all required fields.")
      return
    }

    toast.success("Message sent successfully!")
    setFormData({ name: "", email: "", subject: "", message: "", inquiryType: "" })
  }

  return (
    <div className="min-h-screen bg-white text-black font-poppins">
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-rose-100 text-primary border-primary/20 text-base px-4 py-2 uppercase hover:text-white">Get in Touch</Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-red-600">We’d Love to</h1>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-red-600">Hear From You</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Questions about our products, sustainability, or custom designs? Let’s create something great together.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="shadow-md bg-white border border-gray-100">
              <CardHeader>
                <CardTitle className="text-red-600">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    icon: <Mail className="w-5 h-5" />,
                    title: "Email Us",
                    lines: ["hello@coralreaf.com", "support@coralreaf.com"],
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    title: "Call Us",
                    lines: ["+91 7654406307", "Mon–Fri, 9AM–6PM IST"],
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    title: "Visit Us",
                    lines: ["Palam, Sector 7, Dwarka", "New Delhi, India"],
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: "Business Hours",
                    lines: ["Mon–Fri: 9AM–6PM", "Sat: 10AM–4PM", "Sun: Closed"],
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600">{item.title}</h3>
                      {item.lines.map((line, idx) => (
                        <p key={idx} className="text-sm text-gray-600">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}

                {/* WhatsApp */}
                <a href="https://wa.me/917654406307" target="_blank" rel="noopener noreferrer" className="block hover:bg-green-50 p-2 rounded-lg transition">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600">WhatsApp</h3>
                      <p className="text-sm text-gray-600">+91 7654406307</p>
                      <Button size="sm" className="mt-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-1 text-sm">
                        Chat Now
                      </Button>
                    </div>
                  </div>
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-white border border-gray-100">
              <CardHeader>
                <CardTitle className="text-red-600">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: "FAQs", href: "/faq" },
                  { title: "Size Guide", href: "/size-guide" },
                  { title: "Shipping & Returns", href: "/shipping" },
                ].map((item, i) => (
                  <Link key={i} href={item.href} className="block hover:underline text-black">
                    {item.title}
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-md bg-white border border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-red-600 font-semibold">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        placeholder="Your name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-red-600 font-semibold">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-red-600 font-semibold">Inquiry Type</Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["general", "product", "custom", "wholesale", "support", "partnership"].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-red-600 font-semibold">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                      placeholder="Topic"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-red-600 font-semibold">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      placeholder="Tell us more..."
                      className="mt-1 min-h-[120px]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-full py-6 text-base">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFormData({ name: "", email: "", subject: "", message: "", inquiryType: "" })}
                      className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full py-6"
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
