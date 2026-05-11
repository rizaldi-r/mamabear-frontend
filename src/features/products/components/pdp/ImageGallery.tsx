"use client"
import React, { useRef, useState } from 'react'

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
  const [liveImage, setLiveImage] = useState<string>(img[0].imageUrl || '')
  const [imgIndex, setImgIndex] = useState<number>(0)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current

    if (diff > 50) {
      // swipe kiri
      setImgIndex((prev) =>
        prev === images.length - 1 ? prev : prev + 1
      )
    }

    if (diff < -50) {
      // swipe kanan
      setImgIndex((prev) =>
        prev === 0 ? prev : prev - 1
      )
    }
  }

  return (
    <div className=' w-full relative'>
        {/* image desktop section */}
        <div className='flex justify-between w-full top-[15rem] absolute items-center'>
                {/* BUTTON LEFT */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 bg-white cursor-pointer"
                    onClick={()=>setImgIndex(imgIndex<=0 ? images.length-1 : imgIndex-1)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>

                {/* BUTTON RIGHT */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 bg-white cursor-pointer"
                    onClick={()=>setImgIndex(imgIndex>=images.length-1 ? 0 : imgIndex+1)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
        </div>

        <section className='flex-col gap-2 lg:flex hidden '>
            {/* live image */}
            <img src={img[imgIndex].imageUrl}/>

            {/* selection image */}
            <div className='flex gap-5 max-w-[90%] overflow-x-auto'>
                {img && img.map((i, idx)=>(
                    <img key={i.id} src={i.imageUrl} className='w-20 h-20 object-cover cursor-pointer'
                    onClick={()=>{setImgIndex(idx)}}/>
                 ))}
            </div>
        </section>

        {/* Mobile */}
        <section
            className='flex flex-col gap-5 lg:hidden block'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <img
            src={img[imgIndex].imageUrl}
            className='w-full object-cover'
            />
        </section>
    </div>
  )
}

export default ImageGallery
