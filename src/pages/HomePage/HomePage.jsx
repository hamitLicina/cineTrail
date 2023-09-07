import React, { useEffect, useState } from 'react'
import './HomePage.css'
import Slider from '../../components/Slider/Slider'
import axios from 'axios'



const HomePage = ({apiKey, baseUrl}) => {
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMoviesResponse = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`)
        setPopularMovies(popularMoviesResponse.data.results)
        const topRatedMoviesResponse = await axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}`)
        setTopRatedMovies(topRatedMoviesResponse.data.results)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchMovies()
  }, [])

  return (
    <div className='homepage-container'>
      <Slider apiKey={apiKey} baseUrl={baseUrl} />
      <div className="movies-wrapper">
        <div className="popular-container">
          <h3 className="popular-title">Popular Movies</h3>
          <div className="popular-cards-wrapper">
            {
              popularMovies.map(movie => {
                return <p key={movie?.id}>{movie?.title}</p>
              })
            }
          </div>
        </div>
        <div className="top-rated-container">
          <h3>Top Rated Movies</h3>
          <div className="top-rated-cards-wrapper">
            {
              topRatedMovies.map(movie => {
                return <p key={movie?.id}>{movie?.title}</p>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage