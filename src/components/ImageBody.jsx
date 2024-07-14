import React,{Children} from 'react'

export default function ImageBody(props) {

    var {
        skeletonLoader,
        dummyApi,
        images,
        children
    } = props

  return (
    <>
        {children}
    </>
  )
}
