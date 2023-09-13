import React, { useState } from 'react'
import './MovieCard.css'
import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating'


const MovieCard = ({ width, height, movie, radius, cardStyle, imageUrl }) => {

    const [rating, setRating] = useState(Math.round(movie?.vote_average / 2))

    const imageStyle = {
        width: width,
        height: height,
        backgroundImage: `url("https://image.tmdb.org/t/p/w500${imageUrl}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        borderRadius: radius,
        boxShadow: cardStyle === "popular-card" ? "0px 0px 10px 0px rgba(118, 118, 118, 0.75)" : null
    }

  return (
    <Link to={`/moviedetails/${movie?.id}`} className={cardStyle} key={movie?.id} >
        <div style={imageStyle}>
            <div className="movie-info-top">
                <Rating movieRating={rating} />
            </div>
            <div className="movie-info-bottom">
                <p>{movie?.title}</p>
                <p>Rating: {rating}</p>
            </div>
        </div>
        {cardStyle === "top-rated-card" && <p>{movie?.title}</p>}
    </Link>
  )
}

export default MovieCard