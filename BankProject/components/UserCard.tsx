import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
export interface UserCardProps {
  name: string;
  email: string;
  imageURL: string;
  Salary: number;
}

const UserCard = ({ name, email, imageURL, Salary }: UserCardProps) => {
  return (
    <TouchableOpacity>
      <Image source={{ uri: imageURL }} />
      <View>
        <Text>{name}</Text>
        <Text>{email}</Text>
        <Text>{Salary}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({});
