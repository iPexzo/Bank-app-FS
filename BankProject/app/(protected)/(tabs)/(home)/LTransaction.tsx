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
import CustomLoader from "@/components/Loading";

const UserId = () => {
  const [selected, setSelected] = useState("All");
  const [searchAmount, setSearchAmount] = useState("");
  const [fromdate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["mytransactions"],
    queryFn: () => my(),
  });

  if (isLoading) return <CustomLoader />;

  const filteredData = data
    ?.filter((t: any) => (selected === "All" ? true : t.type === selected))
    .filter((t: any) =>
      searchAmount === "" ? true : String(t.amount).includes(searchAmount)
    )
    .filter((t: any) => {
      const updatedAt = new Date(t.updatedAt);

      const from = fromdate ? new Date(fromdate.setHours(0, 0, 0, 0)) : null;
      const to = toDate ? new Date(toDate.setHours(23, 59, 59, 999)) : null;

      if (from && updatedAt < from) return false;
      if (to && updatedAt > to) return false;

      return true;
    });

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f1f5f9" }}>
      <Text style={styles.heading}>Latest Transactions</Text>

      <View style={styles.filters}>
        {["All", "transfer", "withdraw", "deposit"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelected(type)}
            style={[
              styles.filterButton,
              {
                backgroundColor: selected === type ? "#003087" : "#e2e8f0",
              },
            ]}
          >
            <Text
              style={{
                color: selected === type ? "#fff" : "#1e293b",

                fontWeight: "bold",
              }}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Search by amount"
        style={styles.input}
        onChangeText={(text) => setSearchAmount(text)}
      />

      <View style={{ marginBottom: 20 }}>
        <Text style={styles.label}>From Date:</Text>
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
              if (selectedDate) setFromDate(selectedDate);
            }}
          />
        )}

        <Text style={[styles.label, { marginTop: 20 }]}>To Date:</Text>
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
        {filteredData
          .sort(
            (a: any, b: any) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          .map((t: any) => (
            <TransactionCard key={t._id} transaction={t} />
          ))}
      </ScrollView>
    </View>
  );
};

export default UserId;

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 20,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#ffffff",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1e293b",
  },
});
