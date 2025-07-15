// Updated image paths constants
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
      hempLongSleeve: "/images/products/tshirts/hemp-long-sleeve.jpg",
    },
    hoodies: {
      ecoHoodieOlive: "/images/products/hoodies/eco-hoodie-olive.jpg",
      ecoHoodieMud: "/images/products/hoodies/eco-hoodie-mud.jpg",
      recycledSweatshirt: "/images/products/hoodies/recycled-sweatshirt.jpg",
    },
    tanks: {
      sustainableTank: "/images/products/tanks/sustainable-tank.jpg",
      organicCropTop: "/images/products/tanks/organic-crop-top.jpg",
    },
    accessories: {
      organicToteBag: "/images/products/accessories/organic-tote-bag.jpg",
      recycledBeanie: "/images/products/accessories/recycled-beanie.jpg",
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
}

// Helper function to get image with fallback
export const getImageUrl = (imagePath: string, fallback = "/placeholder.svg?height=400&width=400") => {
  return imagePath || fallback
}
