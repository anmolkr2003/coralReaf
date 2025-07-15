"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Star, ThumbsUp, ThumbsDown, Camera, Filter, ChevronDown } from "lucide-react"
import type { ProductReview, ReviewStats } from "@/types/product"
import Image from "next/image"

interface ProductReviewsProps {
  reviews: ProductReview[]
  reviewStats: ReviewStats
  productId: string
  canReview?: boolean
  userPurchased?: boolean
}

export function ProductReviews({
  reviews,
  reviewStats,
  productId,
  canReview = false,
  userPurchased = false,
}: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [filterRating, setFilterRating] = useState("all")
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    title: "",
    comment: "",
    pros: "",
    cons: "",
    size: "",
    color: "",
    fit: "true" as "small" | "true" | "large",
    quality: 0,
    value: 0,
    comfort: 0,
    style: 0,
    images: [] as File[],
  })

  const handleStarClick = (rating: number, field: "rating" | "quality" | "value" | "comfort" | "style") => {
    setReviewForm((prev) => ({ ...prev, [field]: rating }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setReviewForm((prev) => ({ ...prev, images: [...prev.images, ...files].slice(0, 5) }))
  }

  const handleSubmitReview = async () => {
    try {
      const formData = new FormData()
      formData.append("productId", productId)
      formData.append("rating", reviewForm.rating.toString())
      formData.append("title", reviewForm.title)
      formData.append("comment", reviewForm.comment)
      formData.append("pros", reviewForm.pros)
      formData.append("cons", reviewForm.cons)
      formData.append("size", reviewForm.size)
      formData.append("color", reviewForm.color)
      formData.append("fit", reviewForm.fit)
      formData.append("quality", reviewForm.quality.toString())
      formData.append("value", reviewForm.value.toString())
      formData.append("comfort", reviewForm.comfort.toString())
      formData.append("style", reviewForm.style.toString())

      reviewForm.images.forEach((image, index) => {
        formData.append(`image-${index}`, image)
      })

      const response = await fetch("/api/reviews", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setShowReviewForm(false)
        setReviewForm({
          rating: 0,
          title: "",
          comment: "",
          pros: "",
          cons: "",
          size: "",
          color: "",
          fit: "true",
          quality: 0,
          value: 0,
          comfort: 0,
          style: 0,
          images: [],
        })
        // Refresh reviews
        window.location.reload()
      }
    } catch (error) {
      console.error("Error submitting review:", error)
    }
  }

  const filteredReviews = reviews
    .filter((review) => filterRating === "all" || review.rating.toString() === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "highest":
          return b.rating - a.rating
        case "lowest":
          return a.rating - b.rating
        case "helpful":
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

  const StarRating = ({
    rating,
    onRate,
    size = "w-5 h-5",
  }: { rating: number; onRate?: (rating: number) => void; size?: string }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate?.(star)}
          className={`${size} ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          } ${onRate ? "cursor-pointer hover:text-yellow-300" : ""}`}
          disabled={!onRate}
        >
          <Star className={size} />
        </button>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-olive mb-2">{reviewStats.average.toFixed(1)}</div>
              <StarRating rating={Math.floor(reviewStats.average)} />
              <div className="text-sm text-gray-600 mt-2">
                Based on {reviewStats.total} review{reviewStats.total !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${reviewStats.total > 0 ? (reviewStats.distribution[rating as keyof typeof reviewStats.distribution] / reviewStats.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {reviewStats.distribution[rating as keyof typeof reviewStats.distribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Aspect Ratings */}
          <Separator className="my-6" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(reviewStats.aspects).map(([aspect, rating]) => (
              <div key={aspect} className="text-center">
                <div className="text-lg font-semibold text-olive">{rating.toFixed(1)}</div>
                <StarRating rating={Math.floor(rating)} size="w-3 h-3" />
                <div className="text-xs text-gray-600 mt-1 capitalize">{aspect}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Write Review Button */}
      {canReview && userPurchased && (
        <Card>
          <CardContent className="p-4">
            <Button onClick={() => setShowReviewForm(!showReviewForm)} className="w-full bg-olive hover:bg-olive/90">
              Write a Review
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write Your Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Rating */}
            <div>
              <Label className="text-base font-medium mb-3 block">Overall Rating *</Label>
              <StarRating rating={reviewForm.rating} onRate={(rating) => handleStarClick(rating, "rating")} />
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="review-title">Review Title *</Label>
              <Input
                id="review-title"
                placeholder="Summarize your experience"
                value={reviewForm.title}
                onChange={(e) => setReviewForm((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>

            {/* Comment */}
            <div>
              <Label htmlFor="review-comment">Your Review *</Label>
              <Textarea
                id="review-comment"
                placeholder="Tell others about your experience with this product"
                rows={4}
                value={reviewForm.comment}
                onChange={(e) => setReviewForm((prev) => ({ ...prev, comment: e.target.value }))}
              />
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="review-pros">What did you like?</Label>
                <Textarea
                  id="review-pros"
                  placeholder="List the positives..."
                  rows={3}
                  value={reviewForm.pros}
                  onChange={(e) => setReviewForm((prev) => ({ ...prev, pros: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="review-cons">What could be improved?</Label>
                <Textarea
                  id="review-cons"
                  placeholder="List areas for improvement..."
                  rows={3}
                  value={reviewForm.cons}
                  onChange={(e) => setReviewForm((prev) => ({ ...prev, cons: e.target.value }))}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="review-size">Size Purchased</Label>
                <Select
                  value={reviewForm.size}
                  onValueChange={(value) => setReviewForm((prev) => ({ ...prev, size: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                    <SelectItem value="XXL">XXL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="review-color">Color Purchased</Label>
                <Input
                  id="review-color"
                  placeholder="e.g., Navy Blue"
                  value={reviewForm.color}
                  onChange={(e) => setReviewForm((prev) => ({ ...prev, color: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="review-fit">How does it fit?</Label>
                <Select
                  value={reviewForm.fit}
                  onValueChange={(value: "small" | "true" | "large") =>
                    setReviewForm((prev) => ({ ...prev, fit: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Runs Small</SelectItem>
                    <SelectItem value="true">True to Size</SelectItem>
                    <SelectItem value="large">Runs Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Detailed Ratings */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Rate Different Aspects</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: "quality", label: "Quality" },
                  { key: "value", label: "Value" },
                  { key: "comfort", label: "Comfort" },
                  { key: "style", label: "Style" },
                ].map(({ key, label }) => (
                  <div key={key} className="text-center">
                    <Label className="text-sm mb-2 block">{label}</Label>
                    <StarRating
                      rating={reviewForm[key as keyof typeof reviewForm] as number}
                      onRate={(rating) => handleStarClick(rating, key as "quality" | "value" | "comfort" | "style")}
                      size="w-4 h-4"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <Label className="text-base font-medium mb-3 block">Add Photos (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="review-images"
                  onChange={handleImageUpload}
                />
                <label htmlFor="review-images" className="cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">
                    Upload photos of the product
                    <br />
                    <span className="text-xs">Up to 5 images, max 5MB each</span>
                  </div>
                </label>
              </div>

              {reviewForm.images.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {reviewForm.images.map((image, index) => (
                    <div key={index} className="relative aspect-square bg-gray-100 rounded">
                      <img
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        onClick={() =>
                          setReviewForm((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index),
                          }))
                        }
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowReviewForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReview}
                disabled={!reviewForm.rating || !reviewForm.title || !reviewForm.comment}
                className="flex-1 bg-olive hover:bg-olive/90"
              >
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">No reviews match your criteria.</div>
            </CardContent>
          </Card>
        ) : (
          filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center">
                      {review.userAvatar ? (
                        <Image
                          src={review.userAvatar || "/placeholder.svg"}
                          alt={review.userName}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-olive font-medium">{review.userName.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.userName}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={review.rating} size="w-3 h-3" />
                        <span className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  {(review.size || review.color) && (
                    <div className="text-sm text-gray-600">
                      {review.size && <span>Size: {review.size}</span>}
                      {review.size && review.color && <span> • </span>}
                      {review.color && <span>Color: {review.color}</span>}
                    </div>
                  )}
                </div>

                <h4 className="font-semibold mb-2">{review.title}</h4>
                <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                {/* Pros and Cons */}
                {(review.pros?.length || review.cons?.length) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {review.pros?.length && (
                      <div>
                        <div className="text-sm font-medium text-green-700 mb-2">👍 Pros</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {review.pros.map((pro, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {review.cons?.length && (
                      <div>
                        <div className="text-sm font-medium text-red-700 mb-2">👎 Cons</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {review.cons.map((con, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span className="text-red-500 mt-1">•</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Detailed Ratings */}
                {(review.quality || review.value || review.comfort || review.style) && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    {[
                      { key: "quality", label: "Quality", value: review.quality },
                      { key: "value", label: "Value", value: review.value },
                      { key: "comfort", label: "Comfort", value: review.comfort },
                      { key: "style", label: "Style", value: review.style },
                    ]
                      .filter((item) => item.value)
                      .map(({ key, label, value }) => (
                        <div key={key} className="text-center">
                          <div className="text-xs text-gray-600 mb-1">{label}</div>
                          <StarRating rating={value ?? 0} size="w-3 h-3" />
                        </div>
                      ))}
                  </div>
                )}

                {/* Fit Information */}
                {review.fit && (
                  <div className="mb-4">
                    <span className="text-sm font-medium">Fit: </span>
                    <Badge
                      variant={review.fit === "true" ? "default" : "secondary"}
                      className={
                        review.fit === "small"
                          ? "bg-blue-100 text-blue-800"
                          : review.fit === "large"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {review.fit === "small" ? "Runs Small" : review.fit === "large" ? "Runs Large" : "True to Size"}
                    </Badge>
                  </div>
                )}

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="mb-4">
                    <div className="grid grid-cols-4 gap-2">
                      {review.images.map((image, index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden">
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.alt}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Helpful Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-olive">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600">
                      <ThumbsDown className="w-4 h-4" />
                      Not Helpful ({review.notHelpful})
                    </button>
                  </div>
                  <button className="text-sm text-gray-600 hover:text-olive">Report</button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredReviews.length > 0 && filteredReviews.length < reviews.length && (
        <div className="text-center">
          <Button variant="outline" className="bg-transparent">
            <ChevronDown className="w-4 h-4 mr-2" />
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  )
}
