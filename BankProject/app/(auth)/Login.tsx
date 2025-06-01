import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { z } from "zod";

import AuthContext from "@/context/AuthContext";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.token) {
        alert("Login Done");
        setIsAuthenticated(true);
        router.replace("/");
      } else {
        alert("Password or Username is wrong");
      }
    },
    onError: () => {
      alert("Something is wrong with the login");
    },
  });

  const handleLogin = async () => {
    setUsernameError("");
    setPasswordError("");

    const result = loginSchema.safeParse({ username: userName, password });

    if (!result.success) {
      const errors = result.error.format();
      if (errors.username) setUsernameError(errors.username._errors[0]);
      if (errors.password) setPasswordError(errors.password._errors[0]);
      return;
    }

    mutate({ username: userName.toLocaleLowerCase(), password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />
      {usernameError ? (
        <Text style={styles.errorText}>{usernameError}</Text>
      ) : null}

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Register")}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
