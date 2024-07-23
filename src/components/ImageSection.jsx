import React from 'react'
import ImageBody from './ImageBody';
import SkeltonLoading from './SkeltonLoading';
import { Link } from 'react-router-dom';

function ImageSection(props) {

    const {images,page,setPage} = props
    console.log(images);

  return (
      <main>
          <section className="flex items-center justify-center">
              <div className="max-w-7xl bg-largeScreen w-full pt-5">
                  <ImageBody images={images}>
                      <div className="columns-6 max-sm:columns-1 max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 p-5 w-full break-after-avoid">
                          {images ? images.map((image, index) => (
                              <div key={index} className={` group m-5 mb-0 rounded-lg bg-gray-600 break-inside-avoid relative`}>
                                  <img
                                      src={image?.urls?.regular}
                                      alt={image?.alt_description}
                                      className=" backdrop-brightness-100 cursor-zoom-in w-full h-auto object-cover rounded-lg max-h-svh before:w-full before:bg-green-400 before:h-1/2 before:absolute bottom-1"
                                  />
                                  <div className='w-full h-full absolute group-hover:bg-halfBlack hidden group-hover:block  bottom-0'>

                                  </div>
                                  <div>

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
                  <SkeltonLoading page={page} setPage={setPage} />
                  <a href="*" className="text-white animate-pulse m-10 text-center">Loading ...</a>
              </div>
          </section>
      </main>
  )
}

export default ImageSection