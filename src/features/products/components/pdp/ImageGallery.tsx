"use client"
import React, { useState } from 'react'

type Image = {
    id: number,
    productId: number,
    imageUrl: string,
    sortOrder: number,
    altText: string | null
}

type Props = {
    images: Image[]
}

function ImageGallery({ images }: Props) {
  const [img, setImg] = useState<Image[]>(images)
  const [liveImage, setLiveImage] = useState<string>(img[0].imageUrl)

  return (
    <div className=' w-full'>
        {/* image desktop section */}
        <section className='flex-col gap-2 lg:flex hidden'>
                {/* live image */}
                <img src={liveImage}/>

                {/* selection image */}
                <div className='flex gap-5 max-w-[90%] overflow-x-auto'>
                    {img && img.map((i)=>(
                        <img key={i.id} src={i.imageUrl} className='w-20 h-20 object-cover'
                        onClick={()=>setLiveImage(i.imageUrl)}/>
                    ))}
                </div>


        </section>

        {/* image mobile section */}
        <section className='flex flex-col gap-5 lg:hidden block'>
                
        </section>
    </div>
  )
}

export default ImageGallery
