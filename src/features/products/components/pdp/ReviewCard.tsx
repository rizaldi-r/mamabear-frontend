"use client"

import React, { useState } from 'react'
import Stars from './Stars'
import { addUpvotes } from '@/app/api/product/product-api'

type Review = {
  id: number,
  title: string,
  reviewerId: string,
  productId: number,
  rating: number,
  numUpvotes: number,
  description: string,
  imageUrls: [],
  createdAt: Date
}

type ReviewProps = {
    Review : Review,
    slug : string
}

function ReviewCard({Review, slug}:ReviewProps) {
        const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
        const [isPictureModalOpen, setIsPictureModalOpen] = useState<boolean>(false);
        const [numVotes, setNumVotes] = useState<number>(Review.numUpvotes)
        const [isActive, setIsActive] = useState<boolean>(false);
    
        const normalizedReview = {
            ...Review,
            createdAt: Review.createdAt
                ? new Date(Review.createdAt).toISOString()
                : undefined,
        };

        async function upvotes(reviewId: number, productId: number){
            setIsActive(true)
            const vote = await addUpvotes(reviewId, slug)
            if(vote){
                setNumVotes(vote.numUpvotes)
                setTimeout(()=>setIsActive(false), 700)
            }
        }

  return (
        <div className='bg-white py-7 px-10 flex flex-col gap-2 rounded-xl'>
            {/* <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} review={normalizedReview as any} />
            <PictureModal 
                isOpen={isPictureModalOpen} 
                onClose={() => setIsPictureModalOpen(false)} 
                review={Review} 
            /> */}

            <section className='flex justify-between cursor-pointer'>
                <p className='font-size-3' onClick={() => setIsReviewOpen(true)}>{Review.reviewerId}</p>
                <div className='flex' onClick={() => upvotes(Review.id, Review.productId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--mama-hot-pink)"
                        className={`size-6 ${isActive ? "animate-bounce" : ""}`}>
                        <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                    </svg>
                    <p className='font-size-4'>Helpful</p>
                    <p className='font-size-4'>({numVotes})</p>
                </div>
            </section>

            <hr className='border-[var(--werent-green-1)]'/>

            <section className='flex flex-col lg:flex-row justify-between lg:items-center gap-2'>
                <div  className=''>
                    <Stars rating={Review.rating}/>
                    <p  onClick={() => setIsReviewOpen(true)} className='cursor-pointer font-size-3'>{Review.title}</p>
                    <p className='font-size-4'>{Review.description}</p>
                </div>

                {/* {Review.attachmentUrl ?  
                <img src={Review.attachmentUrl}
                className={`w-20 h-20 cursor-pointer object-center object-cover rounded-xl ${showPicture ? 'block' : 'hidden'}`}
                    onClick={(e) => {
                            e.stopPropagation();
                            setIsPictureModalOpen(true);
                }}
                /> : 
                null
                } */}
            </section>

        </div>
  )
}

export default ReviewCard