import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageBody from './ImageBody';
import SkeletonLoading from './SkeltonLoading';
import { Link, NavLink } from 'react-router-dom';


function RecImages({ mainImage }) {

    // const apiUrl = useSelector(state => state.apiUrl)
    // const accessToken = useSelector(state => state.apiAccessToken)
    const page = useSelector(state => state.apiPage)
    const recImages = useSelector(state => state.recomendedImages)
    const dispatch = useDispatch()
    const [combineImages, setCombineImages] = useState([])    
   
    let getFilteredImages = (recImages, idOffset, ratio) => {
        return recImages.filter((val, index,ar,) => {
            return (index - idOffset) % ratio === 0;
        })
    }    

    
    let groupImages = useCallback((images) => {
        
        if (window.innerWidth >= 1024) {
            setCombineImages([getFilteredImages(images, 0, 4),
            getFilteredImages(images, 1, 4),
            getFilteredImages(images, 2, 4),
            getFilteredImages(images, 3, 4)])
        }

        else if (window.innerWidth >= 768) {
            setCombineImages(
            [getFilteredImages(images, 0, 3),
            getFilteredImages(images, 1, 3),
            getFilteredImages(images, 2, 3)])
        }

        else if 
        (window.innerWidth >= 640) {
            console.log("1st one");
            
            setCombineImages([getFilteredImages(images, 0, 2),
            getFilteredImages(images, 1, 2)])
        }
        else if(window.innerWidth < 640){
            setCombineImages(images)
        }
        
    },[recImages,window.innerWidth])

    let fetchRecImages = useCallback(async () => {
        try {
            let response = await fetch(`http://localhost:4000/photos/${page}`)
            let data = await response.json()
            if(response.ok) {
                if (recImages.length) {
                    dispatch({
                        type: "add-RecImages",
                        payload: data.results
                    })
                    
                }
                else {
                    dispatch({
                        type: 'create-RecImages',
                        payload: data.results
                    })
                }
                setTimeout(() => {
                    dispatch({
                        type: "intersect",
                        payload: true
                    })

                }, 2000)
            }else {
                dispatch({
                    type: "intersect",
                    payload: false
                })
                dispatch({
                    type: "loadValue",
                    payload: "Server Busy"
                })
            }
        }
        catch {
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

    },[page])


useEffect(() => {
    mainImage && fetchRecImages()
    groupImages(recImages)
    console.log(combineImages);
}, [page,mainImage])

return (
    <main>
        <section className="flex items-center justify-center">
                <div className="max-w-7xl bg-largeScreen w-full pt-5">
                    <ImageBody>
                        <div className="flex max-w-full flex-wrap">
                            {combineImages && combineImages.map((CImages, Cindex) => (
                                <div
                                    key={Cindex}
                                    className="max-sm:flex-[90%] max-md:flex-[50%] max-lg:flex-[33.33%] lg:flex-[25%]"
                                >{CImages?.length && CImages.map((image, index) => (
                                    <Link to={`/photos/${image.id}`} key={index}>
                                        <div className="group m-5 mb-0 rounded-lg bg-gray-600 relative aspect-auto min-h-40 max-h-96 overflow-hidden">
                                            <img
                                                style={{
                                                    backgroundImage: `url(${image?.urls?.small})`,
                                                }}
                                                src={image?.urls?.regular}
                                                alt={image?.alt_description}
                                                className="min-h-40 max-h-full backdrop-brightness-100 cursor-zoom-in w-full h-auto object-cover rounded-lg bottom-1"
                                            />
                                            <div className="w-full h-full absolute group-hover:bg-halfBlack rounded-md hidden group-hover:block bottom-0"></div>
                                            <div>
                                                <div className="shadow-2xl shadow-white overflow-hidden group-hover:block hidden h-10 rounded-full w-10 absolute text-white bottom-5 bg-slate-400 left-5">
                                                    <img
                                                        src={image?.user?.profile_image?.medium}
                                                        className="cursor-pointer w-full h-full"
                                                        alt="dp"
                                                    />
                                                </div>
                                                <div className="absolute h-7 bottom-5 ml-10 min-w-9 left-8 text-emerald-50 opacity-80 hover:opacity-100 font-Ui text-sm hidden group-hover:block">
                                                    <h5 className="text-center cursor-pointer">
                                                        {image?.user?.name}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                    <SkeletonLoading />
                                </div>
                            ))}
                        </div>
                    </ImageBody>
                </div>
            </section>
    </main>
);
}

export default RecImages;
