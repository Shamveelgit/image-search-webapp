import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageSection from './ImageSection';
import SearchSection from './SearchSection';
import { useDispatch, useSelector } from 'react-redux';
import ImagePage from './ImagePage';


export default function Body() {

  const dispatch = useDispatch()

  return (
    <main className='min-h-screen'>
      <SearchSection dispatch={dispatch} y />
      <ImageSection dispatch={dispatch} />
    </main>
  );
}
