import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deposit, me, withdraw } from "@/api/users";
import AuthContext from "@/context/AuthContext";
import { Transactions } from "@/types/types";
import CardWnD from "@/components/TransactionsBalance";

const TransactionsBalance = () => {
  const [amount1, setAmount1] = useState("");
  const [amount, setAmount] = useState("");

  const { setIsAuthenticated } = useContext(AuthContext);

  const { data: userData, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
  });

  const { mutate } = useMutation({
    mutationKey: ["withdrawww"],
    mutationFn: (data: Transactions) => withdraw(data.amount),
    onSuccess: () => {
      alert("withdraw successfully");
      refetch();
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
      refetch(); // تحديث الرصيد بعد الإيداع
    },
    onError: () => {
      alert("Deposit not done");
    },
  });

  const handlerWithdraw = (amount: number) => {
    mutate({ amount });
  };

  const handlerDeposit = (amount1: number) => {
    mutateDeposit({ amount: amount1 });
  };

  if (!userData) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      {/* كرت الرصيد */}
      <View style={styles.balanceCard}>
        <Text style={styles.cardTitle}>Your Balance</Text>
        <Text style={styles.balanceAmount}>{userData?.balance} KWD</Text>
      </View>

      {/* كروت العمليات */}
      <CardWnD
        title="Withdraw Amount"
        onSubmit={handlerWithdraw}
        buttonColor="#1e90ff"
      />
      <CardWnD
        title="Deposit Amount"
        onSubmit={handlerDeposit}
        buttonColor="#28a745"
      />
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
  balanceCard: {
    backgroundColor: "#1e3a8a",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 8,
  },
  balanceAmount: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
});
