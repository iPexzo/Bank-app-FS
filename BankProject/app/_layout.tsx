import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContext from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getToken } from "@/api/storage";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    const verifyToken = async () => {
      const token = await getToken();
      console.log(">>Retrieved Token", token);
      setIsAuthenticated(token ? true : false);
      setReady(true);
    };
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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </AuthContext.Provider>
        </QueryClientProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
