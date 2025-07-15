import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, Globe, Clock, Shield, RefreshCw } from "lucide-react"

export default function ShippingPage() {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "5-7 Business Days",
      cost: "Free on orders $75+, otherwise $8.99",
      description: "Our most popular shipping option with reliable delivery times.",
      icon: Truck,
    },
    {
      name: "Express Shipping",
      time: "2-3 Business Days",
      cost: "$14.99",
      description: "Faster delivery for when you need your items quickly.",
      icon: Package,
    },
    {
      name: "Overnight Shipping",
      time: "1 Business Day",
      cost: "$24.99",
      description: "Next-day delivery available for urgent orders.",
      icon: Clock,
    },
    {
      name: "International Shipping",
      time: "10-14 Business Days",
      cost: "Calculated at checkout",
      description: "We ship worldwide with tracking and insurance included.",
      icon: Globe,
    },
  ]

  const returnPolicy = [
    {
      title: "30-Day Returns",
      description: "Return any non-customized item within 30 days of delivery for a full refund.",
      icon: RefreshCw,
    },
    {
      title: "Free Return Shipping",
      description: "We provide prepaid return labels for all returns within the US.",
      icon: Truck,
    },
    {
      title: "Quality Guarantee",
      description: "If there's a defect or error, we'll replace or refund immediately.",
      icon: Shield,
    },
  ]

  const internationalCountries = [
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Netherlands",
    "Sweden",
    "Denmark",
    "Norway",
    "Switzerland",
    "Austria",
    "Belgium",
    "Italy",
    "Spain",
    "Portugal",
    "Ireland",
    "New Zealand",
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cream to-olive/5">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-rose-100 text-primary border-primary/20 text-base px-4 py-2 uppercase hover:text-white">
            <Truck className="w-4 h-4 mr-2" />
            Shipping & Returns
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 font-poppins">
            Shipping Information &<span className="text-mud block">Return Policy</span>
          </h1>
          <p className="text-xl text-mud/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Fast, reliable shipping with eco-friendly packaging. Easy returns and exchanges to ensure you love your
            purchase.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Shipping Options */}
        <section className="mb-20">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-primary mb-4 font-poppins">Shipping Options</h2>
    <p className="text-lg text-black max-w-2xl mx-auto">Choose the shipping speed that works best for you</p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {shippingOptions.map((option, index) => (
      <Card
        key={index}
        className="bg-white border border-primary/20 shadow-lg text-center rounded-xl transition-all hover:bg-rose-100 hover:shadow-xl"
      >
        <CardContent className="p-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <option.icon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2 font-poppins">{option.name}</h3>
          <p className="text-lg font-semibold text-primary/80 mb-2">{option.time}</p>
          <p className="text-primary font-bold mb-4">{option.cost}</p>
          <p className="text-sm text-primary/70 leading-relaxed">{option.description}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</section>


        {/* Shipping Details */}
        {/* <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-olive font-poppins">Domestic Shipping (US)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-olive/5 rounded-lg p-4">
                  <h4 className="font-bold text-olive mb-2">Free Shipping Threshold</h4>
                  <p className="text-mud/80">
                    Orders $75 and above qualify for free standard shipping within the United States.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-olive mb-2">Processing Time</h4>
                  <p className="text-mud/80">
                    Orders are processed within 1-2 business days. Custom items may take 3-5 business days to produce.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-olive mb-2">Tracking</h4>
                  <p className="text-mud/80">
                    All orders include tracking information sent to your email once shipped.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-olive mb-2">Delivery Areas</h4>
                  <p className="text-mud/80">
                    We ship to all 50 US states, including Alaska and Hawaii. PO Boxes accepted.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-olive font-poppins">International Shipping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-olive/5 rounded-lg p-4">
                  <h4 className="font-bold text-olive mb-2">Shipping Costs</h4>
                  <p className="text-mud/80">
                    International shipping costs are calculated at checkout based on destination and weight.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-olive mb-2">Customs & Duties</h4>
                  <p className="text-mud/80">
                    Customers are responsible for any customs duties, taxes, or fees imposed by their country.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-olive mb-2">Delivery Time</h4>
                  <p className="text-mud/80">
                    International orders typically arrive within 10-14 business days, depending on customs processing.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-olive mb-2">Countries We Ship To</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {internationalCountries.slice(0, 6).map((country, index) => (
                      <Badge key={index} className="bg-olive/10 text-olive text-xs">
                        {country}
                      </Badge>
                    ))}
                    <Badge className="bg-olive/10 text-olive text-xs">+{internationalCountries.length - 6} more</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section> */}

<section className="mb-16">
  <div className="grid lg:grid-cols-2 gap-12">
    {/* Domestic Shipping */}
    <Card className="border border-primary/20 shadow-lg bg-white text-primary rounded-xl hover:bg-rose-50 transition">
      <CardHeader>
        <CardTitle className="text-2xl text-primary font-poppins">Domestic Shipping (US)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-primary/5 rounded-lg p-4">
          <h4 className="font-bold text-primary mb-2">Free Shipping Threshold</h4>
          <p className="text-black">
            Orders $75 and above qualify for free standard shipping within the United States.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-2">Processing Time</h4>
          <p className="text-black">
            Orders are processed within 1-2 business days. Custom items may take 3-5 business days to produce.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-2">Tracking</h4>
          <p className="text-black">
            All orders include tracking information sent to your email once shipped.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-2">Delivery Areas</h4>
          <p className="text-black">
            We ship to all 50 US states, including Alaska and Hawaii. PO Boxes accepted.
          </p>
        </div>
      </CardContent>
    </Card>

    {/* International Shipping */}
    <Card className="border border-primary/20 shadow-lg bg-white text-primary rounded-xl hover:bg-rose-50 transition">
      <CardHeader>
        <CardTitle className="text-2xl text-primary font-poppins">International Shipping</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-primary/5 rounded-lg p-4">
          <h4 className="font-bold text-primary mb-2">Shipping Costs</h4>
          <p className="text-black">
            International shipping costs are calculated at checkout based on destination and weight.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-2">Customs & Duties</h4>
          <p className="text-black">
            Customers are responsible for any customs duties, taxes, or fees imposed by their country.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-2">Delivery Time</h4>
          <p className="text-black">
            International orders typically arrive within 10–14 business days, depending on customs processing.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-2">Countries We Ship To</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {internationalCountries.slice(0, 6).map((country, index) => (
              <Badge key={index} className="bg-primary/10 text-primary text-xs hover:text-white">
                {country}
              </Badge>
            ))}
            <Badge className="bg-primary/10 text-primary text-xs hover:text-white">
              +{internationalCountries.length - 6} more
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</section>

        {/* Return Policy */}
      <section className="mb-16">
  {/* Heading */}
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-primary mb-4 font-poppins">Return Policy</h2>
    <p className="text-lg text-black max-w-2xl mx-auto">
      We want you to love your purchase. If you're not completely satisfied, we make returns easy.
    </p>
  </div>

  {/* Return Cards */}
  <div className="grid md:grid-cols-3 gap-8 mb-12">
    {returnPolicy.map((policy, index) => (
      <Card key={index} className="border border-primary/20 shadow-lg bg-white hover:bg-rose-50 text-center transition rounded-xl">
        <CardContent className="p-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <policy.icon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-4 font-poppins">{policy.title}</h3>
          <p className="text-black leading-relaxed">{policy.description}</p>
        </CardContent>
      </Card>
    ))}
  </div>

  {/* Return Process */}
  <Card className="border border-primary/10 shadow-lg bg-primary/5 rounded-xl">
    <CardContent className="p-8">
      <h3 className="text-2xl font-bold text-primary mb-6 font-poppins text-center">Return Process</h3>
      <div className="grid md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div className="text-center" key={i}>
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              {i + 1}
            </div>
            <h4 className="font-bold text-primary mb-2">
              {["Contact Us", "Get Label", "Ship Item", "Get Refund"][i]}
            </h4>
            <p className="text-sm text-primary/80">
              {[
                "Email us or use our contact form to initiate a return",
                "We'll email you a prepaid return shipping label",
                "Package the item and drop it off at any shipping location",
                "Receive your refund within 3-5 business days"
              ][i]}
            </p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</section>


        {/* Important Notes */}
      <section className="mb-16">
  <Card className="border border-primary/10 shadow-lg bg-white/60 backdrop-blur-sm rounded-xl">
    <CardHeader>
      <CardTitle className="text-2xl text-primary font-poppins text-center">Important Notes</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-bold text-primary mb-3">Custom Items</h4>
          <p className="text-black mb-4">
            Personalized and custom-designed items can only be returned if there's a defect or error on our part.
            Please double-check your customization before ordering.
          </p>

          <h4 className="font-bold text-primary mb-3">Return Condition</h4>
          <p className="text-black">
            Items must be unworn, unwashed, and in original condition with tags attached. Items that show signs of wear or damage cannot be accepted for return.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-3">Exchanges</h4>
          <p className="text-black">
            We offer free size exchanges within 30 days. Color exchanges are subject to availability and may require additional processing time.
          </p>

          <h4 className="font-bold text-primary mt-3 mb-3">Refund Timeline</h4>
          <p className="text-black">
            Refunds are processed within 3-5 business days after we receive your return. It may take 5-10 additional business days for the refund to appear on your statement.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</section>


        {/* Contact Support */}
     <section>
  <Card className="border border-primary/20 shadow-lg bg-primary text-white text-center rounded-xl">
    <CardContent className="p-8">
      <Package className="w-12 h-12 mx-auto mb-4 text-white" />
      <h3 className="text-2xl font-bold mb-4 font-poppins">Need Help with Shipping or Returns?</h3>
      <p className="mb-6 text-white/90 max-w-2xl mx-auto">
        Our customer service team is here to help with any shipping questions, return requests, or order tracking needs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold"
          asChild
        >
          <Link href="/contact">Contact Support</Link>
        </Button>
     <Button
  variant="outline"
  size="lg"
  className="border-white text-black hover:bg-white hover:text-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 ease-in-out rounded-full px-8 font-semibold"
  asChild
>
  <Link href="/track-order">Track Your Order</Link>
</Button>

      </div>
    </CardContent>
  </Card>
</section>

      </div>
    </div>
  )
}
