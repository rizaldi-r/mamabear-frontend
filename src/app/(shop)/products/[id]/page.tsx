import { getProduct } from '@/app/api/product/product-api';
import ImageGallery from '@/features/products/components/pdp/ImageGallery';
import ProductInfo from '@/features/products/components/pdp/ProductInfo';
import Stars from '@/features/products/components/pdp/Stars';
import React from 'react'

export const dynamicParams = true;

type Params = Promise<{ id: string }>

type Product = {
    id: number,
    name: string,
    slug: string,
    description: string,
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
        price_idr: string,
        stock: number
    }[]
}

async function page(props: { params: Params }) {
    const {id} = await props.params;
    const res = await getProduct(id)
    const product : Product = res.data
    const image = product.images
    const variant = product.variants

    console.log('PROD',product)

  return (
    <div className='lg:px-[200px] px-5'>
      <p className='text-font-2 text-[var(--color-light-gray)] pb-10'>Home / Products / ${product.slug}</p>

      <div className='flex lg:flex-row flex-col w-full gap-5'>
        <div className='lg:w-[50%]'>
            <ImageGallery images={image}/>
        </div>
        
        <div className='lg:w-[50%]'>
            <ProductInfo name={product.name} price_idr={product.price_idr}
                        stock={product.stock} variants={variant} 
            />
        </div>
      </div>

    <br/>
      {/* DESCRIPTION */}
      <div>
        <p className='text-font-2 font-bold'>Deskripsi</p>
        <hr className='h-1'/>
        <p className='text-font-1 whitespace-pre-line'>{product.description}</p>
      </div>

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
