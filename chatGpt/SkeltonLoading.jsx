import React, { useEffect } from 'react';
import useIntersection from './useIntersection';

export default function SkeltonLoading({ page, setPage }) {
  const [isVisible, ref] = useIntersection({
    threshold: 0.5 
  });

  useEffect(() => {
    if (isVisible) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isVisible]);

  return (
    <div className='columns-6 max-sm:columns-1 max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 p-5 w-full min-h-screen'>
      <div ref={ref} className='m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse'></div>
      <div className='max-sm:hidden m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse'></div>
      <div className='max-md:hidden m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse'></div>
      <div className='max-lg:hidden m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse'></div>
      <div className='max-xl:hidden m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse'></div>
      <div className='max-2xl:hidden m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse'></div>
    </div>
  );
}
