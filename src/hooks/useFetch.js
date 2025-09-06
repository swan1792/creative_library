import { useEffect, useState } from "react";

function useFetch(url, method = "GET") {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [postData, setPostData] = useState(null);

  useEffect(() => {
    if (method === "POST" && !postData) return; // don't fetch until postData is set

    const abortController = new AbortController();
    const signal = abortController.signal;

    setLoading(true);
    setError(null);

    const fetchOptions = {
      method,
      signal,
    };

    if (method === "POST" && postData) {
      fetchOptions.headers = {
        "Content-Type": "application/json",
      };
      fetchOptions.body = JSON.stringify(postData);
    }

    fetch(url, fetchOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
        setError(null);
        if (method === "POST") {
          setPostData(null); // reset postData after success
        }
      })
      .catch((e) => {
        if (e.name === "AbortError") return; // ignore abort errors
        setError(e.message);
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [url, method, postData]);

  return { data, loading, error, setPostData };
}

export default useFetch;
