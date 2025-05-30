import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deposit, my, withdraw } from "@/api/users";
import AuthContext from "@/context/AuthContext";
import { Transactions } from "@/types/types";

const TransactionsBalance = () => {
  const [amount1, setAmount1] = useState("");
  const [amount, setAmount] = useState("");

  const { setIsAuthenticated } = useContext(AuthContext);

  const { mutate } = useMutation({
    mutationKey: ["withdrawww"],
    mutationFn: (data: Transactions) => withdraw(data.amount),
    onSuccess: () => {
      alert("withdraw successfully");
      setIsAuthenticated(true);
    },
    onError: () => {
      alert("withdraw not done");
    },
  });

  const { mutate: mutateDeposit, isPending } = useMutation({
    mutationKey: ["Depositsss"],
    mutationFn: (data: Transactions) => deposit(data.amount),
    onSuccess: () => {
      alert("deposit successfully");
    },
    onError: () => {
      alert("Deposit not done");
    },
  });

  //   const fetchTransaction = async () => {
  //     try {
  //       const { data } = await my();
  //       setIsAuthenticated(data);
  //     } catch {}
  //   };

  //   useEffect(() => {
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
    <View style={styles.container}>
      {/* Withdraw */}
      <View style={styles.card}>
        <Text style={styles.heading}>Withdraw Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="amount"
        />
        <TouchableOpacity style={styles.button} onPress={handlerWithdraw}>
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      {/* Deposit */}
      <View style={styles.card}>
        <Text style={styles.heading}>Deposit Amount</Text>
        <TextInput
          style={styles.input}
          value={amount1}
          onChangeText={setAmount1}
          placeholder="amount"
        />
        <TouchableOpacity
          style={[styles.button, styles.depositButton]}
          onPress={handlerDeposit}
        >
          <Text style={styles.buttonText}>Deposit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionsBalance;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fafafa",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  depositButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
