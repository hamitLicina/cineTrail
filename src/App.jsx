import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CombinedContextProvider from './contexts/index';
import HomePage from './pages/HomePage/HomePage';
import MovieDetails from './pages/MovieDetails/MovieDetails';





function App() {

  const apiKey = import.meta.env.VITE_API_KEY
  const baseUrl = import.meta.env.VITE_BASE_URL
  

  return (
    <>
      <CombinedContextProvider>
      <BrowserRouter>
        <Header apiKey={apiKey} baseUrl={baseUrl} />
        <Routes>
          <Route path='/' element={<HomePage apiKey={apiKey} baseUrl={baseUrl} />} />
          <Route path='/movieDetails/:movieId' element={<MovieDetails apiKey={apiKey} baseUrl={baseUrl} />} />
        </Routes>
      </BrowserRouter>
      </CombinedContextProvider>
    </>
  )
}

export default App