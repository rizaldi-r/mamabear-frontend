import { getReview } from '@/app/api/product/product-api';
import React from 'react'

export const dynamicParams = true;

type Params = Promise<{ slug: string }>

type Review = {
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

async function page(props: { params: Params }) {
    const {slug} = await props.params;

    const rev = await getReview(slug)
    const review : Review[] = rev.data.data

    console.log(review)

  return (
    <div>
     <p></p>
    </div>
  )
}

export default page
