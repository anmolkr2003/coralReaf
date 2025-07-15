// Declare ProductVariant and CustomizationOption interfaces or import them if they are defined elsewhere
type ProductVariant = {}

type CustomizationOption = {}

export interface CustomizationState {
  productId: string
  variant: ProductVariant
  customizations: Record<string, CustomizationValue>
  preview?: CustomizationPreview
  totalPrice: number
}

export interface CustomizationValue {
  type: string
  value: string | number
  option?: CustomizationOption
  position?: string
  font?: string
  color?: string
  size?: number
  price: number
}

export interface CustomizationPreview {
  baseImage: string
  overlays: PreviewOverlay[]
  canvasData?: any
}

export interface PreviewOverlay {
  type: "text" | "image" | "embroidery"
  content: string
  position: { x: number; y: number }
  style: {
    fontSize?: number
    fontFamily?: string
    color?: string
    rotation?: number
    scale?: number
  }
  bounds: { width: number; height: number }
}

export interface TextCustomization {
  text: string
  font: string
  size: number
  color: string
  position: string
  maxLength: number
  allowedCharacters?: string
}

export interface EmbroideryCustomization {
  text: string
  font: string
  color: string
  position: string
  stitchType: "satin" | "fill" | "outline"
  density: number
}
