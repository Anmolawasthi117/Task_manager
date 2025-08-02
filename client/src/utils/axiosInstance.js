import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-manager-nvld.vercel.app/",  
  withCredentials: true,                   
});

export default instance;
