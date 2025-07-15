"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ShippingAddress } from "@/types/order"

interface ShippingAddressFormProps {
  address: Partial<ShippingAddress>
  onChange: (address: Partial<ShippingAddress>) => void
  title?: string
}

const INDIAN_STATES = [
  { value: "AN", label: "Andaman and Nicobar Islands" },
  { value: "AP", label: "Andhra Pradesh" },
  { value: "AR", label: "Arunachal Pradesh" },
  { value: "AS", label: "Assam" },
  { value: "BR", label: "Bihar" },
  { value: "CH", label: "Chandigarh" },
  { value: "CT", label: "Chhattisgarh" },
  { value: "DL", label: "Delhi" },
  { value: "GA", label: "Goa" },
  { value: "GJ", label: "Gujarat" },
  { value: "HR", label: "Haryana" },
  { value: "HP", label: "Himachal Pradesh" },
  { value: "JK", label: "Jammu and Kashmir" },
  { value: "JH", label: "Jharkhand" },
  { value: "KA", label: "Karnataka" },
  { value: "KL", label: "Kerala" },
  { value: "LA", label: "Ladakh" },
  { value: "LD", label: "Lakshadweep" },
  { value: "MP", label: "Madhya Pradesh" },
  { value: "MH", label: "Maharashtra" },
  { value: "MN", label: "Manipur" },
  { value: "ML", label: "Meghalaya" },
  { value: "MZ", label: "Mizoram" },
  { value: "NL", label: "Nagaland" },
  { value: "OR", label: "Odisha" },
  { value: "PY", label: "Puducherry" },
  { value: "PB", label: "Punjab" },
  { value: "RJ", label: "Rajasthan" },
  { value: "SK", label: "Sikkim" },
  { value: "TN", label: "Tamil Nadu" },
  { value: "TS", label: "Telangana" },
  { value: "TR", label: "Tripura" },
  { value: "UP", label: "Uttar Pradesh" },
  { value: "UK", label: "Uttarakhand" },
  { value: "WB", label: "West Bengal" },
]

export function ShippingAddressForm({
  address,
  onChange,
  title = "Shipping Address",
}: ShippingAddressFormProps) {
  const handleChange = (field: keyof ShippingAddress, value: string) => {
    onChange({ ...address, [field]: value })
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={address.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Rahul Sharma"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={address.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+91 98765 43210"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="street">Street Address *</Label>
        <Input
          id="street"
          value={address.street || ""}
          onChange={(e) => handleChange("street", e.target.value)}
          placeholder="123 MG Road"
          required
        />
      </div>

      <div>
        <Label htmlFor="street2">Apartment, landmark, etc. (optional)</Label>
        <Input
          id="street2"
          value={address.street2 || ""}
          onChange={(e) => handleChange("street2", e.target.value)}
          placeholder="Opposite Central Mall"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={address.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Mumbai"
            required
          />
        </div>

        <div>
          <Label htmlFor="state">State *</Label>
          <Select
            value={address.state || ""}
            onValueChange={(value) => handleChange("state", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="pinCode">PIN Code *</Label>
          <Input
            id="pinCode"
            value={address.zipCode || ""}
            onChange={(e) => handleChange("zipCode", e.target.value)}
            placeholder="400001"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="country">Country *</Label>
        <Select
          value={address.country || "IN"}
          onValueChange={(value) => handleChange("country", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IN">India</SelectItem>
            <SelectItem value="US">United States</SelectItem>
            <SelectItem value="CA">Canada</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
