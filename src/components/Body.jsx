import React, { useEffect, useState } from 'react';
import ImageBody from './ImageBody';
import SkeltonLoading from './SkeltonLoading';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageSection from './ImageSection';
import SearchSection from './SearchSection';

export default function Body() {
  const apiUrl = "https://api.unsplash.com";
  const accessToken = "JHFGRqSNi5MGfJgMmu_R_tfDweoxn2b_W7zI2ctvuTc";
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    if(searchValue) {
      handleOnSearch()
      console.log("search value");
    }else {
      console.log("not search value");
      const fetchImages = async () => {
        try {
          const response = await fetch(`${apiUrl}/photos?page=${page}&per_page=20&client_id=${accessToken}`);
          const data = await response.json();
          setImages((oldImages) => {
            return [...oldImages, ...data]
          });
        } catch (error) {
          console.log("Check your internet");
        }
      };
    fetchImages();
    }

  }, [page]);

  const handleOnSearch = async () => {

    try {
      const response = await fetch(`${apiUrl}/search/photos?page=${page}&query=${searchValue}&client_id=${accessToken}`);
      const data = await response.json();
      setImages((oldImages) => {
        return [...oldImages , ...data.results]
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <BrowserRouter>
      <main className='min-h-screen'>
        <Routes>
          <Route path='/' element={
            <>
              <SearchSection handleOnSearch={handleOnSearch} handleSearchChange={handleSearchChange} setImages={setImages} page={page} />
              <ImageSection images={images} page={page} setPage={setPage} />
            </>
          } />

          
        </Routes>
      </main>
    </BrowserRouter>
  );
}
