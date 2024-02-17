import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'
import { ThemeContext } from '../../contexts/ThemeContext'
import { UserContext } from '../../contexts/UserContext'
import SearchResults from '../SearchResults/SearchResults'
import axios from 'axios'



const Header = ({ baseUrl, apiKey }) => {

    const navigate = useNavigate()

    const { darkMode, setDarkMode } = useContext(ThemeContext)
    const { token, setToken, user } = useContext(UserContext)
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [profileOptions, setProfileOptions] = useState(false)

    useEffect(() => {
        if (query.trim().length > 0) {
            axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
                .then((res) => { setSearchResults(res.data.results) })
                .catch((err) => console.log(err))
        }
    }, [query])

    const handleLogout = () => {
        localStorage.clear()
        setToken('')
        navigate('/')
    }

    return (
        <header className={`header-container ${!darkMode && "header-light"}`}>
            <Link className='logo' to="/">CineTrail</Link>
            <div className='search-container'>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search Movies...'
                    className={`search-input ${query && "input-active"} ${!query && !darkMode && "input-light"}`} />
                {query.trim() !== "" && (
                    <div className="search-results-container">
                        {searchResults.map((movie) => {
                            return (<SearchResults setQuery={setQuery} key={movie.id} movie={movie} />)
                        })
                        }
                    </div>
                )}
            </div>
            <div className="header-buttons-container">
                <div className="theme-buttons-container">
                    <div className="theme-buttons">
                        <MdOutlineLightMode className={`theme-icon ${!darkMode && 'theme-icon-active'}`}
                            onClick={() => { setDarkMode(false); localStorage.setItem('darkMode', false) }} />
                        <MdOutlineDarkMode className={`theme-icon ${darkMode && 'theme-icon-active'}`}
                            onClick={() => { setDarkMode(true); localStorage.setItem('darkMode', true) }} />
                    </div>
                </div>
                {token ? (<div className={darkMode ? "profile-container" : "profile-container profile-light"} >
                    <img src={user.image_url} className="profile-img" onClick={() => setProfileOptions(!profileOptions)} />
                    <p>Welcome {user.username}<span></span></p>
                    {profileOptions ? (<div className="profile-options">
                        <Link to="/myfavorites">My Favorites</Link>
                        <p className="logout" onClick={handleLogout}>Logout</p>
                    </div>) : null}
                </div>)
                    : (
                        <div>
                            <button className="create-account" onClick={() => navigate("/signup")} >Create an Account</button>
                        </div>
                    )
                }
            </div>
        </header>
    )
}

export default Header