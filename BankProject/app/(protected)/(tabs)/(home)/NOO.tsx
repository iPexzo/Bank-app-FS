import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deposit, withdraw } from "@/api/users";
import AuthContext from "@/context/AuthContext";
import { Transactions } from "@/types/types";

const TransactionsBalance = () => {
  const [iswithdraw, setWithDraw] = useState("");
  const [amount, setAmount] = useState("");
  const [amount1, setAmount1] = useState("");

  const { setIsAuthenticated } = useContext(AuthContext);
  const { mutate } = useMutation({
    mutationKey: ["withdrawww"],
    mutationFn: (data: Transactions) => withdraw(data.amount),
    onSuccess: () => {
      alert("withdraw successfully");
    },
    onError: () => {
      alert(" withdraw not done");
    },
  });

  const { mutate: mutateDeposit, isPending } = useMutation({
    mutationKey: ["Depositsss"],
    mutationFn: (data: Transactions) => deposit(data.amount),
    onSuccess: () => {
      alert("deposit successfully");
    },
    onError: () => {
      alert(" Deposit not done");
    },
  });

  //   const fetchTransaction = async () => {
  //     try {
  //       const result = await my();
  //       setTransactions(result);
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       console.log("fetchtransactions", error);
  //     }
  //   };

  //   useEffect(() => {
  //     const fetchTransaction = async () => {
  //       const data = await withdraw(amount);
  //       setWithDraw(data);
  //     };
  //     fetchTransaction();
  //   }, []);

  const handlerWithdraw = () => {
    const numberAmount = Number(amount);
    if (!numberAmount) {
      alert("please enter number");
      return;
    }
    mutate({ amount: numberAmount });
  };
  const handlerDeposit = () => {
    const numberAmount1 = Number(amount1);
    if (!numberAmount1) {
      alert("please enter number");
      return;
    }
    mutateDeposit({ amount: numberAmount1 });
  };

  if (isPending) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 100 }}>
        <Text> Enter your Amount to withdraw</Text>
        <TextInput
          style={{
            borderWidth: 2,
            marginVertical: 10,
            padding: 8,
            borderRadius: 6,
          }}
          value={amount}
          onChangeText={setAmount}
          placeholder="amount"
        />
        <Button title="withdraw" onPress={handlerWithdraw} />
      </View>
      <View>
        <Text> Enter your Amount to Deposit</Text>
        <TextInput
          style={{
            borderWidth: 2,
            marginVertical: 10,
            padding: 8,
            borderRadius: 6,
          }}
          value={amount1}
          onChangeText={setAmount1}
          placeholder="amount"
        />
        <Button title="deposit" onPress={handlerDeposit} />
      </View>
    </View>
  );
};

export default TransactionsBalance;

const styles = StyleSheet.create({});
