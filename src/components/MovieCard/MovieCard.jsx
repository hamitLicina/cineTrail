import React, { useState } from 'react'
import './MovieCard.css'
import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating'


const MovieCard = ({ width, height, movie, radius, cardStyle }) => {

    const [rating, setRating] = useState(Math.round(movie?.vote_average / 2))

    const imageStyle = {
        width: width,
        height: height
    }

  return (
    <Link to={`/moviedetails/${movie?.id}`} style={imageStyle}>
        <div style={imageStyle}>
            <div className="movie-info-top">
                <Rating movieRating={rating} />
            </div>
            <div className="movie-info-bottom">
                <p>{data?.title}</p>
                <p>Rating: {rating}</p>
            </div>
        </div>
    </Link>
  )
}

export default MovieCard