import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TransactionCard = ({ transaction }: { transaction: any }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.amount}>{transaction.amount} KWD</Text>
      <Text style={styles.type}>{transaction.type}</Text>
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
    alignItems: "center",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  type: {
    fontSize: 16,
  },
});
