import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import handleOnSearch from './functions/HandleOnSearch';

function SearchSection( props) {

    const apiUrl = useSelector(state => state.apiUrl)
    const page = useSelector(state => state.apiPage)
    const searchValue = useSelector(state => state.searchValue)
    const accessToken = useSelector(state => state.apiAccessToken)

    const dispatch =useDispatch()

    console.log("search section running");
    

    const handleSearchChange = (event) => {
        dispatch({
          type : "input",
          payload : event.target.value
        })
      };

      useEffect(() =>{

      },[page])

      

  return (
      <>
          <section className="w-full min-h-[22rem] max-2xl:bg-largeScreen 2xl:bg-screenWidth max-sm:bg-phoneImage max-md:bg-tabImage max-lg:bg-pcImage max-xl:bg-tvImage max-2xl:bg-mainImage bg-mainImage bg-no-repeat bg-scroll object-fill bg-center flex items-center justify-center">
              <h1 className="text-center text-[250%] max-md:text-lg capitalize w-full text-white font-Ui translate-y-6">
                  Discover the Art of Artists,<br />
                  Photos of Professional Photographers
              </h1>
          </section>
          <div className="w-full flex items-center justify-center">
              <input
                  onChange={handleSearchChange}
                  className="peer font-sans text-lg p-6 focus:border-none outline-none border-none focus:outline-offset-0 w-[40%] translate-y-[-50%] h-[3.5rem] text-pretty rounded-leftSide focus:outline-2 focus:outline-green-600"
                  type="text"
                  placeholder="Search Images here"
              />
              <button
                  onClick={() => {
                    dispatch({
                        type : "create-images",
                        payload : []
                    })
                      dispatch({
                        type : "page",
                        payload : 1
                      })
                      handleOnSearch(apiUrl,page,searchValue,accessToken,dispatch)
                  }}
                  className="peer-focus:outline-2 peer-focus:outline-offset-0 peer-focus:outline outline-green-600 text-gray-300 font-semibold hover:text-white w-[7rem] bg-green-600 h-[3.5rem] translate-y-[-50%] rounded-rightSide text-xl font-Ui"
              >
                  Search
              </button>
          </div>
      </>
  )
}
export default SearchSection
