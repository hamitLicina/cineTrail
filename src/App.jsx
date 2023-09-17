import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeContextProvider from './contexts/ThemeContext';
import HomePage from './pages/HomePage/HomePage';
// Movie Details will be added and update



function App() {

  const apiKey = import.meta.env.VITE_API_KEY
  const baseUrl = import.meta.env.VITE_BASE_URL
  

  return (
    <>
      <ThemeContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage apiKey={apiKey} baseUrl={baseUrl} />} />
        </Routes>
      </BrowserRouter>
      </ThemeContextProvider>
    </>
  )
}

export default App