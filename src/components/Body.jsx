import React, { useEffect, useState } from 'react';
import ImageBody from './ImageBody';

export default function Body() {
  const apiUrl = "https://api.unsplash.com/";
  const accessToken = "JHFGRqSNi5MGfJgMmu_R_tfDweoxn2b_W7zI2ctvuTc";
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [skeletonLoader, setSkeletonLoader] = useState(true);
  const dummyApi = Array(12).fill(0);

  useEffect(() => {
    setSkeletonLoader(true);
    fetch(`${apiUrl}/photos?page=${page}&per_page=20&client_id=${accessToken}`)
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setSkeletonLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setSkeletonLoader(false);
      });
  }, [page]);

  const handleOnSearch = () => {
    setSkeletonLoader(true);
    fetch(`${apiUrl}search/photos?page=1&query=${searchValue}&client_id=${accessToken}`)
      .then((response) => response.json())
      .then((data) => {
        setImages(data.results);
        setSkeletonLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setSkeletonLoader(false);
      });
  };

  const searchBox = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <main className="min-h-screen">
      <section className="w-full min-h-[22rem]  max-2xl:bg-largeScreen 2xl:bg-screenWidth bg-mainImage bg-no-repeat bg-scroll object-fill bg-center flex items-center justify-center">
        <h1 className="text-center text-[250%] max-md:text-lg capitalize w-full text-white font-Ui translate-y-6">
          Discover the Art of Artists,<br />
          Photos of Professional Photographers
        </h1>
      </section>
      <div className="w-full flex items-center justify-center">
        <input
          onChange={searchBox}
          className="peer font-sans text-lg p-6 focus:border-none outline-none border-none focus:outline-offset-0 w-[40%] translate-y-[-50%] h-[3.5rem] text-pretty rounded-leftSide focus:outline-2 focus:outline-green-600"
          type="text"
          placeholder="Search Images here"
        />
        <button
          onClick={handleOnSearch}
          className="peer-focus:outline-2 peer-focus:outline-offset-0 peer-focus:outline outline-green-600 text-gray-300 font-semibold hover:text-white w-[7rem] bg-green-600 h-[3.5rem] translate-y-[-50%] rounded-rightSide text-xl font-Ui"
        >
          Search
        </button>
      </div>
      <section className="flex items-center justify-center">
          <div className=' max-w-7xl bg-largeScreen'>
            <ImageBody skeletonLoader={skeletonLoader} dummyApi={dummyApi} images={images}>
              <div className='columns-6 max-sm:columns-1 max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 p-5 w-full'>
                  {skeletonLoader
                      ? dummyApi.map((_, index) => (
                          <div
                            key={index}
                            className="m-5 mb-0 rounded-lg w-72 min-h-80 bg-gray-600 animate-pulse"
                          ></div>
                        ))
                      : images.map((image, index) => (
                          <div key={index} className="m-5 mb-0 rounded-lg bg-gray-600">
                            <img
                              src={image.urls.regular}
                              alt={image.alt_description}
                              className="w-full h-auto object-cover rounded-lg max-h-svh"
                            />
                          </div>
                        ))}
              </div>
            </ImageBody>
              <a href='*' className='text-white animate-pulse m-10 text-center'>Loading ...</a>
          </div>
      </section>
    </main>
  );
}
