import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '../../types/product.types'
import { getRelatedProduct } from '@/app/api/product/product-api'

interface Props {
    slug : string
}

async function RelatedProduct({slug}:Props) {
  const res = await getRelatedProduct(slug)
  const product : Product[] = res.data

  return (
    <div className='flex w-full overflow-x-auto gap-4 justify-center'>
        {product.length >0 && <>
        {product.map((p)=>(
              <ProductCard key={p.id} Product={p}/>
        ))}
        </>}
    </div>
  )
}

export default RelatedProduct