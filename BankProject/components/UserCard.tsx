import { getAllUsers, transferMoney } from "@/api/users";
import AuthContext from "@/context/AuthContext";
import { userscard } from "@/data/usersdata";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const userCards = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["LoginFn"],
    mutationFn: ({ amount, username }: { amount: number; username: string }) =>
      transferMoney(amount, username),
    onSuccess: (data) => {
      alert("transfer Successfully");
      setAmount("");
      setUsername("");
    },
    onError: (error) => {
      console.log("Login error", error);
      alert(" transfer not done");
    },
  });

  const handleTransfer = () => {
    if (!username) {
      alert("please choose the username");
      return;
    }
    if (!amount) {
      alert("please enter number");
      {
        return;
      }
    }
    mutate({ amount: Number(amount), username: String(username) });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
  // console.log("HOME", data);

  // console.log("profile", data);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     const result = await getAllUsers();
  //     setIsAuthenticated(result);
  //   };
  //   loadUsers();
  // }, []);

  return (
    <View style={{ padding: 20, backgroundColor: "#2f4f4f", flex: 1 }}>
      <View>
        <Text
          style={{
            color: "white",
            marginBottom: 20,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          LIST OF USERS:
        </Text>
      </View>

      {/* list user + with the map i can click on the user and choose it*/}
      <ScrollView>
        {data.map((data: any) => (
          <TouchableOpacity
            key={data?._id}
            onPress={() => setUsername(data.username)}
            style={{
              flexDirection: "row",
              backgroundColor: "#191970",
              padding: 15,
              marginBottom: 15,
              borderRadius: 15,
              alignItems: "center",
            }}
          >
            {data.image ? (
              <Image
                source={{ uri: data.image }}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 30,
                  marginRight: 15,
                  borderWidth: 2,
                }}
              />
            ) : (
              <View
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 30,
                  marginRight: 15,
                  borderWidth: 2,
                }}
              ></View>
            )}

            <View style={{ width: "70%" }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {data?.username}
              </Text>
              <Text
                style={{ color: "#cdcdcd", fontSize: 13, marginTop: 2 }}
              ></Text>
              <Text
                style={{
                  color: "#32cd32",
                  fontSize: 15,
                  fontWeight: "600",
                  marginTop: 5,
                }}
              >
                {data?.balance} KWD
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* amount enter */}
      <TextInput
        placeholder="Enter the amount"
        value={amount}
        onChangeText={setAmount}
        style={{
          backgroundColor: "#1E1E1E",
          color: "white",
          borderRadius: 8,
          padding: 10,
          marginTop: 20,
        }}
      />

      {/* the click tranfer */}
      <TouchableOpacity
        onPress={handleTransfer}
        style={{
          backgroundColor: "#065A82",
          padding: 12,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          transfer user {username}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default userCards;
