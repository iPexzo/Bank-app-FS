import { getToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ProtectedLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    console.log("not authenticated");
    return <Redirect href="/Login" />;
  }
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Blink",
          headerStyle: { backgroundColor: "#f2f6ff" },
        }}
      />
    </Stack>
  );
};

export default ProtectedLayout;

const styles = StyleSheet.create({});
// headerStyle: { backgroundColor: "black" },
