import React, { useEffect, useState } from 'react';

export default function Body() {
  const apiUrl = "https://api.unsplash.com/";
  const accessToken = "JHFGRqSNi5MGfJgMmu_R_tfDweoxn2b_W7zI2ctvuTc";
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [skeltonLoader,setSkeltonValue] = useState(true) 
  var [dummyApi,SetDummy] = useState([1,2,3,4,5,6,7,8,9,0,22,12,323,])

  useEffect(() => {
    try {
      setTimeout(() => {
        fetch(`${apiUrl}/photos?page=${page}&per_page=20&client_id=${accessToken}`)
      .then((response) => response.json())
      .then((data) => {setImages(data)})
      .catch((error) => console.log(error));
      setSkeltonValue(false)
      },2000)
    }
    catch {
      console.log("error");
    }
  }, [page,setSkeltonValue,skeltonLoader]);

  const handleOnSearch = () => {
    setImages([])
    fetch(`${apiUrl}search/photos?page=1&query=${searchValue}&client_id=${accessToken}`)
      .then((response) => response.json())
      .then((data) => {setImages(data.results); console.log(data)})
      .catch((error) => console.log(error));
  };

  const searchBox = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <main className="min-h-screen">
      <section className="w-full min-h-[22rem] bg-fullScreen max-2xl:bg-largeScreen bg-mainImage bg-no-repeat bg-scroll object-fill bg-center flex items-center justify-center">
        <h1 className="text-center text-[250%] capitalize w-full text-white font-Ui translate-y-6">
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
      <section className="w-full flex justify-center items-center">
        <div className="columns-4 p-5 w-full">
          {
            skeltonLoader ? dummyApi.map((val,index) => {
              return (
                <div key={index} className='m-5 w-11/12 min-h-svh bg-gray-600 rounded-lg animate-pulse'>

                </div>
              )
            })  : images.map((image, index) => (
              <div key={index} className={`m-5`}>
                <img key={index}
                  src={image.urls.regular}
                  alt={image.alt_description}
                  className="w-full h-auto object-cover rounded-lg max-h-svh"
                />
              </div>
            ))
          }
        </div>
      </section>
    </main>
  );
}
