import { useEffect } from "react";
import axios from "axios";

export default function useUser(
  isEdit,
  headers,
  userId,
  setCredentials,
  setIsLoading,
  setError
) {
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getUser = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user/${userId}`,
          {
            headers,
            cancelToken: source.token,
          }
        );
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          ...res.data,
        }));
      } catch (err) {
        setError(err.response.data.message);
        setTimeout(() => {
          setError("");
        }, "3000");
      } finally {
        setIsLoading(false);
      }
    };
    if (isEdit) {
      getUser();
    }
    return () => {
      source.cancel("Request canceled by user");
    };
  }, [userId, headers, isEdit]);
}
