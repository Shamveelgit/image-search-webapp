import React, { useEffect, useRef, useState } from 'react'

export default function useInterSection(option,interSect) {
    let [isVisible, setVisible] = useState(false)
    var targetRef = useRef(null)

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
    },[option])


    return [isVisible,targetRef,setVisible]
}
