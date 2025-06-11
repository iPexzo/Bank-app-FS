import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
const storeToken = async (token: string) => {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem("token", token);
  } else {
    await SecureStore.setItemAsync("token", token);
  }
};
const getToken = async () => {
  if (Platform.OS === "web") {
    const token = await AsyncStorage.getItem("token");
    return token;
  } else {
    const token = await SecureStore.getItemAsync("token");
    return token;
  }
};
const deleteToken = async () => {
  if (Platform.OS === "web") {
    await AsyncStorage.removeItem("token");
  } else {
    await SecureStore.deleteItemAsync("token");
  }
};
export { deleteToken, getToken, storeToken };
