// Image paths constants for easy management
export const IMAGES = {
  hero: {
    main: "/images/hero/hero-main.jpg",
    background: "/images/hero/hero-background.jpg",
  },
  products: {
    tshirts: {
      classicTeeOlive: "/images/products/tshirts/classic-tee-olive.jpg",
      classicTeeCream: "/images/products/tshirts/classic-tee-cream.jpg",
      classicTeeMud: "/images/products/tshirts/classic-tee-mud.jpg",
      classicTeeBase: "/images/products/tshirts/classic-tee-base.jpg",
    },
    hoodies: {
      ecoHoodieOlive: "/images/products/hoodies/eco-hoodie-olive.jpg",
      ecoHoodieMud: "/images/products/hoodies/eco-hoodie-mud.jpg",
      ecoHoodieBase: "/images/products/hoodies/eco-hoodie-base.jpg",
    },
    tanks: {
      tankTopBase: "/images/products/tanks/tank-top-base.jpg",
    },
  },
  collections: {
    earthEssentials: "/images/collections/earth-essentials.jpg",
    urbanNature: "/images/collections/urban-nature.jpg",
    ecoHoodies: "/images/collections/eco-hoodies.jpg",
  },
  about: {
    mission: "/images/about/mission.jpg",
    sustainability: "/images/about/sustainability.jpg",
    team: {
      sarahChen: "/images/about/team/sarah-chen.jpg",
      marcusRodriguez: "/images/about/team/marcus-rodriguez.jpg",
      aishaPatel: "/images/about/team/aisha-patel.jpg",
    },
  },
  icons: {
    logo: "/images/icons/logo.svg",
    favicon: "/images/icons/favicon.ico",
  },
  backgrounds: {
    heroBg: "/images/backgrounds/hero-bg.jpg",
    sectionBg: "/images/backgrounds/section-bg.jpg",
  },
}

// Image optimization utilities
export const getOptimizedImageUrl = (path: string, width?: number, height?: number) => {
  // For future integration with image optimization services like Cloudinary
  return path
}

// Placeholder image generator
export const getPlaceholder = (width = 400, height = 400) => {
  return `/placeholder.svg?height=${height}&width=${width}`
}
