import { getToken } from "@/api/storage";
import { Children, createContext, useEffect, useState } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const verifyToken = async () => {
  //     const token = await getToken();
  //     setIsAuthenticated(!!token);
  //   };
  //   verifyToken();
  // }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
