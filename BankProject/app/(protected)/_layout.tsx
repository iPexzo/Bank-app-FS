import AuthContext, { AuthProvider } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";

const ProtectedLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Redirect href="/Login" />;
  }
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Blink",
            headerStyle: { backgroundColor: "#f2f6ff" },
          }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default ProtectedLayout;

const styles = StyleSheet.create({});
// headerStyle: { backgroundColor: "black" },
