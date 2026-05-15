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
        <section className='flex gap-8'>
          <p className={`text-font-2 cursor-pointer ${info == description ? 'font-bold' : 'font-normal'}`}
             onClick={()=>selectedInfo(description)}>Deskripsi</p>

          <p className={`text-font-2 cursor-pointer ${info == ingredients ? 'font-bold' : 'font-normal'}`} 
             onClick={()=>selectedInfo(ingredients)}>Bahan</p>

          <p className={`text-font-2 cursor-pointer ${info == usageInstructions ? 'font-bold' : 'font-normal'}`}
             onClick={()=>selectedInfo(usageInstructions)}>Cara Pemakaian</p>
        </section>
        <hr className='pb-4 border-gray-500'/>
        <p className=' whitespace-pre-line h-32 overflow-y-auto'>{info}</p>
    </div>
  )
}

export default Description
