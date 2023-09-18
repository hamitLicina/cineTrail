import React, { useState, useContext } from 'react'
import './ReviewItem.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import Avatar from '/avatar.jpeg'



function ReviewItem({ review }) {
    const {darkMode, setDarkMode } = useContext(ThemeContext)

    const [showCompleteReview, setShowCompleteReview] = useState(false)
    let imgSrc = ""
    review?.author_details?.avatar_path ? (imgSrc = `${import.meta.env.VITE_IMAGE_BASE_URL}${review?.author_details?.avatar_path}`)
    : (imgSrc = Avatar)

  return (
    <div className='review'>
        <div className="avatar-container">
            <img src={imgSrc} alt='user avatar' className='avatar' />
            <p>{review?.author}</p>
        </div>
        <p className={`content ${!darkMode && "header-light"}`}>
            {showCompleteReview ? review?.content : `${review?.content.slice(0, 300)}...`}
            {showCompleteReview 
            ? 
            ( <span className='read-less' onClick={() => setShowCompleteReview(false)} >
                read less...
            </span> )
            :
            ( <span className='read-more' onClick={() => setShowCompleteReview(true)} >
                read more...
            </span> )
            }
        </p>
    </div>
  )
}

export default ReviewItem