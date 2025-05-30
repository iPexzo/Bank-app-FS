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
        backgroundColor: "#2f4f4f",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* show the image stayle when he choose it */}
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            height: 150,
            width: 150,
            borderRadius: 80,
            borderWidth: 2,
            borderColor: "#fff",
            marginBottom: 20,
          }}
        />
      )}

      {/* enter the image */}
      <TouchableOpacity onPress={pickImage} style={{ marginBottom: 30 }}>
        <Text style={{ color: "#64B5F6" }}>Pick an Image</Text>
      </TouchableOpacity>

      {/* enter the user */}
      <View style={{ width: "100%", marginBottom: 15 }}>
        <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
          Enter your Username
        </Text>
        <TextInput
          placeholder="username"
          style={{
            backgroundColor: "#1E1E1E",
            color: "white",
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
          }}
          onChangeText={(text) => setUserName(text)}
        />
      </View>

      {/* enter the password */}
      <View style={{ width: "100%", marginBottom: 20 }}>
        <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
          Enter your Password
        </Text>
        <TextInput
          placeholder="password"
          style={{
            backgroundColor: "#1E1E1E",
            color: "white",
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
          }}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {/* register press */}
      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "#065A82",
          padding: 15,
          borderRadius: 8,
          width: "100%",
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
