import { useState, useEffect } from "react";

const API_URL = "https://www.omdbapi.com/?apikey=9a53bb2a";

const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || data);
        setIsError({ show: false, msg: "" });
      } else {
        setIsLoading(false);
        setIsError({ show: true, msg: data.Error });
      }
    } catch (error) {
      setIsLoading(false);
      setIsError({ show: true, msg: "Something went wrong!" });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getMovie(`${API_URL}&${apiParams}`);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;
