import React, { useCallback, useEffect, useRef, useState } from 'react'
import ImageBody from './ImageBody';
import SkeltonLoading from './SkeltonLoading';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import handleOnSearch from './functions/HandleOnSearch';

function ImageSection() {


  const dispatch = useDispatch()


  const apiUrl = useSelector(state => state.apiUrl)
  const accessToken = useSelector(state => state.apiAccessToken)
  const images = useSelector(state => state.images)
  const page = useSelector(state => state.apiPage)
  const searchValue = useSelector(state => state.searchValue)
  const [screenWidth,setScreenWidth] = useState(window.innerWidth)

  const [imgLoading, setImgLoading] = useState(true)
  const imageTag = useRef()

  useEffect(() => {
    const handlingResize = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize',handlingResize)
  })

  const getFilteredImages = (idOffset) => images.filter((_, index) => index % 4 === idOffset);

  const image_1 = screenWidth >= 640 ? getFilteredImages(0) : images
  const image_2 = screenWidth >= 768 ? getFilteredImages(1) : null;
  const image_3 = screenWidth >= 1024 ? getFilteredImages(2) : null;
  const image_4 = screenWidth >= 1280 ? getFilteredImages(3) : null;
  
  // Combine only non-empty arrays
  const combineImages = [image_1, image_2, image_3, image_4].filter(Boolean);
  




  useEffect(() => {
    if (searchValue) {
      handleOnSearch(apiUrl, page, searchValue, accessToken, dispatch)
    } else {
      console.log("not search value");
      const fetchImages = async () => {
        try {
          const response = await fetch(`${apiUrl}/photos?page=${page}&per_page=10&client_id=${accessToken}`);          
          const data = await response.json();
          if (response.ok) {
            dispatch({
              type: "add-images",
              payload: data
            })
            setTimeout(() => {
              dispatch({
                type: "intersect",
                payload: true
              })

            }, 2000)
          } else {
            dispatch({
              type: "loadValue",
              payload: "Server Not Responding.."
            })
            dispatch({
              type: "intersect",
              payload: false
            })
          }
        } catch (error) {
          console.log("Check your internet");
          dispatch({
            type: "loadValue",
            payload: "Check your internet"
          })
          dispatch({
            type: "intersect",
            payload: false
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
            <div className={`flex max-w-full flex-wrap`}>
              {
                combineImages.map((CImages, Cindex) => {
                  return (
                      <div key={Cindex} className=' max-sm:flex-[90%] max-md:flex-[50%] max-lg:flex-[33.33%] max-xl:flex-[25%] 2x flex-[16%] '>
                        {
                          CImages.map((image, index) => {
                            return (
                                <Link to={`/photos/${image.id}`} key={index}>
                                  <div className={` group m-5 mb-0 rounded-lg bg-gray-600 break-inside-avoid relative aspect-auto min-h-40 `}>
                                  <img
                                  ref={imageTag}
                                  onClick={()=> {
                                    imageTag.current.style.animation = 'test ease 1s forwards'
                                  }}
                                    onLoad={() => {
                                      setImgLoading(false)
                                    }}
                                    style={
                                      {
                                        backgroundImage: `url(${image?.urls?.small})`
                                      }
                                    }
                                    src={image?.urls?.regular}
                                    alt={image?.alt_description}
                                    className={`backdrop-brightness-100 cursor-zoom-in w-full h-auto object-cover rounded-lg max-h-svh bottom-1`}
                                  />
                                  <div className='w-full h-full absolute group-hover:bg-halfBlack rounded-md hidden group-hover:block  bottom-0'>

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
                              </Link>

                            )
                          })
                        }
                        <SkeltonLoading />

                      </div>
                  )
                })
              }
            </div>
          </ImageBody>

        </div>
      </section>

    </main>
  )
}

export default ImageSection