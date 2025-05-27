import { register } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Register = () => {
  const [image, setImage] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const { mutate, data } = useMutation({
    mutationKey: ["RegisterFn"],
    mutationFn: () => register({ username: userName, password }, image || ""),
    onSuccess: () => {
      setIsAuthenticated(true);
      alert("Registered Successfully");
      router.replace("/");
    },
    onError: (error) => {
      console.log("Register error", error.message);
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleRegister = () => {
    mutate();
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {image && (
        <Image
          source={{ uri: image }}
          style={{ height: 150, width: 150, borderRadius: 80, borderWidth: 1 }}
        />
      )}

      <TouchableOpacity onPress={pickImage}>
        <Text style={{ color: "blue" }}>Pick an Image</Text>
      </TouchableOpacity>

      <View
        style={{
          alignItems: "flex-start",
          width: "70%",
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
          Enter your Username
        </Text>
      </View>
      <TextInput
        placeholder="username"
        style={{
          borderWidth: 1,
          width: "70%",
          padding: 5,
          margin: 5,
          borderRadius: 10,
        }}
        onChangeText={(text) => setUserName(text)}
      />
      <View
        style={{
          alignItems: "flex-start",
          width: "70%",
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
          Enter your Password
        </Text>
      </View>
      <TextInput
        placeholder="password"
        style={{
          borderWidth: 1,
          width: "70%",
          padding: 5,
          margin: 5,
          borderRadius: 10,
        }}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={handleRegister}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
