import { View, Text, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { my } from "@/api/users";

const FilterTransactions = () => {
  const { data: transactions = [] } = useQuery({
    queryKey: ["my-transactions"],
    queryFn: my,
  });

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const filtered = transactions.filter((t: any) => {
    const matchDate = date ? t.date.includes(date) : true;
    const matchAmount = amount ? t.amount.toString().includes(amount) : true;
    return matchDate && matchAmount;
  });

  return (
    <ScrollView style={{ padding: 20, backgroundColor: "#003c3c" }}>
      <TextInput
        placeholder="Search by date"
        onChangeText={(text) => {
          setDate(text);
        }}
        style={{
          borderWidth: 1,
          borderColor: "#444",
          color: "white",
          marginBottom: 10,
          padding: 10,
          borderRadius: 8,
        }}
      />
      <TextInput
        placeholder="Search by amount"
        onChangeText={(text) => {
          setAmount(text);
        }}
        style={{
          borderWidth: 1,
          borderColor: "#444",
          color: "white",
          marginBottom: 20,
          padding: 10,
          borderRadius: 8,
        }}
      />

      {filtered.map((t: any, i: any) => (
        <View
          key={i}
          style={{
            backgroundColor: "#191970",
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white" }}>{t.title}</Text>
          <Text style={{ color: "#aaa" }}>{t.date}</Text>
          <Text style={{ color: "green" }}>{t.amount} KWD</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default FilterTransactions;
