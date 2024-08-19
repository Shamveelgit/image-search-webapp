import React, { useEffect } from 'react';
import useInterSection from '../hooks/interSection';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function SkeletonLoading(props) {
  const dispatch = useDispatch()
  const page = useSelector(state => state.apiPage) 
  // const loadValue = useSelector(state => state.loadValue) 
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
          payload : page+1
        })
      }, 1);
    }
  }, [isVisible]);

  const skeletonClasses = 'relative group max-w-full h-auto rounded-lg bg-gray-600 animate-pulse';

  return (
    <>
      <div ref={ref} className={`${skeletonClasses} min-h-80 m-5 `}>
          <div className='hidden group-hover:block'>
            <div className='shadow-2xl shadow-white overflow-hidden h-10 rounded-full w-10 absolute text-white bottom-5 bg-slate-400 left-5'></div>
            <div className='rounded-2xl translate-y-[-40%] absolute min-h-3 bottom-6 animate-pulse ml-12 min-w-24 bg-slate-400 left-7 text-emerald-50 opacity-80 hover:opacity-100 font-Ui text-sm'></div>
          </div>
        </div>
    </>
  );
}
