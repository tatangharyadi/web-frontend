import axios from "axios";

const axiosCMS = axios.create({
  baseURL: "http://strapi:1337/",
});

axiosCMS.interceptors.request.use(function (config) {
  config.withCredentials = true;
  return config;
});

const axiosAPI = axios.create({
  baseURL: "http://api:3000/api/",
});

axiosAPI.interceptors.request.use(function (config) {
  config.withCredentials = true;
  return config;
});

const axiosAPIAlt = axios.create({
  baseURL: "http://localhost:8081/api/",
});

axiosAPI.interceptors.request.use(function (config) {
  config.withCredentials = true;
  return config;
});

export { axiosCMS, axiosAPI, axiosAPIAlt };
