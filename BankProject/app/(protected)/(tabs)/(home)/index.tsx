import { deleteToken } from "@/api/storage";
import { me, my } from "@/api/users";
import AuthContext from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useContext } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TransactionCard from "@/components/LTransaction";

export default function Index() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
  });

  const { data: transactionData } = useQuery({
    queryKey: ["mytransactions"],
    queryFn: () => my(),
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F9FC", padding: 20 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: userData?.image }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 25,
              marginRight: 15,
              borderWidth: 2,
              borderColor: "#005DAA",
            }}
            resizeMode="cover"
          />
          <View>
            <Text style={{ color: "#001F3F", fontSize: 14 }}>
              Welcome back,
            </Text>
            <Text
              style={{ color: "#001F3F", fontSize: 18, fontWeight: "bold" }}
            >
              {userData?.username}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            deleteToken();
            setIsAuthenticated(false);
            router.replace("/Login");
          }}
          style={{
            backgroundColor: "#A00",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white" }}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View
        style={{
          backgroundColor: "#002B49",
          borderRadius: 20,
          padding: 20,
          marginBottom: 25,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 18, marginBottom: 5 }}>
          Blink NBK
        </Text>
        <Text style={{ color: "#FFFFFF", fontSize: 26, fontWeight: "bold" }}>
          {userData?.balance} KWD
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>**** 4570</Text>
          <Text style={{ color: "#FFFFFF" }}>05/28</Text>
        </View>
        <Text style={{ color: "#FFFFFF", marginTop: 10 }}>VISA</Text>
      </View>

      {/* Actions */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <Link href={"/Allusers"} asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "#005DAA",
              padding: 15,
              borderRadius: 15,
              flex: 1,
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Transfer</Text>
          </TouchableOpacity>
        </Link>
        <Link href={"/TransactionsBalance"} asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "#1E3A5F",
              padding: 15,
              borderRadius: 15,
              flex: 1,
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>
              Withdraw / Deposit
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Last Transactions */}
      <View>
        <Link href={"/LTransaction"} asChild>
          <TouchableOpacity>
            <Text
              style={{
                color: "#001F3F",
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
          style={{ backgroundColor: "#E2E8F0", borderRadius: 15, padding: 15 }}
        >
          {transactionData
            ?.sort(
              (a: any, b: any) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .slice(0, 3)
            .map((A: any) => (
              <TransactionCard key={A._id} transaction={A} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
}
