import axios from "axios";
import { getSession } from "next-auth/client";

const axiosCMS = axios.create({
  baseURL: "http://strapi:1337/",
});

axiosCMS.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

const axiosAPI = axios.create({
  baseURL: "http://api:3000/api/",
});

axiosAPI.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session) {
    config.headers.Authorization = `Bearer ${session?.accessToken}`;
  }
  config.withCredentials = true;

  return config;
});

export { axiosCMS, axiosAPI };
