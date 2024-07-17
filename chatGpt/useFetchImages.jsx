import { useState, useEffect } from 'react';

const useFetchImages = (apiUrl, accessToken, searchValue, page) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const endpoint = searchValue 
          ? `${apiUrl}search/photos?page=1&query=${searchValue}&client_id=${accessToken}`
          : `${apiUrl}/photos?page=${page}&per_page=20&client_id=${accessToken}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        if (searchValue) {
          setImages(data.results);
        } else {
          setImages(prevImages => [...prevImages, ...data]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [apiUrl, accessToken, searchValue, page]);

  return { images, isLoading, error };
};

export default useFetchImages;
