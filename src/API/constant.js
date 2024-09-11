import axios from "axios";

// let domain = "http://localhost:5000/";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

//for production

// let domain = "http://34.131.74.233:8080/api";

// const instance = axios.create({
//     baseURL: domain,
//   });
// in package.json file
// "homepage": "http://34.131.74.233/",

  

  
  
export default instance;
  