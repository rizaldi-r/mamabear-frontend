import { getProduct, getReview } from '@/app/api/product/product-api';
import Description from '@/features/products/components/pdp/Description';
import ImageGallery from '@/features/products/components/pdp/ImageGallery';
import ProductInfo from '@/features/products/components/pdp/ProductInfo';
import Stars from '@/features/products/components/pdp/Stars';
import React from 'react'

export const dynamicParams = true;

type Params = Promise<{ slug: string }>

type Product = {
    id: number,
    name: string,
    slug: string,
    description: string,
    ingredients:string,
    usageInstructions:string
    price_idr: string,
    weight_g: number,
    sku: string,
    stock: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    categoryId: number | null,
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

    const res = await getProduct(slug)
    const product : Product = res.data

    const rev = await getReview(slug)
    const review : Review[] = rev.data.data

    console.log('REV',review)
    
    const image = product.images || []
    const variant = product.variants

  return (
    <div className='lg:px-[200px] px-5'>
      <p className='text-font-2 text-[var(--color-light-gray)] pb-10'>Home / Products / {product.slug}</p>

      <div className='flex lg:flex-row flex-col w-full gap-5'>
        <div className='lg:w-[50%]'>
            <ImageGallery images={image}/>
        </div>
        
        <div className='lg:w-[50%]'>
            <ProductInfo name={product.name} reviews={review}
                        stock={product.stock} variants={variant} 
            />
        </div>
      </div>

    <br/>
      {/* DESCRIPTION */}
      <Description description={product.description ?? 'deskripsi'}
                  ingredients={product.ingredients  ?? 'untuk mengetahui kandungan produk hubungi admin'}
                  usageInstructions={product.usageInstructions  ?? 'untuk mengetahui cara pakai produk hubungi admin'} />

      {/* RATINGS */}
      <div className='flex flex-col px-20 items-center justify-center'>
        <div>
            <p className='text-font-6 text-[var(--color-mama-brown)] font-bold'>4.9</p>
            <Stars rating={4.9}/>
            <p className='text-[var(--color-light-gray)] text-font-1'>10RB+ Penilaian</p>
        </div>
      </div>

      
    </div>
  )
}

export default page
