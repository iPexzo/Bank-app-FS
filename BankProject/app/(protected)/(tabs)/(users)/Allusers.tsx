import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { users } from "@/app/data/users";

const UsersScreen = () => {
  return (
    <View>
      {users.map((user) => (
        <TouchableOpacity key={user.id}>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
          <Text>{user.Salary}</Text>
        </TouchableOpacity>
      ))}
      <Button
        title="Transfer"
        onPress={() => {
          alert("Clicked");
        }}
      />
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({});
