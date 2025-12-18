import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://parking-1bm4.onrender.com',
  withCredentials: false
});

export default axiosInstance;