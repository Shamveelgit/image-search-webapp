async function handleOnSearch(apiUrl,page,searchValue,accessToken,dispatch) {


  dispatch({
    type : "create-images",
    payload : []
})
  dispatch({
    type : "page",
    payload : 1
  })

  try {
      const response = await fetch(`${apiUrl}/search/photos?page=${page}&query=${searchValue}&client_id=${accessToken}`);      
      const data = await response.json();
      if(response.ok) {
          dispatch({
              type : "add-images",
              payload :data.results 
            })
            setTimeout(() => {
              dispatch({
                type : "intersect",
                payload : true
              })
            },2000)
      }else {
          dispatch({
              type : "loadValue",
              payload : "Server Not Responding.."
            })
            dispatch({
              type : "intersect",
              payload : false
            })
      }
      
  }
  catch(error) {
      console.log(error);
      dispatch({
          type : "loadValue",
          payload : "Check your internet"
        })
      dispatch({
        type : "intersect",
        payload : false
      })
  }
}
export default handleOnSearch