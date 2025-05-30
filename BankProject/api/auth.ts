// register

import { UserInfo } from "@/types/types";
import instance from ".";
import { storeToken } from "./storage";

const register = async (userInfo: UserInfo, image: string) => {
  try {
    console.log("USERINFO", userInfo);
    const formData = new FormData();
    formData.append("username", userInfo.username);
    formData.append("password", userInfo.password);

    formData.append("image", {
      name: image,
      uri: image,
      type: "image/jpeg",
    } as any);

    console.log("FormateData", formData);
    const response = await instance.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Data from register", response);
    await storeToken(response.data.token);
    return response.data;
  } catch (error) {
    console.log("register api", error);
    throw error;
  }
};

const login = async (userInfo: UserInfo) => {
  try {
    const { data } = await instance.post("/auth/login", userInfo);
    console.log("check token DATA:", data);
    await storeToken(data.token);
    return data;
  } catch (error) {
    console.log("Login api", error);
    throw error;
  }
};

export { login, register };
