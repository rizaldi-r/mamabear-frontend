import { getReview } from '@/app/api/product/product-api';
import ReviewCard from '@/features/products/components/pdp/ReviewCard';
import { Review } from '@/features/products/types/product.types';
import React from 'react'

export const dynamicParams = true;

type Params = Promise<{ slug: string }>

async function page(props: { params: Params }) {
    const {slug} = await props.params;

    const rev = await getReview(slug)
    const review : Review[] = rev.data.data

    console.log(review)

  return (
    <div className='lg:px-[200px] px-5 '>
      <p className='text-font-4 text-[var(--mama-brown)] font-bold'>Penilaian dan Ulasan</p>
      <p className='text-[var(--color-light-gray)] text-font-1'>{review.length} Penilaian</p>
     {review.length > 0 && <>
      {review.map((r)=>(
        <ReviewCard key={r.id} Review={r} slug={slug}/>
      ))}
     </>}
    </div>
  )
}

export default page
