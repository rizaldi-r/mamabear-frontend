import { getProduct, getReview } from '@/app/api/product/product-api';
import Description from '@/features/products/components/pdp/Description';
import ImageGallery from '@/features/products/components/pdp/ImageGallery';
import ProductInfo from '@/features/products/components/pdp/ProductInfo';
import RelatedProduct from '@/features/products/components/pdp/RelatedProduct';
import Stars from '@/features/products/components/pdp/Stars';
import { Product, Review } from '@/features/products/types/product.types';
import Link from 'next/link';
import React from 'react'

export const dynamicParams = true;

type Params = Promise<{ slug: string }>

async function page(props: { params: Params }) {
    const {slug} = await props.params;

    const res = await getProduct(slug)
    const product : Product = res.data

    const rev = await getReview(slug)
    const review : Review[] = rev.data.data || []

    const bestReview : Review = review.reduce((prev, current)=>{
      return current.numUpvotes > prev.numUpvotes ? current : prev
    })

    const avgReview = review.length > 0 ? review.reduce((sum, n)=> sum + n.rating, 0)/review.length : 0

    const image = product.images || []

  return (
    <div className='lg:px-[200px] px-5 flex flex-col gap-5'>
      <p className='text-font-2 text-[var(--color-light-gray)]'>Home / Products / {product.slug}</p>

      <div className='flex lg:flex-row flex-col w-full gap-5'>
        <div className='lg:w-[50%]'>
            <ImageGallery images={image}/>
        </div>
        
        <div className='lg:w-[50%]'>
            <ProductInfo product={product} avgReview={avgReview} totalReview={review.length}/>
        </div>
      </div>


      {/* DESCRIPTION */}
      <Description description={product.description ?? 'deskripsi'}
                  ingredients={product.ingredients  ?? 'untuk mengetahui kandungan produk hubungi admin'}
                  usageInstructions={product.usageInstructions  ?? 'untuk mengetahui cara pakai produk hubungi admin'} />

      <br/>
      
      {/* RATINGS */}
      <div>
        <p className='text-font-4 text-[var(--mama-brown)] font-bold'>Reviews</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <p className='text-font-4 text-[var(--mama-hot-pink)] font-bold'>{avgReview.toFixed(1)}</p>
            <Stars rating={avgReview}/>
            <p className='text-[var(--color-light-gray)] text-font-1'>{review.length} Penilaian</p>
          </div>

          <Link href={`/products/${slug}/review`}>Lihat seluruh penilaian</Link>
        </div>
      </div>

      {/* BEST REVIEW */}
      <div className='flex flex-col'>
        <p className='font-bold'>{bestReview.reviewerId}</p>
        <Stars rating={bestReview.rating}/>
        <p>{bestReview.title}</p>
        <p>{bestReview.description}</p>
      </div>

      <hr className='border-gray-300'/>

      <div className='flex flex-col items-center gap-5'>
        <p className='text-font-4 text-[var(--mama-brown)] font-bold'>Produk Lainnya</p>
        <RelatedProduct slug={slug}/>
      </div>
      
    </div>
  )
}

export default page
