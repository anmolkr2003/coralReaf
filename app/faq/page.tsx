"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqCategories = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping takes 5-7 business days within the US. Express shipping (2-3 days) and overnight options are available. International shipping takes 10-14 business days.",
        },
        {
          question: "Do you offer free shipping?",
          answer:
            "Yes! We offer free standard shipping on all orders over $75 within the United States. For orders under $75, shipping costs $8.99.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account or using our order tracking page.",
        },
        {
          question: "What if my order arrives damaged?",
          answer:
            "We're sorry if your order arrives damaged! Please contact us within 48 hours with photos of the damage, and we'll send a replacement or full refund immediately.",
        },
      ],
    },
    {
      category: "Products & Customization",
      questions: [
        {
          question: "What materials do you use?",
          answer:
            "All our products are made from 100% organic cotton, hemp blends, or recycled materials. We're committed to sustainable, eco-friendly fabrics that are soft, durable, and kind to the planet.",
        },
        {
          question: "How does the customization process work?",
          answer:
            "Our design studio lets you personalize products in real-time. Choose your product, select colors, add text or upload designs, and see a live preview. Once you're happy, add to cart and we'll create your unique piece.",
        },
        {
          question: "Can I upload my own designs?",
          answer:
            "Yes! You can upload PNG, JPG, or SVG files up to 10MB. For best results, use high-resolution images (300 DPI) and ensure your design fits our print area guidelines.",
        },
        {
          question: "What's the difference between your product lines?",
          answer:
            "Earth Essentials are our classic organic cotton basics, Urban Nature combines street style with sustainability, and Eco Hoodies focus on cozy comfort. All lines share our commitment to sustainable materials.",
        },
      ],
    },
    {
      category: "Sizing & Fit",
      questions: [
        {
          question: "How do I find my size?",
          answer:
            "Check our detailed size guide with measurements for chest, waist, and length. Our products run true to size, but if you're between sizes, we recommend sizing up for a more relaxed fit.",
        },
        {
          question: "What if my item doesn't fit?",
          answer:
            "No worries! We offer free exchanges within 30 days. Just contact us for a return label, and we'll send your new size as soon as we receive the original item.",
        },
        {
          question: "Do you offer plus sizes?",
          answer:
            "Yes! Most of our products are available in sizes XS through 3XL. We're continuously expanding our size range to be more inclusive for all body types.",
        },
      ],
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What's your return policy?",
          answer:
            "We offer 30-day returns on all non-customized items. Items must be unworn, unwashed, and in original condition. Custom items can only be returned if there's a defect or error on our part.",
        },
        {
          question: "How do I return an item?",
          answer:
            "Contact our support team to initiate a return. We'll email you a prepaid return label. Pack the item securely and drop it off at any authorized shipping location.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "Refunds are processed within 3-5 business days after we receive your return. The refund will appear on your original payment method within 5-10 business days.",
        },
      ],
    },
    {
      category: "Sustainability",
      questions: [
        {
          question: "How are your products sustainable?",
          answer:
            "We use only organic, recycled, or sustainably-sourced materials. Our production process is carbon-neutral, we use eco-friendly dyes, and all packaging is recyclable or compostable.",
        },
        {
          question: "What certifications do you have?",
          answer:
            "Our products are GOTS (Global Organic Textile Standard) certified, and we're a certified B-Corporation. Our facilities are Fair Trade certified, ensuring ethical working conditions.",
        },
        {
          question: "How do you offset your carbon footprint?",
          answer:
            "We plant one tree for every order through our partnership with One Tree Planted. We also invest in renewable energy projects and use carbon-neutral shipping methods.",
        },
      ],
    },
  ]

  const allQuestions = faqCategories.flatMap((category, categoryIndex) =>
    category.questions.map((q, questionIndex) => ({
      ...q,
      categoryIndex,
      questionIndex,
      category: category.category,
    })),
  )

  const filteredQuestions = searchQuery
    ? allQuestions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allQuestions

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cream to-olive/5">
        <div className="container mx-auto max-w-4xl text-center">
          {/* <Badge className="mb-6 bg-olive/10 text-olive border-olive/20 text-lg px-4 py-2">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help Center
          </Badge> */}
          <Badge className="mb-6 bg-rose-100 text-primary border-primary/20 text-base px-4 py-2 uppercase hover:text-white">
  <HelpCircle className="w-4 h-4 mr-2" />
            Help Center
</Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
           Frequently Asked  <span className="text-mud block">Questions</span>
          </h1>
          <p className="text-xl text-mud/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find quick answers to common questions about our products, shipping, returns, and sustainability practices.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mud/50 w-5 h-5" />
            <Input
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg border-olive/20 focus:border-olive"
            />
          </div>
        </div>

        {/* FAQ Content */}
        {/* searchQuery ? ( */}
{/* 
           Search Results  */}
        {/* //   <div className="max-w-4xl mx-auto">
        //     <h2 className="text-2xl font-bold text-olive mb-6 font-poppins">
        //       Search Results ({filteredQuestions.length})
        //     </h2>
        //     <div className="space-y-4">
        //       {filteredQuestions.map((item, index) => ( */}
                {/* <Card key={index} className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <button */}
        {/* //               onClick={() => toggleItem(index)}
        //               className="w-full p-6 text-left hover:bg-olive/5 transition-colors"
        //             >
        //               <div className="flex items-center justify-between">
        //                 <div>
        //                   <Badge className="mb-2 bg-olive/10 text-olive text-xs">{item.category}</Badge>
        //                   <h3 className="text-lg font-semibold text-olive">{item.question}</h3>
        //                 </div>
        //                 {openItems.includes(index) ? ( */}
        {/* //                   <ChevronUp className="w-5 h-5 text-olive flex-shrink-0" />
        //                 ) : (
        //                   <ChevronDown className="w-5 h-5 text-olive flex-shrink-0" />
        //                 )}
        //               </div>
        //             </button> */}
        {/* //             {openItems.includes(index) && ( */}
        {/* //               <div className="px-6 pb-6">
        //                 <p className="text-mud/80 leading-relaxed">{item.answer}</p>
        //               </div>
        //             )}
        //           </CardContent>
        //         </Card> */}
        {/* //       ))}
        //     </div>
        //   </div> */}
        {/* // ) : (
          /* Category View */
        //   <div className="max-w-4xl mx-auto">
        //     {faqCategories.map((category, categoryIndex) => (
        //       <div key={categoryIndex} className="mb-12">
        //         <h2 className="text-3xl font-bold text-olive mb-6 font-poppins">{category.category}</h2>
        //         <div className="space-y-4">
        //           {category.questions.map((item, questionIndex) => {
        //             const globalIndex = categoryIndex * 100 + questionIndex
        //             return (
        //               <Card key={questionIndex} className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
        //                 <CardContent className="p-0">
        //                   <button
        //                     onClick={() => toggleItem(globalIndex)}
        //                     className="w-full p-6 text-left hover:bg-olive/5 transition-colors"
        //                   >
        //                     <div className="flex items-center justify-between">
        //                       <h3 className="text-lg font-semibold text-olive pr-4">{item.question}</h3>
        //                       {openItems.includes(globalIndex) ? (
        //                         <ChevronUp className="w-5 h-5 text-olive flex-shrink-0" />
        //                       ) : (
        //                         <ChevronDown className="w-5 h-5 text-olive flex-shrink-0" />
        //                       )}
        //                     </div>
        //                   </button>
        //                   {openItems.includes(globalIndex) && (
        //                     <div className="px-6 pb-6">
        //                       <p className="text-mud/80 leading-relaxed">{item.answer}</p>
        //                     </div>
        //                   )}
        //                 </CardContent>
        //               </Card>
        //             )
        //           })}
        //         </div>
        //       </div>
        //     ))}
        //   </div>
        // )}



        
        searchQuery ? (

  <div className="max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold text-olive mb-6 font-poppins">
      Search Results ({filteredQuestions.length})
    </h2>
    <div className="space-y-4">
      {filteredQuestions.map((item, index) => (
        <Card
          key={index}
          className="bg-rose-100 text-primary border border-primary/20 shadow-lg rounded-lg transition-all"
        >
          <CardContent className="p-0">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left uppercase text-base hover:bg-primary/10 transition-colors rounded-t-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="mb-2 bg-primary/10 text-primary text-xs">{item.category}</Badge>
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                </div>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                )}
              </div>
            </button>
            {openItems.includes(index) && (
              <div className="px-6 pb-6 pt-2 bg-white/70 backdrop-blur-sm rounded-b-lg">
                <p className="text-mud/80 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
) : (
  /* Category View */
  <div className="max-w-4xl mx-auto">
    {faqCategories.map((category, categoryIndex) => (
      <div key={categoryIndex} className="mb-12">
        <h2 className="text-3xl font-bold text-olive mb-6 font-poppins">{category.category}</h2>
        <div className="space-y-4">
          {category.questions.map((item, questionIndex) => {
            const globalIndex = categoryIndex * 100 + questionIndex;
            return (
              <Card
                key={questionIndex}
                className="bg-rose-100 text-primary border border-primary/20 shadow-lg rounded-lg transition-all"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(globalIndex)}
                    className="w-full px-6 py-4 text-left uppercase text-base hover:bg-primary/10 transition-colors rounded-t-lg"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                      {openItems.includes(globalIndex) ? (
                        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  {openItems.includes(globalIndex) && (
                    <div className="px-6 pb-6 pt-2 bg-white/70 backdrop-blur-sm rounded-b-lg">
                      <p className="text-mud/80 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    ))}
  </div>
)}


        {/* Still Need Help */}
      
        <div className="max-w-2xl mx-auto mt-16">
  <Card className="border border-primary/20 shadow-lg bg-olive text-cream text-center rounded-xl">
    <CardContent className="p-8">
      <h3 className="text-2xl font-bold mb-4 font-poppins uppercase tracking-wide text-primary">
        Still Need Help?
      </h3>
      <p className="mb-6 text-cream/90 text-base leading-relaxed">
        Can't find what you're looking for? Our customer support team is here to help!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-rose-100 text-primary hover:bg-rose-200 transition-all duration-200 rounded-full px-8 py-3 uppercase tracking-wide font-semibold"
          asChild
        >
          <Link href="/contact">Contact Support</Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-rose-100 text-cream hover:bg-rose-100 hover:text-primary transition-all duration-200 rounded-full px-8 py-3 uppercase tracking-wide font-semibold"
          asChild
        >
          <Link href="mailto:support@coralreaf.com">Email Us</Link>
        </Button>
      </div>
    </CardContent>
  </Card>
</div>

      </div>
    </div>
  )
}
