import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const UsersLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default UsersLayout;

const styles = StyleSheet.create({});
