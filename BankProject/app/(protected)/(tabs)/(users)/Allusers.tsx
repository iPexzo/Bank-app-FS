import { getAllUsers, transferMoney } from "@/api/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomLoader from "@/components/Loading";
import { transfer } from "@/types/types";

const Allusers = () => {
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");

  const {
    data,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
  // console.log("dtttt", data);

  const { mutate } = useMutation({
    mutationKey: ["TransferMoney"],
    // mutationFn: ({ amount, username }: { amount: number; username: string }) =>
    //   transferMoney(amount, username),
    mutationFn: (data: transfer) => transferMoney(data.amount, data.username),
    onSuccess: () => {
      alert(" Transfer Successful");
      setAmount("");
      setUsername("");
      refetchUser();
    },
    onError: () => {
      alert(" Transfer Failed");
    },
  });

  const handleTransfer = () => {
    if (!username) return alert("Please choose a user");
    if (!amount) return alert("Please enter an amount");
    const roundedAmount = Number(parseFloat(amount)).toFixed(3);

    if (Number(roundedAmount) < 0) return 0;

    mutate({ amount: parseFloat(roundedAmount), username });
  };

  if (isLoading) return <CustomLoader />;
  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath) {
      return null;
    }

    const baseUrl = "https://react-bank-project.eapi.joincoded.com";

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    if (imagePath.startsWith("/")) {
      return `${baseUrl}${imagePath}`;
    }

    return `${baseUrl}/${imagePath}`;
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#121212" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={{ flex: 1, padding: 20 }}>
        <Text
          style={{
            color: "white",
            marginBottom: 20,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          List of Users:
        </Text>

        <ScrollView style={{ marginBottom: 130 }}>
          {data.map((user: any) => (
            <TouchableOpacity
              key={user?._id}
              onPress={() => setUsername(user.username)}
              style={{
                flexDirection: "row",
                backgroundColor:
                  username === user.username ? "#2c2c3c" : "#1f2937",
                padding: 15,
                marginBottom: 12,
                borderRadius: 15,
                alignItems: "center",
                borderWidth: 1,
                borderColor: username === user.username ? "#4ade80" : "#2c2c3c",
              }}
            >
              {(() => {
                const imageUrl = getImageUrl(user?.image);
                return imageUrl ? (
                  <Image
                    source={{ uri: imageUrl }}
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 30,
                      marginRight: 15,
                      borderWidth: 1,
                      borderColor: "#4ade80",
                    }}
                  />
                ) : (
                  <View
                    style={{
                      backgroundColor: "#333",
                      width: 55,
                      height: 55,
                      borderRadius: 30,
                      marginRight: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome name="user" size={26} color="#00BFFF" />
                  </View>
                );
              })()}

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {user?.username}
                </Text>
                <Text
                  style={{
                    color: "#4ade80",
                    fontSize: 14,
                    marginTop: 4,
                  }}
                >
                  {Number(user?.balance) < 0
                    ? "0.000"
                    : Number(user?.balance).toLocaleString("en-US", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                  KWD
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          backgroundColor: "#121212",
          borderTopWidth: 1,
          borderTopColor: "#2c2c3c",
        }}
      >
        <TextInput
          placeholder="Enter the amount"
          placeholderTextColor="#888"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={{
            backgroundColor: "#1f2937",
            color: "white",
            borderRadius: 10,
            padding: 12,
            marginBottom: 10,
          }}
        />

        <TouchableOpacity
          onPress={handleTransfer}
          style={{
            backgroundColor: "#00BFFF",
            padding: 14,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Transfer to {username || "?"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Allusers;
