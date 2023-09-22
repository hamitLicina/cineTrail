import React, { useEffect, useState } from 'react'
import './HomePage.css'
import Slider from '../../components/Slider/Slider'
import axios from 'axios'
import MovieCard from '../../components/MovieCard/MovieCard'



const HomePage = ({apiKey, baseUrl}) => {

  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [page, setPage] = useState(1)
  const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMoviesResponse = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`)
        setPopularMovies(popularMoviesResponse.data.results)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchMovies()
  }, [page])
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const topRatedMoviesResponse = await axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}`)
        setTopRatedMovies(topRatedMoviesResponse.data.results)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchMovies()
  }, [])

const handlePage = page => {
  setPage(page)
  scrollTo({ top: 550, left: 0, behavior: "smooth" })
}

  return (
    <div className='homepage-container'>
      <Slider apiKey={apiKey} baseUrl={baseUrl} />
      <div className="movies-wrapper">
        <div className="popular-container">
          <h3 className="popular-title">Popular Movies</h3>
          <div className="popular-cards-wrapper">
            {
              popularMovies.map(movie => {
                return ( <MovieCard height="300px" width="200px" movie={movie} imageUrl={movie?.poster_path} radius="16px" cardStyle="popular-card" key={movie?.id} /> )
              })
            }
          </div>
          <div className="page-numbers">
            <p>Select Page</p>
            {pageNumbers.map((item) => (<p className={item === page ? "current-page" : "page"} key={item} onClick={() => handlePage(item)} >{item}</p>))}
          </div>
        </div>
        <div className="top-rated-container">
          <h3>Top Rated Movies</h3>
          <div className="top-rated-cards-wrapper">
            {
              topRatedMovies.map((movie) => {
                return ( <MovieCard height="100px" width="200px" imageUrl={movie?.backdrop_path} movie={movie} cardStyle="top-rated-card" key={movie?.id} /> )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage