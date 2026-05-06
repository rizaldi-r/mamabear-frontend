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
            {/* image section */}
            <section className='flex flex-col gap-5'>
                {/* live image */}
                <img src={liveImage}/>

                {/* selection image */}
                <div className='flex gap-5'>
                    {img && img.map((i)=>(
                        <img src={i.imageUrl} className='w-24 h-24 object-cover' />
                    ))}
                </div>
            </section>
        </div>
  )
}

export default ImageGallery
