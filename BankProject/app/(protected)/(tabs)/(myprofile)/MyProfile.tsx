import { deleteToken } from "@/api/storage";
import { me } from "@/api/users";
import AuthContext from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";

const MyProfileScreen = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["Meee"],
    queryFn: () => me(),
  });

  if (isLoading) return <Text style={{ color: "white" }}>Loading...</Text>;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#ffffff",
          alignSelf: "center",
          marginBottom: 25,
        }}
      >
        My Profile
      </Text>

      <View
        style={{
          backgroundColor: "#002B49",
          padding: 25,
          borderRadius: 20,
          alignItems: "center",
          marginBottom: 30,
          borderWidth: 1,
          borderColor: "#1E3A5F",
        }}
      >
        <Image
          source={{ uri: data?.image }}
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            marginBottom: 15,
            borderWidth: 2,
            borderColor: "#00BFFF",
          }}
        />
        <Text
          style={{
            fontSize: 20,
            color: "#ffffff",
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          {data?.username}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#4ade80",
            fontWeight: "bold",
          }}
        >
          {data?.balance} KWD
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#2c2c3c",
          padding: 15,
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Edit Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#b91c1c",
          padding: 15,
          borderRadius: 12,
        }}
        onPress={() => {
          deleteToken();
          setIsAuthenticated(false);
          router.replace("/Login");
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MyProfileScreen;
