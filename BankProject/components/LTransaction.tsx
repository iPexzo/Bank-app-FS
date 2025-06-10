import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface transactions {
  transaction: any;
}

const TransactionCard = ({ transaction }: transactions) => {
  return (
    <View style={styles.card}>
      <Text style={styles.amount}>{transaction.amount} KWD</Text>
      <Text style={styles.type}>{transaction.type}</Text>
      <Text style={styles.date}>
        {new Date(transaction.updatedAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowColor: "#000",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003087",
  },
  type: {
    fontSize: 16,
    color: "#475569",
    marginVertical: 0,
  },
  date: {
    fontSize: 12,
    color: "#64748b",
  },
});
