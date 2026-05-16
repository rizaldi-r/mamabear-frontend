import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '../../types/product.types'
import { getAllProduct } from '@/app/api/product/product-api'

interface Props {
    slug : string
}

async function RelatedProduct({slug}:Props) {

  const res = await getAllProduct()
  const product : Product[] = res.data.data
  console.log('P', product)

  return (
    <div className='flex w-full overflow-x-auto gap-4'>
        {product.length >0 && <>
        {product.slice(0, 4).map((p)=>(
            <ProductCard Product={p}/>
        ))}
        </>}
    </div>
  )
}

export default RelatedProduct