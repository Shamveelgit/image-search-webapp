import React, { useEffect, useState } from 'react';
import ImageBody from './ImageBody';
import SkeltonLoading from './SkeltonLoading';

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
          console.error(error);
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
    <main className="min-h-screen">
      <section className="w-full min-h-[22rem] max-2xl:bg-largeScreen 2xl:bg-screenWidth bg-mainImage bg-no-repeat bg-scroll object-fill bg-center flex items-center justify-center">
        <h1 className="text-center text-[250%] max-md:text-lg capitalize w-full text-white font-Ui translate-y-6">
          Discover the Art of Artists,<br />
          Photos of Professional Photographers
        </h1>
      </section>
      <div className="w-full flex items-center justify-center">
        <input
          onChange={handleSearchChange}
          className="peer font-sans text-lg p-6 focus:border-none outline-none border-none focus:outline-offset-0 w-[40%] translate-y-[-50%] h-[3.5rem] text-pretty rounded-leftSide focus:outline-2 focus:outline-green-600"
          type="text"
          placeholder="Search Images here"
        />
        <button
          onClick={() => {
            setImages([])
            setPage(1)
            handleOnSearch()
          }}
          className="peer-focus:outline-2 peer-focus:outline-offset-0 peer-focus:outline outline-green-600 text-gray-300 font-semibold hover:text-white w-[7rem] bg-green-600 h-[3.5rem] translate-y-[-50%] rounded-rightSide text-xl font-Ui"
        >
          Search
        </button>
      </div>
      <section className="flex items-center justify-center">
        <div className="max-w-7xl bg-largeScreen w-full pt-5">
          <ImageBody images={images}>
            <div className="columns-6 max-sm:columns-1 max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 p-5 w-full">
              { images ? images.map((image, index) => (
                <div key={index} className={`m-5 mb-0 rounded-lg bg-gray-600`}>
                  <img
                    src={image?.urls?.regular}
                    alt={image?.alt_description}
                    className="w-full h-auto object-cover rounded-lg max-h-svh"
                  />
                </div>
              )): ''}
            </div>
          </ImageBody>
          <SkeltonLoading page={page} setPage={setPage} />
          <a href="*" className="text-white animate-pulse m-10 text-center">Loading ...</a>
        </div>
      </section>
    </main>
  );
}
