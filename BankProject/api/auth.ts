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
  try {
    console.log("FormateData Image", image);
    console.log("FormateData", userInfo);
    const { data } = await instance.post(
      "/mini-project/api/auth/register",
      formData
    );

    // await storeToken(data.token);
    return data;
  } catch (error) {
    console.log("register api", error);
  }
};

const login = async (userInfo: UserInfo) => {
  try {
    const { data } = await instance.post(
      "/mini-project/api/auth/login",
      userInfo
    );
    console.log("check token :", data.token);
    await storeToken(data.token);
    return data;
  } catch (error) {
    console.log("Login api", error);
  }
};

export { login, register };
