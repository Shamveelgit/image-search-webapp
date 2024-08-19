import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function useInterSection(option) {
    let [isVisible, setVisible] = useState(false)
    var targetRef = useRef(null)
    const interSect = useSelector(state => state.intersectStatus)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.isIntersecting ? setVisible(true) : setVisible(false)
            })
        },option)

        if(interSect) {
            observer.observe(targetRef.current)
        }else {
            observer.unobserve(targetRef.current)
        }
    },[option,interSect])


    return [isVisible,targetRef,setVisible]
}
