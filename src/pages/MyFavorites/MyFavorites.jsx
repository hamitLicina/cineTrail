import React, { useContext, useEffect, useState } from 'react'
import './MyFavorites.css'
import MovieCard from '../../components/MovieCard/MovieCard'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext'



const MyFavorites = ({ serverUrl }) => {
    
    const [movies, setMovies] = useState([])
    const { user, token } = useContext(UserContext)
    
    useEffect(() => {
      axios.get(`${serverUrl}/favoriteMovies/user/${user?._id}`)
      .then((res) => {
        console.log(res.data)
        setMovies(res.data.favorites)})
      .catch((err) => console.log(err))
    }, [user]);

     
  return (
    <div className="favorites-container">
      {token ? (
        movies.map((item) => {
          return (
            <MovieCard
              height="300px"
              width="200px"
              movie={item.movie[0]}
              imageUrl={item.movie[0].poster_path}
              cardStyle="top-rated-card"
              key={item.movie[0]._id}
              radius="16px"
            />
            // <MovieCard
            //       height="100px"
            //       width="200px"
            //       movie={movie}
            //       imageUrl={movie?.backdrop_path}
            //       cardStyle="top-rated-card"
            //       key={movie?.id}
            //       radius="8px"
            //     />
          )
        })
      ) : (
        <p style={{ color: "white" }}>
          Sign in to save movies to your favorites.
        </p>
      )}
    </div>
  )
}

export default MyFavorites