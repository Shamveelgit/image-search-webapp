import React from 'react'
import ImageBody from './ImageBody';
import SkeltonLoading from './SkeltonLoading';
import { Link } from 'react-router-dom';

function ImageSection(props) {

    const {images,page,setPage} = props

  return (
      <main>
          <section className="flex items-center justify-center">
              <div className="max-w-7xl bg-largeScreen w-full pt-5">
                  <ImageBody images={images}>
                      <div className="columns-6 max-sm:columns-1 max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 p-5 w-full break-after-avoid">
                          {images ? images.map((image, index) => (
                              <Link to={"/home"}>
                                  <div key={index} className={`m-5 mb-0 rounded-lg bg-gray-600 break-inside-avoid`}>
                                      <img
                                          src={image?.urls?.regular}
                                          alt={image?.alt_description}
                                          className="w-full h-auto object-cover rounded-lg max-h-svh"
                                      />
                                  </div>
                              </Link>
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