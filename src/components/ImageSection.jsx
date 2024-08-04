import React, { useEffect, useState } from 'react'
import ImageBody from './ImageBody';
import SkeltonLoading from './SkeltonLoading';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HandleOnSearch from './functions/HandleOnSearch';

function ImageSection(props) {

    var {dispatch} = props
    
    const apiUrl = useSelector(state => state.apiUrl)
    const accessToken = useSelector(state => state.apiAccessToken)
    const images = useSelector(state => state.images)
    const page = useSelector(state => state.apiPage)
    const searchValue = useSelector(state => state.searchValue)

    const [imgLoading,setImgLoading] =useState(true)
    console.log("image section");

    const handleOnSearch = HandleOnSearch()


    useEffect(() => {
        if(searchValue) {
          console.log("search value");
          handleOnSearch()
          }else {
          console.log("not search value");
          const fetchImages = async () => {
            try {
              const response = await fetch(`${apiUrl}/photos?page=${page}&per_page=10&client_id=${accessToken}`);
              const data = await response.json();
              if (response.ok) {
                dispatch({
                  type : "add-images",
                  payload :data
                })
                setTimeout(() => {
                  dispatch({
                    type : "intersect",
                    payload : true
                  })
  
                },2000)
              }else{
                dispatch({
                  type : "loadValue",
                  payload : "Server Not Responding.."
                })
                dispatch({
                  type : "intersect",
                  payload : false
                })
              }
            } catch (error) {
              console.log("Check your internet");
              dispatch({
                  type : "loadValue",
                  payload : "Check your internet"
                })
              dispatch({
                type : "intersect",
                payload : false
              })
            }
          };
        fetchImages();
        }
  
      }, [page]);

      

  return (
      <main>
          <section className="flex items-center justify-center">
              <div className="max-w-7xl bg-largeScreen w-full pt-5">
                  <ImageBody images={images}>
                      <div className={`columns-6 max-sm:columns-1 max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 p-5 w-full break-after-avoid`}>
                          {images ? images.map((image, index) => (
                              <div key={index} className={`${imgLoading ? "h-72" : ''} group m-5 mb-0 rounded-lg bg-gray-600 break-inside-avoid relative aspect-auto `}>
                                  <img onLoad={() => {
                                    setImgLoading(false)
                                  }}
                                  style={
                                    {
                                        backgroundImage : `url(${image?.urls?.small})`
                                    }
                                  }
                                      src={image?.urls?.regular}
                                      alt={image?.alt_description}
                                      className={`backdrop-brightness-100 cursor-zoom-in w-full h-auto object-cover rounded-lg max-h-svh bottom-1`}
                                  />
                                  <div className='w-full h-full absolute group-hover:bg-halfBlack hidden group-hover:block  bottom-0'>

                                  </div>
                                  <div className=''>

                                      <div className='shadow-2xl shadow-white overflow-hidden group-hover:block hidden  h-10 rounded-full w-10 absolute text-white bottom-5 bg-slate-400 left-5'>
                                          <img src={image?.user?.profile_image?.medium} className=' cursor-pointer w-full h-full ' alt="dp" />
                                      </div>
                                      <div className='absolute h-7 bottom-5 ml-10 min-w-9 left-8 text-emerald-50 opacity-80 hover:opacity-100 font-Ui text-sm hidden group-hover:block'>
                                          <h5 className='text-center cursor-pointer'>{image?.user?.name}</h5>
                                      </div>
                                  </div>

                              </div>
                          )) : ''}
                      </div>
                  </ImageBody>
                  <SkeltonLoading />

              </div>
          </section>

      </main>
  )
}

export default ImageSection