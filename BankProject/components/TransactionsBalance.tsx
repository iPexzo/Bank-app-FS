import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

interface Props {
  title: string;
  onSubmit: (amount: number) => void;
  buttonColor: string;
}

const CardWnD = ({ title, onSubmit, buttonColor }: Props) => {
  const [value, setValue] = useState("");

  const handlePress = () => {
    const number = Number(value);
    if (!number) {
      alert("Please enter a number");
      return;
    }
    onSubmit(number);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{title} </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Enter amount"
        placeholderTextColor="#9ca3af"
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardWnD;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#374151",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#0f172a",
    color: "#f9fafb",
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
