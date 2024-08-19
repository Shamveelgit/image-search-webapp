import { useEffect } from "react"

export default function ImageBody(props) {

    var {
        image,
        children
    } = props

    // console.log(children);
    useEffect(() => {

      console.log("image body");
      
    },[image])
    

  return (
    <>
      {children}      
    </>
  )
}
