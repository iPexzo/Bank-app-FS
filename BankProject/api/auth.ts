// register

import { UserInfo } from "@/types/types";
import instance from ".";
import { storeToken } from "./storage";

const register = async (userInfo: UserInfo, image: string) => {
  const formData = new FormData();
  formData.append("email", userInfo.userName);
  formData.append("password", userInfo.password);
  formData.append("image", {
    name: "image.jpg",
    uri: image,
    type: "image/jpeg",
  } as any);
  const { data } = await instance.post("/auth/register", formData);
  await storeToken(data.token);
  return data;
};

const login = async (userInfo: UserInfo) => {
  const { data } = await instance.post("/auth/login", userInfo);
  await storeToken(data.token);
  return data;
};

export { register, login };
