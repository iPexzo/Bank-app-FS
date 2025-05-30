import { deleteToken } from "@/api/storage";
import { me, userId } from "@/api/users";
import AuthContext from "@/context/AuthContext";
import { userscard } from "@/data/usersdata";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useContext } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import UserId from "./transaction1";

export default function Index() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const {
    data,
    isLoading,
    error,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  console.log(data);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Image
            source={{
              uri: data?.image,
            }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 25,
              marginRight: 15,
              borderWidth: 2,
              borderColor: "#33ccff",
            }}
            resizeMode="cover"
          />

          <View>
            <Text style={{ color: "white", fontSize: 14 }}>Welcome back,</Text>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              {data?.username}
            </Text>
          </View>
        </View>
        {/* Header */}
        <TouchableOpacity
          onPress={() => {
            deleteToken();
            setIsAuthenticated(false);
            router.replace("/Login");
          }}
          style={{
            backgroundColor: "#bd5048",
            padding: 10,
            alignSelf: "flex-end",
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Card 1 */}
        <View
          style={{
            backgroundColor: "#1e3a8a",
            borderRadius: 20,
            padding: 20,
            width: 300,
            marginRight: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
            BankBoubyan
          </Text>
          <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
            {data?.balance} KWD
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "white" }}>**** 4570</Text>
            <Text style={{ color: "white" }}>05/28</Text>
          </View>
          <Text style={{ color: "#dcdcdc", marginTop: 10 }}>VISA</Text>
        </View>

        {/* Card 2 */}
        <View
          style={{
            backgroundColor: "#4b0082",
            borderRadius: 20,
            padding: 20,
            width: 300,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
            BankBoubyan
          </Text>
          <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
            {data?.balance} KWD
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "white" }}>**** 4570</Text>
            <Text style={{ color: "white" }}>05/28</Text>
          </View>
          <Text style={{ color: "#dcdcdc", marginTop: 10 }}>VISA</Text>
        </View>
      </ScrollView>

      {/* Actions الازرار */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 30,
        }}
      >
        <Link href={"/Allusers"} asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "#1f2937",
              padding: 15,
              borderRadius: 15,
              alignItems: "center",
              flex: 1,
              margin: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>Transfer</Text>
          </TouchableOpacity>
        </Link>
        <Link href={"/(protected)/(tabs)/(home)/transactions1"} asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "#374151",
              padding: 15,
              borderRadius: 15,
              alignItems: "center",
              flex: 1,
              margin: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              Withdraw /Deposit
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Last Transactions */}
      <View>
        <Link href={"/transaction1"} asChild>
          <TouchableOpacity>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 10,
              }}
            >
              Last Transactions
            </Text>
          </TouchableOpacity>
        </Link>
        <ScrollView
          style={{
            backgroundColor: "grey",
            borderRadius: 15,
            padding: 15,
            height: 300,
            borderWidth: 1,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <UserId />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
