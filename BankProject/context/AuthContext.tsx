import { getToken } from "@/api/storage";
import { Children, createContext, useEffect, useState } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  ready: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  ready: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = await getToken();
      console.log("KKKKKKKKKKK", token);
      if (token) {
        setIsAuthenticated(true);
      }
      setReady(true);
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, ready }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
