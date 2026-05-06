"use client"
import React, { useState } from 'react'

type Product ={
    name: string,
    description: string,
    price_idr: string,
    stock: number,
    variants: Variant[]
}

type Variant ={
    id: number,
    productId: number,
    name: string,
    price_idr: string,
    stock: number
}

function ProductInfo({name, description, price_idr, stock, variants}:Product) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0])
  return (
    <div>
      <h1 className='text-[var(--mama-hot-pink)] text-font-5 font-bold'>{name}</h1>
      <p className='text-red-500 text-font-5 font-bold'>Rp {parseInt(price_idr).toLocaleString("id-ID")}</p>
    
      <p className='text-[var(--color-light-gray)]'>Variant</p>
      <div className='flex flex-wrap gap-3 w-[70%]'>
        {variants && variants.map((v)=>(
        <p className={`py-1 px-5 rounded-2xl font-bold text-white cursor-pointer
                        ${v.stock === 0
                            ? 'border border-gray-400 cursor-not-allowed text-gray-400'
                            : selectedVariant.id === v.id
                            ? 'bg-[var(--mama-hot-pink)]'
                            : 'bg-[var(--mama-pink)]'}
                    `}
                        onClick={()=>setSelectedVariant(v)}
        >{v.name}</p>
        ))}
      </div>

      <br/>

      <div className="flex">
        <button className="border border-gray-400 px-3 rounded-l-lg bg-white">-</button>
        <input className="border-t border-b border-gray-400 px-3 w-12 text-center pointer-events-none" />
        <button className="border border-gray-400 px-3 rounded-r-lg bg-white">+</button>
      </div>

      
      
    </div>
  )
}

export default ProductInfo
