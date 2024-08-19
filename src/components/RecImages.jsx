import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SkeletonLoading from './SkeltonLoading'
import { useDispatch, useSelector } from 'react-redux'
import ImageBody from './ImageBody'


function RecImages(props) {

    let { data,imageId } = props
    // const [page, setPage] = useState(1)    

    const images = useSelector(state => state.recomendedImages)
    const accessToken = useSelector(state => state.apiAccessToken)
    const apiUrl = useSelector(state => state.apiUrl)
    const dispatch = useDispatch()
    const page = useSelector(state => state.apiPage)
    const mainImage = useSelector(state => state.mainImage)
  const [screenWidth,setScreenWidth] = useState(window.innerWidth)



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
        async function recImg() {
            console.log('api called');
            
            try {
                let response = await fetch(`${apiUrl}/search/photos?page=${page}&query=${data?.slug}&client_id=${accessToken}`)
                let resData = await response.json()
                if (response.ok) {
                    dispatch({
                        type: "add-RecImages",
                        payload: resData.results
                    })

                    setTimeout(() => {
                        dispatch({
                            type: "intersect",
                            payload: true
                        })

                    }, 2000)
                }
                else {
                    console.log(" 404 error");
                    dispatch({
                        type: "loadValue",
                        payload: "Server Not Responding.."
                    })
                    dispatch({
                        type: "intersect",
                        payload: false
                    })

                }
            }
            catch {
                console.log("failed to call api");
                dispatch({
                    type: "loadValue",
                    payload: "Check your internet"
                })
                dispatch({
                    type: "intersect",
                    payload: false
                })

            }
        }
        recImg()
    }, [page,imageId,])



    return (
        <>
            <main>
                <section className="flex items-center justify-center">
                    <div className="max-w-7xl bg-largeScreen w-full pt-5">
                        <ImageBody  image={mainImage}>
                            <div className={`flex max-w-full flex-wrap`}>
                                {
                                    combineImages.map((CImages, Cindex) => {
                                        return (
                                            <div key={Cindex} className=' max-sm:flex-[90%] max-md:flex-[50%] max-lg:flex-[33.33%] max-xl:flex-[25%] 2x flex-[16%] '>
                                                {
                                                    CImages.map((image, index) => {
                                                        return (
                                                            <Link to={`/photos/${image.id}`} key={image.id}>
                                                                <div className={` group m-5 mb-0 rounded-lg bg-gray-600 break-inside-avoid relative aspect-auto min-h-40 `}>
                                                                    <img
                                                                        onLoad={() => {
                                                                            //   setImgLoading(false)
                                                                        }}
                                                                        style={
                                                                            {
                                                                                backgroundImage: `url(${image?.urls?.small})`
                                                                            }
                                                                        }
                                                                        src={image?.urls?.regular}
                                                                        alt={image?.alt_description}
                                                                        className={` min-h-40 backdrop-brightness-100 cursor-zoom-in w-full h-auto object-cover rounded-lg max-h-svh bottom-1`}
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
                                                <SkeletonLoading />

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </ImageBody>

                    </div>
                </section>

            </main>
        </>
    )
}

export default RecImages