import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://bongo-discovery-server.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
