import React, { useState } from 'react';
import ImageBody from './ImageBody';
import SkeltonLoading from './SkeltonLoading';
import useFetchImages from './useFetchImages';
import useDebounce from './useDebounce';

export default function Body() {
  const apiUrl = "https://api.unsplash.com/";
  const accessToken = "JHFGRqSNi5MGfJgMmu_R_tfDweoxn2b_W7zI2ctvuTc";
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { images, isLoading, error } = useFetchImages(apiUrl, accessToken, debouncedSearchValue, page);

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
      </div>
      <section className="flex items-center justify-center">
        <div className="max-w-7xl bg-largeScreen w-full pt-5">
          <ImageBody isLoading={isLoading} images={images}>
            <div className='columns-6 max-sm:columns-1 max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 p-5 w-full'>
              {images.map((image, index) => (
                <div key={index} className={`m-5 mb-0 rounded-lg bg-gray-600 ${isLoading ? 'animate-pulse' : ""}`}>
                  <img
                    src={image?.urls?.regular}
                    alt={image?.alt_description}
                    className="w-full h-auto object-cover rounded-lg max-h-svh"
                  />
                </div>
              ))}
            </div>
          </ImageBody>
          <SkeltonLoading page={page} setPage={setPage} />
          {isLoading && <a href='*' className='text-white animate-pulse m-10 text-center'>Loading ...</a>}
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </section>
    </main>
  );
}
