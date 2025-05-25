import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import UsersScreen from "../(users)/Allusers";
import { useRouter } from "expo-router";

export default function Index() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Logout"
        onPress={async () => {
          await deleteToken();
          setIsAuthenticated(false);
          router.replace("/Login");
        }}
      />
      <UsersScreen />
    </View>
  );
}
