import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { my } from "@/api/users";
import AuthContext from "@/context/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import TransactionCard from "@/components/LTransaction";
const UserId = () => {
  const [selected, setSelected] = useState("All");
  const [searchAmount, setSearchAmount] = useState("");
  const [fromdate, setfromdate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["mytransactions"],
    queryFn: () => my(),
  });

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
    )
    .filter((t: any) => {
      const updatedAt = new Date(t.updatedAt);
      if (fromdate && updatedAt < fromdate) return false;
      if (toDate && updatedAt > toDate) return false;
      return true;
    });

  return (
    <View style={{ flex: 1, padding: 20 }}>
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

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>From Date:</Text>
        <Button
          title={fromdate ? fromdate.toDateString() : "Select From Date"}
          onPress={() => setShowFrom(true)}
        />
        {showFrom && (
          <DateTimePicker
            value={fromdate ?? new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowFrom(false);
              if (selectedDate) setfromdate(selectedDate);
            }}
          />
        )}

        <Text style={{ fontWeight: "bold", marginTop: 20 }}>To Date:</Text>
        <Button
          title={toDate ? toDate.toDateString() : "Select To Date"}
          onPress={() => setShowTo(true)}
        />
        {showTo && (
          <DateTimePicker
            value={toDate ?? new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowTo(false);
              if (selectedDate) setToDate(selectedDate);
            }}
          />
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredData.map((t: any) => (
          <TransactionCard key={t._id} transaction={t} />
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
    backgroundColor: "#eef6ff",
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
