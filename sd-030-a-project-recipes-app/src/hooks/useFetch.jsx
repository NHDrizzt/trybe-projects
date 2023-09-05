const useFetch = () => {
  const fetchData = async (fn, setFoodDetail) => {
    try {
      const response = await fn();
      setFoodDetail(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  return { fetchData };
};

export default useFetch;
