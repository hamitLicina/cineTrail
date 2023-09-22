import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CombinedContextProvider from './contexts/index';
import HomePage from './pages/HomePage/HomePage';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import MyFavorites from './pages/MyFavorites/MyFavorites';



function App() {

  const apiKey = import.meta.env.VITE_API_KEY
  const baseUrl = import.meta.env.VITE_BASE_URL
  const serverUrl = import.meta.env.VITE_SERVER_URL


  return (
    <>
      <CombinedContextProvider>
      <BrowserRouter>
        <Header apiKey={apiKey} baseUrl={baseUrl} />
        <Routes>
          <Route path='/' element={<HomePage apiKey={apiKey} baseUrl={baseUrl} />} />
          <Route path='/movieDetails/:movieId' element={<MovieDetails apiKey={apiKey} baseUrl={baseUrl} serverUrl={serverUrl} />} />
          <Route path="/myfavorites" element={<MyFavorites serverUrl={serverUrl} />} />
          <Route path="/signup" element={<SignUp serverUrl={serverUrl} />} />
          <Route path="/signin" element={<SignIn serverUrl={serverUrl} />} />
        </Routes>
      </BrowserRouter>
      </CombinedContextProvider>
    </>
  )
}

export default App