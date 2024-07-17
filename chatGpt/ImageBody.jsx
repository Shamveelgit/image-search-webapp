import React from 'react';

export default function ImageBody({ isLoading, images, children }) {
  if (isLoading) {
    return (
      <div className='columns-6 max-sm:columns-1 max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 p-5 w-full'>
        {Array(12).fill(0).map((_, index) => (
          <div key={index} className='m-5 mb-0 max-w-full h-auto min-h-80 rounded-lg bg-gray-600 animate-pulse'></div>
        ))}
      </div>
    );
  }

  return children;
}
