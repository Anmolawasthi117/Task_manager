import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-manager-nvld.vercel.app/api/v1/",  
  withCredentials: true,                   
});

export default instance;
