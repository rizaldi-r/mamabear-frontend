"use client"
import React, { useState } from 'react'

type Info = {
    description: string,
    ingredients: string,
    usageInstructions:string
}

function Description({description, ingredients, usageInstructions} : Info) {
  const [info, selectedInfo] = useState<string>(description)
  return (
    <div className='pt-5'>
        <section className='flex gap-8 pb-1 justify-center'>
          <p className={`text-font-3 cursor-pointer ${info == description ? 'font-bold border-b-4 border-[var(--mama-hot-pink)]' : 'font-normal'}`}
             onClick={()=>selectedInfo(description)}>Deskripsi</p>

          <p className={`text-font-3 cursor-pointer ${info == ingredients ? 'font-bold border-b-4 border-[var(--mama-hot-pink)]' : 'font-normal'}`} 
             onClick={()=>selectedInfo(ingredients)}>Bahan</p>

          <p className={`text-font-3 cursor-pointer ${info == usageInstructions ? 'font-bold border-b-4 border-[var(--mama-hot-pink)]' : 'font-normal'}`}
             onClick={()=>selectedInfo(usageInstructions)}>Cara Pemakaian</p>
        </section>
        <hr className='pb-4 border-gray-300'/>
        <p className=' whitespace-pre-line h-64 overflow-y-auto'>{info}</p>
        <br/>
        <hr className='border-gray-300'/>
    </div>
  )
}

export default Description
