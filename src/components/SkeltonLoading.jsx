import React, { useEffect } from 'react';
import useInterSection from '../hooks/interSection';
import { Link } from 'react-router-dom';

export default function SkeletonLoading(props) {
  const { page, setPage, loadValue, interSect, setInterSect } = props;
  const [isVisible, ref, setVisible] = useInterSection({
    threshold: 1
  });

  useEffect(() => {
    if (isVisible && interSect) {
      setVisible(false);
      setInterSect(false);
      setTimeout(() => {
        setPage((oldPage) => {
          console.log(oldPage);
          return oldPage + 1;
        });
        console.log(page);
      }, 1);
    }
  }, [isVisible, interSect, setInterSect, setVisible, setPage, page]);

  const skeletonClasses = 'relative group max-w-full h-auto rounded-lg bg-gray-600 animate-pulse';

  return (
    <>
      <div className='relative 2xl:columns-6 max-sm:columns-2  max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 p-5 w-full *:break-inside-avoid *:gap-5 *:m-5'>
        <div ref={ref} className={`${skeletonClasses} min-h-80`}>
          <div className='hidden group-hover:block'>
            <div className='shadow-2xl shadow-white overflow-hidden h-10 rounded-full w-10 absolute text-white bottom-5 bg-slate-400 left-5'></div>
            <div className='absolute h-7 bottom-5 ml-10 min-w-9 left-8 text-emerald-50 opacity-80 hover:opacity-100 font-Ui text-sm'></div>
          </div>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`${skeletonClasses} ${console.log()} ${index % 2 === 0 ? 'min-h-52 max-md:hidden' : 'min-h-80 max-lg:hidden'}`}
          >
            <div className='hidden group-hover:block'>
              <div className='shadow-2xl shadow-white overflow-hidden h-10 rounded-full w-10 absolute text-white bottom-5 bg-slate-400 left-5'></div>
              <div className=' rounded-2xl translate-y-[-40%] absolute min-h-3 bottom-6 animate-pulse ml-12 min-w-24 bg-slate-400 left-7 text-emerald-50 opacity-80 hover:opacity-100 font-Ui text-sm'></div>
            </div>
          </div>
        ))}
      </div>

      <Link to="">
        <h1 className="text-white animate-pulse m-10 text-center">{loadValue}</h1>
      </Link>
    </>
  );
}
