"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ruler, User, AlertCircle, CheckCircle } from "lucide-react"

export default function SizeGuidePage() {
  const [selectedSize, setSelectedSize] = useState("")

  const sizeCharts = {
    tshirts: {
      name: "T-Shirts & Tank Tops",
      sizes: [
        { size: "XS", chest: "32-34", waist: "26-28", length: "26" },
        { size: "S", chest: "34-36", waist: "28-30", length: "27" },
        { size: "M", chest: "38-40", waist: "32-34", length: "28" },
        { size: "L", chest: "42-44", waist: "36-38", length: "29" },
        { size: "XL", chest: "46-48", waist: "40-42", length: "30" },
        { size: "2XL", chest: "50-52", waist: "44-46", length: "31" },
        { size: "3XL", chest: "54-56", waist: "48-50", length: "32" },
      ],
    },
    hoodies: {
      name: "Hoodies & Sweatshirts",
      sizes: [
        { size: "XS", chest: "34-36", waist: "28-30", length: "25" },
        { size: "S", chest: "36-38", waist: "30-32", length: "26" },
        { size: "M", chest: "40-42", waist: "34-36", length: "27" },
        { size: "L", chest: "44-46", waist: "38-40", length: "28" },
        { size: "XL", chest: "48-50", waist: "42-44", length: "29" },
        { size: "2XL", chest: "52-54", waist: "46-48", length: "30" },
        { size: "3XL", chest: "56-58", waist: "50-52", length: "31" },
      ],
    },
  }

  const measurementTips = [
    {
      title: "Chest/Bust",
      description:
        "Measure around the fullest part of your chest, keeping the tape measure level and snug but not tight.",
      icon: "📏",
    },
    {
      title: "Waist",
      description: "Measure around your natural waistline, which is typically the narrowest part of your torso.",
      icon: "📐",
    },
    {
      title: "Length",
      description:
        "For tops, measure from the highest point of your shoulder down to where you want the garment to end.",
      icon: "📊",
    },
  ]

  const fitGuide = [
    {
      fit: "Relaxed Fit",
      description: "Loose and comfortable with extra room for movement. Perfect for layering.",
      recommendation: "Size up if you prefer an oversized look",
    },
    {
      fit: "Regular Fit",
      description: "Our standard fit that's not too tight or too loose. True to size.",
      recommendation: "Order your normal size",
    },
    {
      fit: "Fitted",
      description: "Closer to the body with a more tailored silhouette.",
      recommendation: "Size up if you're between sizes",
    },
  ]

  return (
    <div className="min-h-screen bg-cream">

      {/* Hero Section */}
      {/* <section className="py-20 px-4 bg-gradient-to-br from-cream to-olive/5">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-olive/10 text-olive border-olive/20 text-lg px-4 py-2">
            <Ruler className="w-4 h-4 mr-2" />
            Perfect Fit
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-olive mb-6 font-poppins">
            Size Guide &<span className="text-mud block">Fit Information</span>
          </h1>
          <p className="text-xl text-mud/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find your perfect fit with our comprehensive size guide. All measurements are in inches and based on body
            measurements, not garment measurements.
          </p>
        </div>

      </section> */}

      <section className="py-20 px-4 bg-gradient-to-br from-cream to-olive/5">
  <div className="container mx-auto max-w-4xl text-center">
    <Badge className="mb-6 bg-rose-100 text-primary border-primary/20 text-lg px-4 py-2 uppercase inline-flex items-center justify-center gap-2 hover:text-white">
      <Ruler className="w-4 h-4" />
      Perfect Fit
    </Badge>
    <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 font-poppins uppercase">
      Size Guide &<span className="text-mud block">Fit Information </span>
    </h1>
    <p className="text-xl text-mud/80 mb-8 max-w-3xl mx-auto leading-relaxed">
      Find your perfect fit with our comprehensive size guide. All measurements are in inches and based on body
      measurements, not garment measurements.
    </p>
  </div>
</section>


      <div className="container mx-auto px-4 py-16 ">
        {/* How to Measure */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl  text-primary font-bold text-olive mb-4 font-poppins">How to Measure</h2>
            <p className="text-lg text-mud/80 max-w-2xl mx-auto">
              For the most accurate fit, measure yourself or a garment that fits you well
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {measurementTips.map((tip, index) => (
              // <Card key={index} className="border-0 shadow-lg bg-white/50 backdrop-blur-sm text-center">
              //   <CardContent className="p-8">
              //     <div className="text-4xl mb-4">{tip.icon}</div>
              //     <h3 className="text-xl font-bold text-olive mb-4 font-poppins">{tip.title}</h3>
              //     <p className="text-mud/80 leading-relaxed">{tip.description}</p>
              //   </CardContent>
              // </Card>
<Card
  key={index}
  className="bg-white/50 border border-primary/20 shadow-lg backdrop-blur-sm text-primary text-center rounded-xl hover:bg-rose-200 transition-colors duration-300"
>
  <CardContent className="p-8">
    <div className="text-4xl mb-4">{tip.icon}</div>
    <h3 className="text-xl font-bold mb-4 font-poppins uppercase text-red-500">
      {tip.title}
    </h3>
    <p className="text-black leading-relaxed">{tip.description}</p>
  </CardContent>
</Card>


            ))}
          </div>

         <div className="bg-rose-100 border border-primary/20 rounded-2xl p-8 text-center text-primary">
  <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
  <h3 className="text-xl font-bold mb-2 font-poppins uppercase">Measurement Tips</h3>
  <p className="text-primary/80 max-w-2xl mx-auto leading-relaxed">
    Use a soft measuring tape and measure over light clothing or undergarments. Keep the tape snug but not
    tight, and ask someone to help you for the most accurate measurements.
  </p>
</div>

        </section>

        {/* Size Charts */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-olive mb-4 font-poppins">Size Charts</h2>
            <p className="text-lg text-mud/80">All measurements are in inches</p>
          </div>

          {/* <Tabs defaultValue="tshirts" className="max-w-6xl mx-auto"> */}
            {/* <TabsList className="grid w-full grid-cols-2 bg-olive/10 mb-8">
              <TabsTrigger value="tshirts" className="text-lg py-3">
                T-Shirts & Tanks
              </TabsTrigger>
              <TabsTrigger value="hoodies" className="text-lg py-3">
                Hoodies & Sweatshirts
              </TabsTrigger>
            </TabsList> */}
            <Tabs defaultValue="tshirts" className="max-w-6xl mx-auto w-full">
  <div className="px-4">
    <TabsList className="grid grid-cols-2 w-full bg-rose-100 border border-primary/20 rounded-full p-2 mb-8 h-14">
      <TabsTrigger
        value="tshirts"
        className="h-full flex items-center justify-center  font-medium rounded-full transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-primary/10 text-sm"
      >
        T-Shirts & Tanks
      </TabsTrigger>
      <TabsTrigger
        value="hoodies"
        className="h-full flex items-center justify-center  font-medium rounded-full transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-primary/10 text-sm"
      >
        Hoodies & Sweatshirts
      </TabsTrigger>
    </TabsList>
  </div>



            {Object.entries(sizeCharts).map(([key, chart]) => (
              <TabsContent key={key} value={key}>
                <Card className="bg-white/50 border border-primary/20 shadow-lg rounded-xl text-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-poppins text-center uppercase">{chart.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-olive/20">
                            <th className="text-left py-4 px-4 font-bold text-olive">Size</th>
                            <th className="text-left py-4 px-4 font-bold text-olive">Chest (inches)</th>
                            <th className="text-left py-4 px-4 font-bold text-olive">Waist (inches)</th>
                            <th className="text-left py-4 px-4 font-bold text-olive">Length (inches)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {chart.sizes.map((size, index) => (
                            <tr
                              key={index}
                              className={`border-b border-olive/10 hover:bg-olive/5 transition-colors cursor-pointer ${
                                selectedSize === size.size ? "bg-olive/10" : ""
                              }`}
                              onClick={() => setSelectedSize(selectedSize === size.size ? "" : size.size)}
                            >
                              <td className="py-4 px-4 font-semibold text-olive">{size.size}</td>
                              <td className="py-4 px-4 text-mud">{size.chest}</td>
                              <td className="py-4 px-4 text-mud">{size.waist}</td>
                              <td className="py-4 px-4 text-mud">{size.length}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-mud/60 mt-4 text-center">
                      Click on a size row to highlight it. Measurements are body measurements, not garment measurements.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

          </Tabs>
        </section>

        {/* Fit Guide */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4 font-poppins">Fit Guide</h2>
            <p className="text-lg text-mud/80 max-w-2xl mx-auto">
              Understanding our different fits to help you choose the right style
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {fitGuide.map((fit, index) => (
              // <Card key={index} className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              //   <CardContent className="p-8">
              //     <h3 className="text-xl font-bold text-olive mb-4 font-poppins">{fit.fit}</h3>
              //     <p className="text-mud/80 mb-4 leading-relaxed">{fit.description}</p>
              //     <div className="bg-olive/5 rounded-lg p-4">
              //       <p className="text-sm font-semibold text-olive">{fit.recommendation}</p>
              //     </div>
              //   </CardContent>
              // </Card>
              <Card key={index} className="bg-white/50 border border-primary/20 shadow-lg rounded-xl text-primary hover:bg-rose-100 transition-colors duration-300">
  <CardContent className="p-8">
    <h3 className="text-xl font-bold mb-4 font-poppins uppercase">{fit.fit}</h3>
    <p className="text-black mb-4 leading-relaxed">{fit.description}</p>
    <div className="bg-primary/10 rounded-lg p-4">
      <p className="text-sm font-semibold text-primary">{fit.recommendation}</p>
    </div>
  </CardContent>
</Card>

            ))}
          </div>
        </section>

        {/* Size Recommendations */}
       

        <Card className="bg-rose-100 border border-primary/20 shadow-lg text-primary text-center rounded-xl">
  <CardContent className="p-8">
    <User className="w-12 h-12 mx-auto mb-4 text-primary" />
    <h3 className="text-2xl font-bold mb-4 font-poppins uppercase">Still Unsure About Your Size?</h3>
    <p className="mb-6 text-black max-w-2xl mx-auto">
      We're here to help! Our customer service team can provide personalized size recommendations based on
      your measurements and fit preferences.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        size="lg"
        className="bg-white text-primary hover:bg-rose-200 border border-primary/20 rounded-full px-8 py-3 uppercase tracking-wide font-semibold"
        asChild
      >
        <Link href="/contact">Get Size Help</Link>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="border-primary text-primary hover:bg-rose-100 hover:text-primary rounded-full px-8 py-3 uppercase tracking-wide font-semibold"
        asChild
      >
        <Link href="mailto:support@coralreaf.com">Email Us</Link>
      </Button>
    </div>
  </CardContent>
</Card>


        {/* Exchange Policy */}
        <section>
          {/* <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-olive mb-4 font-poppins">Free Size Exchanges</h3>
              <p className="text-mud/80 mb-6 max-w-2xl mx-auto leading-relaxed">
                If your item doesn't fit perfectly, we offer free size exchanges within 30 days. Just contact us and
                we'll send you a prepaid return label to exchange for a different size.
              </p>
              <Button size="lg" className="bg-olive hover:bg-olive/90 text-cream rounded-full px-8" asChild>
                <Link href="/returns">Learn About Returns</Link>
              </Button>
            </CardContent>
          </Card> */}
       <Card className="mt-16 bg-rose-100 border border-primary/20 shadow-lg text-primary text-center rounded-xl">
  <CardContent className="p-8">
    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
    <h3 className="text-2xl font-bold mb-4 font-poppins uppercase">Free Size Exchanges</h3>
    <p className="text-primary/80 mb-6 max-w-2xl mx-auto leading-relaxed">
      If your item doesn't fit perfectly, we offer free size exchanges within 30 days. Just contact us and
      we'll send you a prepaid return label to exchange for a different size.
    </p>
    <Button
      size="lg"
      className="bg-white text-primary hover:bg-rose-200 border border-primary/20 rounded-full px-8 py-3 uppercase tracking-wide font-semibold"
      asChild
    >
      <Link href="/returns">Learn About Returns</Link>
    </Button>
  </CardContent>
</Card>


        </section>
      </div>
    </div>
  )
}
