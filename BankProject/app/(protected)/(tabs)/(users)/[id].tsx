import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { userscard } from "@/data/usersdata";

const UserId = () => {
  const [transforamount, setTransforAmount] = useState("");
  const { id: Userid } = useLocalSearchParams();
  const users = userscard.find((item) => item.id === Number(Userid));
  console.log("userid:", Userid);
  console.log("matched user:", users);
  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TextInput
          placeholder="Enter Transfer amount"
          style={{
            borderWidth: 2,
            borderRadius: 15,
            marginBottom: 10,
            width: 100,
          }}
          onChangeText={(text) => {
            setTransforAmount(text);
          }}
        />
        <Text style={{}}>KWD</Text>
      </View>
      <Button
        title="Done"
        onPress={() => {
          alert("Confirm transfor");
        }}
      />

      <Text>{users?.name}</Text>
      <Text>{users?.email}</Text>
      <Text>{users?.salary} KWD</Text>
    </View>
  );
};

export default UserId;

const styles = StyleSheet.create({});
