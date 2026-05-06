import { getProduct } from '@/app/api/product/product-api';
import ImageGallery from '@/features/products/components/pdp/ImageGallery';
import ProductInfo from '@/features/products/components/pdp/ProductInfo';
import React, { NewLifecycle } from 'react'

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

const mockImage = [
    {
        id: 1,
        productId: 1,
        imageUrl: 'https://down-id.img.susercontent.com/file/id-11134207-81ztl-mf7u6ydk3ifd1c.webp',
        sortOrder: 1,
        altText: 'gambar1'
    },
    {
        id: 2,
        productId: 2,
        imageUrl: 'https://down-id.img.susercontent.com/file/id-11134207-81ztj-mf7u6ydkaj9lce.webp',
        sortOrder: 2,
        altText: 'gambar2'
    },
    {
        id: 3,
        productId: 3,
        imageUrl: 'https://down-id.img.susercontent.com/file/id-11134207-81ztn-mf7u6ydjzaq128.webp',
        sortOrder: 3,
        altText: 'gambar3'
    },
    {
        id: 4,
        productId: 4,
        imageUrl: 'https://down-id.img.susercontent.com/file/id-11134207-81ztj-mf7u6ydk7q4p56.webp',
        sortOrder: 4,
        altText: 'gambar4'
    },
    {
        id: 5,
        productId: 5,
        imageUrl: 'https://down-id.img.susercontent.com/file/id-11134207-81ztl-mf7u6ydk6bk9f5.webp',
        sortOrder: 5,
        altText: 'gambar5'
    }
]

const mockVariants = [
    {
        id: 1,
        productId: 1,
        name: "Coklat",
        price_idr: "50000",
        stock: 1
    },
    {
        id: 2,
        productId: 2,
        name: "Vanilla",
        price_idr: "20000",
        stock: 1
    },
    {
        id: 3,
        productId: 3,
        name: "Strawberry",
        price_idr: "30000",
        stock: 1
    },
    {
        id: 4,
        productId: 4,
        name: "Caramel",
        price_idr: "55000",
        stock: 0
    },
    {
        id: 5,
        productId: 5,
        name: "Coffee Latte",
        price_idr: "15000",
        stock: 1
    },
]

async function page(props: { params: Params }) {
    const {id} = await props.params;
    const res = await getProduct(id)
    const product : Product = res.data

  return (
    <div className='px-28'>
      <p className='text-font-2 text-[var(--color-light-gray)] pb-10'>Home / Products / ${product.name}</p>

      <div className='flex w-full gap-5'>
        <div className='w-[50%]'>
            <ImageGallery images={mockImage}/>
        </div>
        
        <div className='w-[50%]'>
            <ProductInfo name={product.name} description={product.description} price_idr={product.price_idr} stock={product.stock} variants={mockVariants}/>
        </div>
      </div>
      
    </div>
  )
}

export default page
