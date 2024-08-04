const handleOnSearch = async () => {

    try {
      const response = await fetch(`${apiUrl}/search/photos?page=${page}&query=${searchValue}&client_id=${accessToken}`);
      const data = await response.json();
      if (response.ok) {
        setLoadValue("loading...")
        setImages((oldImages) => {
          return [...oldImages, ...data.results]
        });
      } else {
        setLoadValue("Check Your Internet...")
        setInterSect(false)
      }
    } catch (error) {
      console.error("internet error");
      setLoadValue("Check Your Internet...")
      setInterSect(false)

    }
  };

  export default handleOnSearch