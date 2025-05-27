import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { userscard } from "@/data/usersdata";
import { useMutation, useQuery } from "@tanstack/react-query";
import { my, withdraw } from "@/api/users";
import { getToken } from "@/api/storage";

const UserId = () => {
  const [transactions, setTransactions] = useState([]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: () => withdraw({ amount: 50 }),
    onSuccess: () => {
      alert("withdraw successfully");
    },
    onError: () => {
      alert(" withdraw not done");
    },
  });
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const result = await my();
        setTransactions(result);
      } catch (error) {
        console.log("fetchtransactions", error);
      }
    };
    fetchTransaction();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["my-transactions"],
    queryFn: () => my(),
  });
  console.log("transaction", data);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const handlerwithdraw = () => {
    mutate();
  };
  if (isPending) return <Text>Loading...</Text>;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f4f7",
        padding: 16,
      }}
    >
      <Button title="withdraw 50 KWD" onPress={handlerwithdraw} />

      <View
        style={{
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
          width: "100%",
          maxWidth: 360,
          marginTop: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
          {}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 6 }}>{data.amount}</Text>
        <Text style={{ fontSize: 16, marginBottom: 6 }}>{data.date}</Text>
        <Text style={{ fontSize: 16 }}>{data.type}</Text>
      </View>
    </View>
  );
};

export default UserId;

const styles = StyleSheet.create({});
