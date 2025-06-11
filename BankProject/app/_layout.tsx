import { deleteToken, getToken } from "@/api/storage";
import CustomLoader from "@/components/Loading";
import AuthContext, { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";

const queryClient = new QueryClient();
export default function RootLayout() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [ready, setReady] = useState(false);

  const verifyToken = async () => {
    const token = await getToken();
    if (token) {
      console.log(">>Retrieved Tokennnnnnn", token);
      setIsAuthenticated(true);
    }

    // console.log(token);

    setReady(true);
  };

  useEffect(() => {
    verifyToken();
    // deleteToken();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>LOADING APP</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="(auth)" />
          ) : (
            <Stack.Screen name="(protected)" />
          )}
        </Stack>
      </QueryClientProvider>
    </AuthProvider>
  );
}
