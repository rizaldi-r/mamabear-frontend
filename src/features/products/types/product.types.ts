export type Product = {
    id: number,
    name: string,
    slug: string,
    highlightId: number,
    tags: [],
    description: string,
    ingredients:string,
    usageInstructions:string
    weight_g: number,
    sku: string,
    stock: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    categoryId: number | null,
    highlight: {
      id: number,
      name: string,
      slug: string,
      description: string,
      isActive: boolean
    },
    currentPrice: string,
    originalPrice: string,
    discountPercent: string,
    rating: number,
    reviewsCount: number,
    topReview: Review,
    category: {
        id: number,
        name: string
    },
    images: {
        id: number,
        productId: number,
        imageUrl: string,
        sortOrder: number,
        altText: string | null
    }[],
    variants: {
        id: number,
        productId: number,
        name: string,
        priceIdr: string,
        stock: number
    }[]
}

export type Review = {
  id: number,
  title: string,
  reviewerId: string,
  productId: number,
  rating: number,
  numUpvotes: number,
  description: string,
  imageUrls: [],
  createdAt: Date
}

export type Variant ={
    id: number,
    productId: number,
    name: string,
    priceIdr: string,
    stock: number
}
