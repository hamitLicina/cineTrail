import React from 'react'
import './HomePage.css'
import Slider from '../../components/Slider/Slider'



const HomePage = ({apiKey, baseUrl}) => {
  return (
    <Slider apiKey={apiKey} baseUrl={baseUrl} />
  )
}

export default HomePage