import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const MYProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MYProfileLayout;

const styles = StyleSheet.create({});
