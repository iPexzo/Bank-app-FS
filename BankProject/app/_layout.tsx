import { deleteToken, getToken } from "@/api/storage";
import AuthContext, { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const queryClient = new QueryClient();

  const verifyToken = async () => {
    const token = await getToken();
    console.log(">>Retrieved Token", token);
    // console.log(token);
    if (token) {
      setIsAuthenticated(true);
    }
    console.log("isAuth", isAuthenticated);
    setReady(true);
  };

  useEffect(() => {
    deleteToken();
    verifyToken();
  }, []);

  if (!ready) {
    return (
      <View>
        <Text>LOADING APP</Text>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
