  import React, { useEffect, useState } from 'react';
  import { BrowserRouter, Route, Routes } from 'react-router-dom';
  import ImageSection from './ImageSection';
  import SearchSection from './SearchSection';
  import { useDispatch, useSelector } from 'react-redux';

  export default function Body() {

    const dispatch = useDispatch()

    console.log("Body comp");
  
    return (
      <BrowserRouter>
        <main className='min-h-screen'>
          <Routes>
            <Route path='/' element={
              <>
                <SearchSection dispatch={dispatch} y />
                <ImageSection dispatch={dispatch} />
              </>
            } />

            
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
