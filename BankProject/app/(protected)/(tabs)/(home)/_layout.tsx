import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const HOmePAge = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="transactions" />
      <Stack.Screen name="withdrawD" />
      <Stack.Screen name="LTransaction" options={{ headerShown: false }} />
      <Stack.Screen
        name="TransactionsBalance"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default HOmePAge;

const styles = StyleSheet.create({});
