import axios from "axios";

const axiosCMS = axios.create({
  baseURL: "http://strapi:1337/",
});

axiosCMS.interceptors.request.use(function (config) {
  config.withCredentials = true;
  return config;
});

export { axiosCMS };
