import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageSection from './ImageSection';
import SearchSection from './SearchSection';

export default function Body() {
  const apiUrl = "https://api.unsplash.com";
  const accessToken = "JHFGRqSNi5MGfJgMmu_R_tfDweoxn2b_W7zI2ctvuTc";
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [loadValue,setLoadValue] = useState('Loading...')
  const [interSect,setInterSect] = useState(false)

  useEffect(() => {
    if(searchValue) {
      handleOnSearch()
      console.log("search value");
    }else {
      console.log("not search value");
      const fetchImages = async () => {
        try {
          const response = await fetch(`${apiUrl}/photos?page=${page}&per_page=10&client_id=${accessToken}`);
          const data = await response.json();
          if (response.ok) {
            setLoadValue("loading...")
            setImages((oldImages) => {
              return [...oldImages, ...data]
            })
            setTimeout(() => {
              setInterSect(true)

            },2000)
          }else{
            setLoadValue("Server Not Responding..")
            setInterSect(false)
          }
        } catch (error) {
          console.log("Check your internet");
          setLoadValue("Check Your Internet...")
          setInterSect(false)

        }
      };
    fetchImages();
    }

  }, [page]);

  const handleOnSearch = async () => {

    try {
      const response = await fetch(`${apiUrl}/search/photos?page=${page}&query=${searchValue}&client_id=${accessToken}`);
      const data = await response.json();
      if (response.ok) {
        setLoadValue("loading...")
        setImages((oldImages) => {
          return [...oldImages, ...data.results]
        });
      } else {
        setLoadValue("Check Your Internet...")
        setInterSect(false)
      }
    } catch (error) {
      console.error("internet error");
      setLoadValue("Check Your Internet...")
      setInterSect(false)

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
              <SearchSection setPage={setPage} handleOnSearch={handleOnSearch} handleSearchChange={handleSearchChange} setImages={setImages} page={page} />
              <ImageSection interSect={interSect} setInterSect={setInterSect} loadValue={loadValue} images={images} page={page} setPage={setPage} />
            </>
          } />

          
        </Routes>
      </main>
    </BrowserRouter>
  );
}
