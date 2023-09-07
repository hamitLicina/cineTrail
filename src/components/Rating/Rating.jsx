import React from 'react'
import './Rating.css'
import StarRatings from 'react-star-ratings'


const Rating = ({movieRating}) => {
  return (
    <div className='rating'>
        <StarRatings rating={movieRating} starRatedColor='red' starDimension='15px' numberOfStars={5} name='rating' starSpacing='1px' starEmptyColor='gray' />
    </div>
  )
}

export default Rating