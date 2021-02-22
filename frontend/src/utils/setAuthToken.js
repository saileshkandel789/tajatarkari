import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // apply to every request
    console.log("ayo");
    axios.defaults.headers.common["Authorization"] = token;
    // const axiosInstance = axios.create();
    // axiosInstance.interceptors.request.use((req) => {
    //   return req;
    // })
    // axiosInstance.interceptors.response.use((res) => {
    //   return res;
    // },(error) => {
    //   console.log(error.response,'axiosinterceptor');
    // })
  } else {
    // delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
