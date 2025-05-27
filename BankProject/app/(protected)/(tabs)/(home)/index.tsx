import { deleteToken } from "@/api/storage";
import { me, userId } from "@/api/users";
import AuthContext from "@/context/AuthContext";
import { userscard } from "@/data/usersdata";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useContext } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
  });

  console.log("profileindex", data);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#2f4f4f", padding: 20 }}>
      {/* Header */}
      <TouchableOpacity
        onPress={() => {
          deleteToken();

          setIsAuthenticated(false);
          router.replace("/Login");
        }}
        style={{
          backgroundColor: "#33ccff",
          padding: 10,
          alignSelf: "flex-end",
          marginBottom: 20,
          borderRadius: 10,
        }}
      >
        <Text>LOGOUT</Text>
      </TouchableOpacity>

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
        />

        <View>
          <Text style={{ color: "white", fontSize: 14 }}>Welcome back,</Text>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {data?.username}
          </Text>
        </View>
      </View>

      {/* Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Card 1 */}
        <View
          style={{
            backgroundColor: "#0099ff",
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
            backgroundColor: "#9966cc",
            borderRadius: 20,
            padding: 20,
            width: 300,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
            BankBoubyan
          </Text>
          <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
            {data?.balance}KWD
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
        <Link href={"/(users)/Allusers"} asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "#191970",
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

        <TouchableOpacity
          style={{
            backgroundColor: "#191970",
            padding: 15,
            borderRadius: 15,
            alignItems: "center",
            flex: 1,
            margin: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>Withdraw</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#191970",
            padding: 15,
            borderRadius: 15,
            alignItems: "center",
            flex: 1,
            margin: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>Deposit</Text>
        </TouchableOpacity>
      </View>

      {/* Last Transactions */}
      <View>
        <Link href={"/(users)/transaction1"} asChild>
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
        <View
          style={{ backgroundColor: "#000080", borderRadius: 15, padding: 15 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: "white",
            }}
          >
            <Text style={{ color: "white" }}>Apple</Text>
            <Text style={{ color: "#32cd32" }}>+$150.75</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: "white",
            }}
          >
            <Text style={{ color: "white" }}>Amazon</Text>
            <Text style={{ color: "#b22222" }}>-$34.15</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: "white" }}>Youtube</Text>
            <Text style={{ color: "#b22222" }}>-$5.50</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
