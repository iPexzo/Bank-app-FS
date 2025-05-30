import { login } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Link, Redirect, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) {
    return <Redirect href="/" />;
  }
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
      alert("Compelete the boxes");
    } else {
      mutate();
    }
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
      {/* Login */}
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Login
      </Text>
      {/* 
      username text */}
      <View style={{ width: "100%", marginBottom: 15 }}>
        <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
          Enter your Username
        </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => setUserName(text)}
          style={{
            backgroundColor: "#1E1E1E",
            color: "white",
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
          }}
        />
      </View>

      {/* password text */}
      <View style={{ width: "100%", marginBottom: 20 }}>
        <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
          Enter your Password
        </Text>
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          style={{
            backgroundColor: "#1E1E1E",
            color: "white",
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
          }}
        />
      </View>

      {/* go to Register button */}
      <Link href="/Register" asChild>
        <TouchableOpacity style={{ marginBottom: 25 }}>
          <Text style={{ color: "#64B5F6" }}>Go to Register</Text>
        </TouchableOpacity>
      </Link>

      {/* Log in press */}
      <TouchableOpacity
        onPress={handleLogin}
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
          LOG IN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
