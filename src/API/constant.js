import axios from "axios";

let domain = "http://localhost:8080/";

const instance = axios.create({
    baseURL: domain + "mandi",
  });
  

  
export default instance;
  