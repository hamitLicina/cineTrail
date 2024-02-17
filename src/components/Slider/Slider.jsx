import React, { useEffect, useState } from 'react'
import './Slider.css'
import axios from 'axios'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md"
import Genres from '../Genres/Genres'
import Rating from '../Rating/Rating'
import { Link } from 'react-router-dom'



const Slider = ({ apiKey, baseUrl }) => {

    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [index, setIndex] = useState(0)
    const [movieRatings, setMovieRatings] = useState([])
    const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL

    //   console.log(baseUrl + " " + apiKey)

    //   console.log(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)

    useEffect(() => {
        axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`).then(res => {
            //  console.log(res.data.results) Instead of clg we will State
            setUpcomingMovies(res.data.results)
            const ratings = res.data.results.map(movie => movie.vote_average / 2)
            setMovieRatings(ratings)
        })

    }, [])

    const sliderStyle = {
        backgroundImage: `url("${imageBaseUrl}${upcomingMovies[index]?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "60vh",
        position: "relative",
        marginTop: "70px"
    }

    const handleRight = () => {
        setIndex(index + 1)
        if (index === upcomingMovies.length - 1) {
            setIndex(0)
        }
    }

    const handleLeft = () => {
        setIndex(index - 1)
        if (index === 0) {
            setIndex(upcomingMovies.length - 1)
        }
    }

    return (
        <div style={sliderStyle}>
            <div className="slider-overlay">
                <MdKeyboardArrowRight className='right-arrow' onClick={handleRight} />
                <MdKeyboardArrowLeft className='left-arrow' onClick={handleLeft} />
                <div className='slider-info'>
                    <h1>{upcomingMovies[index]?.title}</h1>
                    <p className="slider-description">{upcomingMovies[index]?.overview.slice(0, 130)}...</p>
                    <Genres movieGenres={upcomingMovies[index]?.genre_ids} apiKey={apiKey} baseUrl={baseUrl} />
                    <p>Release Date: {upcomingMovies[index]?.release_date}</p>
                    <Rating movieRating={movieRatings[index]} />
                    <Link to={`/moviedetails/${upcomingMovies[index]?.id}`} className='see-details'>See Details</Link>
                </div>
            </div>

        </div>
    )
}

export default Slider