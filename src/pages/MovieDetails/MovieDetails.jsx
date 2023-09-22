import React, { useEffect, useState, useContext } from 'react'
import './MovieDetails.css'
import { useParams } from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext'
import { UserContext } from '../../contexts/UserContext'
import ReactPlayer from 'react-player'
import StarRatings from 'react-star-ratings'
import axios from 'axios'
import Genres from '../../components/Genres/Genres'
import ReviewItem from '../../components/ReviewItem/ReviewItem'



function MovieDetails({ apiKey, baseUrl }) {

    const { darkMode, setDarkMode } = useContext(ThemeContext)
    const { movieId } = useParams()
    const [movie, setMovie] = useState(null)
    const [trailerKey, setTrailerKey] = useState("")
    const [reviews, setReviews] = useState([])
    const [numReviewsToShow, setNumReviewsToShow] = useState(3)
    const [totalNumReviews, setTotalNumReviews] = useState(0)
    const { user, token } = useContext(UserContext)
    const [added, setAdded] = useState(false)

    
    useEffect(() => {
      axios(`${import.meta.env.VITE_BASE_URL}/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}`)
      .then((res) => {setMovie(res.data)})
      .catch((err) => console.log(err))

      axios(`${import.meta.env.VITE_BASE_URL}/movie/${movieId}/videos?api_key=${import.meta.env.VITE_API_KEY}`)
      .then((res) => {const trailers = res.data.results.filter((video) => video.type === "Trailer" && video.site === "YouTube")
      setTrailerKey(trailers[0].key)})
      .catch((err) => console.log(err))

      axios(`${import.meta.env.VITE_BASE_URL}/movie/${movieId}/reviews?api_key=${import.meta.env.VITE_API_KEY}`)
      .then((res) => {setTotalNumReviews(res.data.results.length)
      setReviews(res.data.results)})
      .catch((err) => console.log(err))
    }, [movieId, user])


    useEffect(() => {
      axios.post(`${serverUrl}/favoriteMovies/search`, {user_id: user?._id, tmdb_id: movie?.id, })
      .then((res) => { if (res.data === null) setAdded(false) 
        else {setAdded(true)}})
      .catch((err) => console.log(err))
    }, [user, movie])
    
    const addToFavorites = () => {console.log(serverUrl)
      if (!token) { alert("Please login to add a movie to your favorites.")
    } else {axios.post(`${serverUrl}/favoriteMovies`, {user_id: user._id, movie_id: movie.id, })
        .then((res) => {setAdded(true)})
        .catch((err) => console.log(err))
    }
  }

    const removeFromFavorites = () => {
      axios.delete(`${serverUrl}/favoriteMovies/${user._id}/${movie.id}`)
      .then((res) => {
        console.log(res.data)
        setAdded(false)})
      .catch((err) => console.log(err))
  }

  return (
    <div className={`movie-details-container ${!darkMode && "details-light"}`}>
      <div className="trailer-container">
        <ReactPlayer
          className="trailer-player"
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                showInfo: 1,
                origin: "https:localhost:5173",
              },
            },
          }}
        />
      </div>
      <div className="details-container">
        <div className="title-container">
          <h1>{movie?.title}</h1>
          {added ? (
            <span className="remove-btn" onClick={removeFromFavorites}>
              Remove from favorites.
            </span>
          ) : (
            <span className="add-btn" onClick={addToFavorites}>
              Add to favorites.
            </span>
          )}
        </div>
        <div className="rating">
          {movie && (
            <StarRatings
              starRatedColor="red"
              numberOfStars={5}
              starDimension="15px"
              starSpacing="1px"
              rating={movie?.vote_average / 2}
              name="rating"
            />
          )}
        </div>
        <div className={`info-container ${!darkMode && "details-light"}`}>
          {movie && (
            <img
              src={`${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`}
              alt={`Movie poster for ${movie.title}`}
              className="details-poster"
            />
          )}
          <div className="movie-info">
            <h4>{movie?.tagline}</h4>
            <h4>{movie?.overview}</h4>
            <h4>Status:&nbsp; {movie?.status}</h4>
            <h4>Runtime:&nbsp; {movie?.runtime}&nbsp; min</h4>
            <h4>Budget:&nbsp; {movie?.budget}</h4>
            <Genres movieGenres={movie?.genres} apiKey={apiKey} baseUrl={baseUrl} component="details" />
          </div>
        </div>
        <div className={`review-container ${!darkMode && "details-light"}`}>
          <p className="reviews-title">Reviews</p>
          {reviews.slice(0, numReviewsToShow).map((review) => (
            <ReviewItem key={review?.id} review={review} />
          ))}
          {numReviewsToShow < totalNumReviews ? (
            <p className="review-number" onClick={() => setNumReviewsToShow((prevState) => prevState + 3)} >
              <em>Read More Reviews</em>
            </p>
          ) : (
            <p className="review-number" onClick={() => setNumReviewsToShow(3)}>
              <em>End of Reviews. Collapse</em>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails