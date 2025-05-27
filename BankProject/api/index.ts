import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "https://react-bank-project.eapi.joincoded.com/mini-project/api",
});

instance.interceptors.request.use(
  async (req) => {
    const token = await getToken();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
