import { deleteToken } from "@/api/storage";
import { me, my } from "@/api/users";
import AuthContext from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useContext } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TransactionCard from "@/components/LTransaction";
import CustomLoader from "@/components/Loading";

export default function Index() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
  });
  console.log("data:", userData);

  const { data: transactionData } = useQuery({
    queryKey: ["mytransactions"],
    queryFn: () => my(),
  });

  if (isLoading) {
    return <CustomLoader />;
  }
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) {
    }

    const baseUrl = "https://react-bank-project.eapi.joincoded.com";

    if (imagePath?.startsWith("http://") || imagePath?.startsWith("https://")) {
      return imagePath;
    }

    let fullUrl;
    if (imagePath.startsWith("/")) {
      fullUrl = `${baseUrl}${imagePath}`;
    } else {
      fullUrl = `${baseUrl}/${imagePath}`;
    }

    return fullUrl;
  };

  const imageUrl = getImageUrl(userData.image);

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
            source={
              imageUrl
                ? { uri: imageUrl }
                : require("@/assets/images/noAvatar.jpg")
            }
            style={{
              width: 45,
              height: 45,
              borderRadius: 25,
              marginRight: 15,
              borderWidth: 2,
              borderColor: "#005DAA",
            }}
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
          BlinkBank
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
                padding: 5,
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 15,
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
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
