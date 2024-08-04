import React, { useEffect } from 'react';
import useInterSection from '../hooks/interSection';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function SkeletonLoading(props) {
  const dispatch = useDispatch()
  const page = useSelector(state => state.apiPage) 
  const loadValue = useSelector(state => state.loadValue) 
  const interSect = useSelector(state => state.intersectStatus) 

  const [isVisible, ref, setVisible] = useInterSection({
    threshold: 1
  },interSect);

  useEffect(() => {
    console.log(interSect);
    if (isVisible && interSect) {
      setVisible(false);
      dispatch({
        type : "intersect",
        payload : false
      })
      setTimeout(() => {
        dispatch({
          type : "page",
          payload : page + 1
        })
      }, 1);
    }
  }, [interSect,isVisible]);

  const skeletonClasses = 'relative group max-w-full h-auto rounded-lg bg-gray-600 animate-pulse';

  return (
    <>
      <div className='relative columns-2 2xl:columns-5 max-sm:columns-1 max-md:columns-2 max-lg:columns-3 max-xl:columns-4 max-2xl:columns-4 max-w-full *:break-inside-avoid *:m-5'>
        <div ref={ref} className={`${skeletonClasses} min-h-80`}>
          <div className='hidden group-hover:block'>
            <div className='shadow-2xl shadow-white overflow-hidden h-10 rounded-full w-10 absolute text-white bottom-5 bg-slate-400 left-5'></div>
            <div className='rounded-2xl translate-y-[-40%] absolute min-h-3 bottom-6 animate-pulse ml-12 min-w-24 bg-slate-400 left-7 text-emerald-50 opacity-80 hover:opacity-100 font-Ui text-sm'></div>
          </div>
        </div>
        {Array.from({ length: 9  }).map((_, index) => (
          <div
            key={index}
            className={`${skeletonClasses}x ${ index % 2 === 0 ? 'min-h-52 max-md:hidden' : 'min-h-80 max-lg:hidden'} ${index>=1 ? 'max-md:block' : ""}`}
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
