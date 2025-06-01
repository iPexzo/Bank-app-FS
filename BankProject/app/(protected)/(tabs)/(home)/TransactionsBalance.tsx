import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deposit, me, withdraw } from "@/api/users";
import AuthContext from "@/context/AuthContext";
import { Transactions } from "@/types/types";
import CardWnD from "@/components/TransactionsBalance";
import CustomLoader from "@/components/Loading";

const TransactionsBalance = () => {
  // const [amount1, setAmount1] = useState("");
  // const [amount, setAmount] = useState("");
  // const { setIsAuthenticated } = useContext(AuthContext);

  const { data: userData, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
  });

  const { mutate } = useMutation({
    mutationKey: ["withdrawww"],
    mutationFn: (data: Transactions) => withdraw(data.amount),
    onSuccess: () => {
      alert("Withdraw successful");
      refetch();
    },
    onError: () => {
      alert("Withdraw failed");
    },
  });

  const { mutate: mutateDeposit } = useMutation({
    mutationKey: ["Depositsss"],
    mutationFn: (data: Transactions) => deposit(data.amount),
    onSuccess: () => {
      alert("Deposit successful");
      refetch();
    },
    onError: () => {
      alert("Deposit failed");
    },
  });

  const handlerWithdraw = (amount: number) => {
    mutate({ amount });
  };

  const handlerDeposit = (amount1: number) => {
    mutateDeposit({ amount: amount1 });
  };

  if (!userData) return <CustomLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.cardTitle}>Your Balance</Text>
        <Text style={styles.balanceAmount}>{userData?.balance} KWD</Text>
      </View>

      <CardWnD
        title="Withdraw"
        onSubmit={handlerWithdraw}
        buttonColor="#dc2626"
      />
      <CardWnD
        title="Deposit"
        onSubmit={handlerDeposit}
        buttonColor="#16a34a"
      />
    </View>
  );
};

export default TransactionsBalance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 20,
  },
  balanceCard: {
    backgroundColor: "#1f2937",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#9ca3af",
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },
});
