import React from 'react'
import './HomePage.css'
import Slider from '../../components/Slider/Slider'


function HomePage({apiKey, baseUrl}) {
  return (
    <Slider apiKey={apiKey} baseUrl={baseUrl} />
  )
}

export default HomePage