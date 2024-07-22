import React, { useEffect, useRef } from 'react'
import useInterSection from '../hooks/interSection'

export default function SkeltonLoading(props) {
    const {page,setPage} = props
    const [isVisible,ref,setVisible] = useInterSection({
        threshold : 1
    })
    


    useEffect(() => {
        setTimeout(() => {
          // isVisible ?  setPage(page + 1): null
        },5000)
    },[isVisible])

    window.onloadeddata = () => {
      console.log("loaded....");
    }

  return (
    <div  className=' 2xl:columns-6 max-sm:columns-1 max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 p-5 w-full *:break-inside-avoid *:gap-5 *:m-5'>
                  <div ref={ref} className=' max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse' > 
                    
                  </div>
                  <div className='max-sm:hidden max-w-full h-auto min-h-52 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  <div className='max-sm:hidden max-w-full h-auto min-h-52 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  <div className='max-md:hidden max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  <div className='max-lg:hidden max-w-full h-auto min-h-72 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                   <div className=' max-2xl:hidden max-w-full h-auto min-h-56 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  <div className=' max-2xl:hidden max-w-full h-auto min-h-64 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  <div className='max-sm:hidden max-w-full h-auto min-h-60 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  <div className='max-md:hidden max-w-full h-auto min-h-52 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  <div className='max-lg:hidden max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                   <div className=' max-2xl:hidden max-w-full h-auto min-h-52 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  <div className=' max-2xl:hidden max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  
    </div>
  )
}
