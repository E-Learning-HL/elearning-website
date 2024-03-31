import axios from "axios";

const wpAxios = () => {
  const newAxios = axios;
  newAxios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // console.log("Request sent:", config?.url);
      return config;
    },
    function (error) {
      // Do something with request error
      // console.error("Request error:", error);
      return Promise.reject(error);
    }
  );
  return newAxios;
};
export default wpAxios;
