import React from 'react'
import Stars from './Stars'

type Review = {
    reviewerId:string,
    rating:number,
    title:string,
    description:string,
}

function ReviewCard({reviewerId, rating, title, description}:Review) {
  return (
    <div className='flex flex-col'>
        <p className='font-bold'>{reviewerId}</p>
        <Stars rating={rating}/>
        <p>{title}</p>
        <p>{description}</p>
    </div>
  )
}

export default ReviewCard
