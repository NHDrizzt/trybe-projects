import { useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (fn, setContextStatePlanets) => {
    try {
      setIsLoading(true);
      const response = await fn();
      setContextStatePlanets(response.results);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchData };
};

export default useFetch;
