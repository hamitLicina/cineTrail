import React, { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'
import { ThemeContext } from '../../contexts/ThemeContext'


const Header = () => {

    const { darkMode, setDarkMode } = useContext(ThemeContext)

    //   API Key: bb036d495213ae007c88e96440e9d0e8   https://api.themoviedb.org/3/movie/550?api_key=bb036d495213ae007c88e96440e9d0e8

  return (
    <header className={`header-container ${!darkMode && "header-light"}`}>
        <Link className='logo' to="/">CineTrail</Link>
        <div className='search-container'>
            <input type="text" placeholder='Search Movies...' className="search-input" />
        </div>
        <div className="header-buttons-container">
            <div className="theme-buttons-container">
                <div className="theme-buttons">
                    <MdOutlineLightMode className={`theme-icon ${!darkMode && 'theme-icon-active'}`} 
                    onClick={() => {setDarkMode(false); localStorage.setItem('darkMode', false)}} />
                    <MdOutlineDarkMode className={`theme-icon ${darkMode && 'theme-icon-active'}`} 
                    onClick={() => {setDarkMode(true); localStorage.setItem('darkMode', true)}} />
                </div>
            </div>
            <button className='create-account'>Create an Account</button>
        </div>
    </header>
  )
}

export default Header