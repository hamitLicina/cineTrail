import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter } from 'react-router-dom'
import ThemeContextProvider from './contexts/ThemeContext';


function App() {
  

  return (
    <>
      <ThemeContextProvider>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
      </ThemeContextProvider>
    </>
  )
}

export default App