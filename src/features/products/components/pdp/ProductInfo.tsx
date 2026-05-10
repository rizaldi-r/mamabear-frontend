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
  const [qty, setQty] = useState<number>(0)

  console.log(variants)
  return (
    <div className='w-full'>
      <h1 className='text-[var(--mama-hot-pink)] text-4xl/8 font-bold'>{name}</h1>
      <p className='text-red-500 text-font-5 font-bold'>Rp {parseInt(price_idr).toLocaleString("id-ID")}</p>
    
    {variants.length > 0 &&
      <div className='flex flex-col gap-2'>
        <p className='text-[var(--color-light-gray)] font-bold'>Variant</p>  

        <div className='flex flex-wrap gap-3 w-[70%]'>
          {variants.map((v)=>(
          <p key={v.id} className={`py-1 px-5 rounded-2xl font-bold cursor-pointer
                          ${v.stock === 0
                              ? 'border border-gray-400 cursor-not-allowed text-black'
                              : selectedVariant.id === v.id
                              ? 'bg-[var(--mama-hot-pink)] text-white'
                              : 'bg-[var(--mama-pink)] text-white'}
                      `}
                          onClick={()=>setSelectedVariant(v)}
          >{v.name}</p>
          ))}
        </div>
      </div>
    }

      <br/>

      <div className='flex flex-col gap-2'>
        <p className='text-[var(--color-light-gray)] font-bold'>Jumlah</p>  
        <div className="flex border border-gray-400 rounded-xl w-[23%]">
          <button
            disabled={qty >= stock || qty <= 1}
            className={` px-3
              ${qty >= stock || qty <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'}`}
            onClick={()=>setQty(qty<=0 ? 1 : qty>=stock? stock : qty-1)}>-</button>
          <input 
              className="px-3 w-12 text-center border-l border-r pointer-events-none"
              value={qty}/>
          

          <button 
            disabled={qty >= stock || qty >= 10}
            className={`px-3 
              ${qty >= stock || qty >= 10 ? 'text-gray-400 cursor-not-allowed' : 'text-black'}`}
            onClick={()=>setQty(qty>= stock ? stock : qty>=10 ? 10 : qty+1)}>+</button>
        </div>
      </div>

      <br/>

      <div className='flex gap-2'>
        <button className='w-[90%] bg-[var(--mama-hot-pink)] text-font-4 rounded-4xl font-bold text-white flex items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <p>Masukan Keranjang</p>
        </button>
        
        <button className='bg-[var(--mama-pink)] rounded-4xl p-3'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#6C4735" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>
      
    </div>
  )
}

export default ProductInfo
