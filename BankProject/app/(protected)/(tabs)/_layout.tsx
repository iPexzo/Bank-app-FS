import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="(myprofile)"
        options={{
          title: "My Profile",
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="(users)"
        options={{
          title: "Users",
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome name="users" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen name="index" />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
