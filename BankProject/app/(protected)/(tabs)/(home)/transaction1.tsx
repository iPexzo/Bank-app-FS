import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { userscard } from "@/data/usersdata";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deposit, my, withdraw } from "@/api/users";
import { getToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";

const UserId = () => {
  // const [transactions, setTransactions] = useState([]);
  const [selected, setSelected] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [searchAmount, setSearchAmount] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["mytransactions"],
    queryFn: () => my(),
  });

  console.log("transaction:", data);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  const filteredData = data
    ?.filter((t: any) =>
      selected === "All"
        ? true
        : t.type?.toLowerCase() === selected.toLowerCase()
    )
    .filter((t: any) =>
      searchAmount === "" ? true : String(t.amount).includes(searchAmount)
    );

  // const displayTransactions = filterButtons.map((transactions)=>{ return )
  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["deposit"],
  //   mutationFn: () => deposit(),
  //   onSuccess: () => {
  //     alert("deposit successfully");
  //     setIsAuthenticated(true);
  //   },
  //   onError: () => {
  //     alert(" deposit not done");
  //   },
  // });
  // const fetchTransaction = async () => {
  //   try {
  //     const result = await my();
  //     setTransactions(result);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     console.log("fetchtransactions", error);
  //   }
  // };

  // useEffect(() => {
  //   // const fetchTransaction = async () => {
  //   //   const data = await my();
  //   //   setTransactions(data);
  //   // };
  //   fetchTransaction();
  // }, []);

  // const handlerDeposit = () => {
  //   mutate();
  // };

  // if (isPending) return <Text>Loading...</Text>;
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 20,
          gap: 5,
        }}
      >
        {["All", "transfer", "withdraw", "deposit"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelected(type)}
            style={{
              padding: 8,
              borderRadius: 12,
              width: 90,
              alignItems: "center",
              borderWidth: 1,
            }}
          >
            <Text>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        placeholder="Search for amount"
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 8,
          marginBottom: 10,
        }}
        onChangeText={(text) => setSearchAmount(text)}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {filterAmount.map((t: any) => (
          <View
            key={t._id}
            style={{
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
              borderWidth: 1,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {t.amount} KWD
            </Text>
            <Text style={{ fontSize: 16 }}>{t.type}</Text>
          </View>
        ))}
      </ScrollView>  */}

      {/* {filterAmount.map((A: any) => (
        <View
          key={A._id}
          style={{
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 6 }}>
            {A.amount} KWD
          </Text>
        </View>
      ))} */}

      {/* info map */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredData.map((t: any) => (
          <View
            key={t._id}
            style={{
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
              borderWidth: 1,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 6 }}>
              {t.amount} KWD
            </Text>
            <Text style={{ fontSize: 16 }}>{t.type}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default UserId;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#eef6ff", // أزرق فاتح جميل لكل العمليات
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 26,
  },
});
