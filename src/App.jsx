import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ImagePage from './components/ImagePage'

function App() {
  
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
            <Route index element={<Body />} />
            <Route path='/:imageId' element={<ImagePage />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
