import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { userscard } from "@/data/usersdata";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deposit, my, withdraw } from "@/api/users";
import { getToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";

const UserId = () => {
  const [transactions, setTransactions] = useState([]);
  const { setIsAuthenticated } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["my-transactions"],
    queryFn: () => my(),
  });

  console.log("transaction:", data);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["deposit"],
    mutationFn: () => deposit(),
    onSuccess: () => {
      alert("deposit successfully");
      setIsAuthenticated(true);
    },
    onError: () => {
      alert(" deposit not done");
    },
  });
  // const fetchTransaction = async () => {
  //   try {
  //     const result = await my();
  //     setTransactions(result);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     console.log("fetchtransactions", error);
  //   }

  useEffect(() => {
    const fetchTransaction = async () => {
      const data = await my();
      setTransactions(data);
    };
    fetchTransaction();
  }, []);

  const handlerDeposit = () => {
    mutate();
  };

  if (isPending) return <Text>Loading...</Text>;
  return (
    <View style={{ padding: 20 }}>
      <Button title="Deposit" onPress={handlerDeposit} />

      {/* {transactions.map((data: any) => ( */}
      <View
        style={{
          backgroundColor: "#948222",
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <TextInput placeholder="Enter amount" />
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
          {}KWD
        </Text>
        <Text style={{ fontSize: 14, color: "white" }}>{} a</Text>
        <Text style={{ fontSize: 12, color: "white" }}>{}a</Text>
      </View>
      {/* ))} */}
    </View>
  );
};

export default UserId;

const styles = StyleSheet.create({});
