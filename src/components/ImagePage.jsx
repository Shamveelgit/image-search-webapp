import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

function ImagePage() {

  const dispatch = useDispatch()

  const images = useSelector(state => state.images)
  const apiUrl = useSelector(state => state.apiUrl)
  let mainImage = useSelector(state => state.mainImage)
  const accessToken = useSelector(state => state.apiAccessToken)

  const [userLiked ,setUserLiked] = useState(false)

  const { imageId } = useParams()



  // const [searchParam, setSearchParam] = useSearchParams()
  // const cls = searchParam.get("name ")

  useEffect(() => {
    let image = images.find((val) => val.id === imageId)
    if (image) {
      dispatch({
        type: "setMainImage",
        payload: image
      })
    } else {
      const fetchImages = async () => {
        try {
          const response = await fetch(`${apiUrl}/photos/${imageId}?client_id=${accessToken}`)
          const data = await response.json()
          if (response.ok) {
            dispatch({
              type: "setMainImage",
              payload: data
            })
            setTimeout(() => {
              dispatch({
                type: "intersect",
                payload: true
              })

            }, 2000)
          }
          else {
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
          console.log("catch called");

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

      }

      fetchImages()
    }
    console.log('rendered');
    
  }, [])

  return (
    <>
      <main className='mt-[150px] flex justify-center items-center text-white'>
        <section className='w-4/5 h-screen'>
          <div className=" w-full border">
            <img className='w-full h-96 object-contain rounded-lg' src={mainImage.urls?.regular} alt="" />
          </div>
          <div className=' p-10'>
              <h3>{mainImage.alt_description}</h3>
          </div>
          <div>
              <div className='flex items-center gap-2'>
              <svg className='w-9 h-12' onClick={() => {
                if(userLiked) {
                  setUserLiked(false)
                  
                }
                else {
                  setUserLiked(true)
                  
                }
              }} viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 48 48" fill="#000000" stroke={mainImage.liked_by_user || userLiked ? "none" : '#fff' }><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill={mainImage.liked_by_user || userLiked ? "#b11b1b" : 'none' } d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"></path> </g></svg>
              <p>{mainImage.likes}</p>
              </div>
              <div>

              </div>
          </div>
        </section>
        <div>
        </div>
      </main>

    </>
  )
}

export default ImagePage

