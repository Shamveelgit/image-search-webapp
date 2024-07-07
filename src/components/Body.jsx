import React, { useEffect, useState } from 'react'
import backgroundImage from "../assets/bg-img.jpg"

export default function Body() {
    const apiUrl = "https://api.unsplash.com/"
    const accessToken = "JHFGRqSNi5MGfJgMmu_R_tfDweoxn2b_W7zI2ctvuTc"
    const [page,setpage] = useState(1)
    var [random,SetRandom] = useState([])
    var [newImages,setNewImages] = useState([]) 


    const arr = [21,212,212,32,43,32,32,32]

    useEffect(() => {
        fetch(`${apiUrl}/photos?page=${1}&per_page=11&client_id=${accessToken}`)
        .then((val) => val.json())
        .then(val => {setNewImages(val);})
    },[newImages])



  return (
    <main className='min-h-screen'>
        <section className='w-full min-h-[22rem] bg-fullScreen max-2xl:bg-largeScreen bg-mainImage bg-no-repeat bg-scroll object-fill bg-center flex items-center justify-center'>
            <h1 className=' text-center text-[250%] capitalize w-full  text-white font-Ui translate-y-6'>Discover the Art of Artists,<br />
            Photos of Professional Photographers</h1>
        </section>
        <div className='w-full flex items-center justify-center '>
            <input  className=' peer font-sans text-lg p-6 focus:border-none outline-none border-none focus:outline-offset-0 w-[40%] translate-y-[-50%] h-[3.5rem] text-pretty rounded-leftSide focus:outline-2 focus:outline-green-600' type="text" placeholder='Search Images here' />
            <button className=' peer-focus:outline-2 peer-focus:outline-offset-0 peer-focus:outline outline-green-600  text-gray-300 font-semibold hover:text-white w-[7rem] bg-green-600 h-[3.5rem] translate-y-[-50%] rounded-rightSide text-xl font-Ui'>Search</button>
        </div>
        <section className=' flex justify-center items-center w-full '>
            <div className='flex flex-wrap items-start content-center'>
            {
                newImages.map((val,index) => {
                    return (
                            <div key={index} id='iamge-box' className='max-sm:flex-[100%] max-md:flex-[50%] max-h- max-lg:flex-[33.33%] max-2xl:flex-[25%] m-4'>
                                <img key={index} src={val.urls.regular} alt="" />
                            </div>
                    )
                })
            }
            </div>
        </section>
    </main>
  )
}
