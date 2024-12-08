
import { ApiAdmin } from "api/ApiAdmin";
import { useEffect,useState } from "react";

const delay = () => {
  return new Promise((resolve) => setTimeout(() => resolve("delay"), 2000));
};

const useFetch = (url, config = {}) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
const getPosts=()=>{
  (async () => {
    try {
      setLoading(true);
      const response = await ApiAdmin.products(url);
      await delay();
      setData(response);

    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  })();
}
  useEffect(() => {
    getPosts()
    
  }, [url]);

 
  return { data, loading, error , getPosts};
};

export { useFetch };
