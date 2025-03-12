import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ImagePage from './components/ImagePage'
import ScrollToTop from './components/functions/ScrollToTop'

function App() {
  
  const [count, setCount] = useState(0)
  

  return (
    <>
      <BrowserRouter basename='green-life-gallery'>
      <ScrollToTop />
      <Header />
        <Routes>
            <Route path='/*' element={<Body />} />
            <Route path='/photos/:imageId' element={<ImagePage />} />
            <Route path='/invalid' element={
              <div className='text-center text-white'>
                  404
              </div>
            }/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
