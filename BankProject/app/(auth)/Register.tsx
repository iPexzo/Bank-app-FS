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
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const { mutate } = useMutation({
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    mutate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.linkText}>Pick an Image</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Login")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#00BFFF",
    alignSelf: "center",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    backgroundColor: "#00BFFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  linkText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});
