import { login } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["LoginFn"],
    mutationFn: () => login({ username: userName, password }),
    onSuccess: (data) => {
      console.log("i am here,  ", data);
      alert("Logged in Successfully");
      setIsAuthenticated(true);
      router.replace("/");
    },
    onError: (error) => {
      console.log("Login error", error);
      alert(" No Accounts, Need to Register");
      router.replace("/Register");
    },
  });

  const handleLogin = () => {
    console.log("Login button pressed");
    if (!userName && !password) {
      alert("Username and Passowrd are requried!");
    } else {
      mutate();
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
        placeholder="Username"
        onChangeText={(text) => setUserName(text)}
        style={{
          borderWidth: 1,
          width: "70%",
          padding: 5,
          margin: 5,
          borderRadius: 10,
        }}
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
        onChangeText={(text) => setPassword(text)}
        style={{
          borderWidth: 1,
          width: "70%",
          padding: 5,
          margin: 5,
          borderRadius: 10,
        }}
      />
      <Link href={"/Register"} asChild>
        <TouchableOpacity style={{ alignItems: "flex-start", width: "70%" }}>
          <Text style={{ color: "blue" }}>Go to Register</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={handleLogin}
      >
        <Text>LOG IN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
