import React, { useEffect, useRef } from 'react'
import useInterSection from '../hooks/interSection'

export default function SkeltonLoading(props) {
    const {page,setPage} = props
    const [isVisible,ref,setVisible] = useInterSection({
        threshold : 0.5 
    })

    useEffect(() => {
        isVisible ?  setPage(page + 1): null
    },[isVisible])

  return (
    <div  className='columns-6 max-sm:columns-1 max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 p-5 w-full min-h-screen'>
                  <div ref={ref} className='m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse' > 
                    
                  </div>
                  <div className='max-sm:hidden m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  <div className='max-md:hidden m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  <div className=' max-lg:hidden m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                   <div className=' max-xl:hidden m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  <div className=' max-2xl:hidden m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse' > 
                 
                  </div>
                  
    </div>
  )
}
