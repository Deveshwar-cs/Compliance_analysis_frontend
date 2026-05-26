import {createContext, useContext, useEffect, useState} from "react";
import api from "../api/api";
// create context:
const AuthContext = createContext();

// create function that provide the context to whole application
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await api.get("/auth/get-users");
      console.log(res.data);
    } catch (error) {
      setUser(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await api.post("/auth/signin", credentials);
    setUser(response.data.data);
    console.log(response.data);
    return response.data.data;
  };

  const logout = async () => {
    await api.post("/auth/signout");
    setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={{user, login, logout, getUser, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("context must be initialized");
  }
  return context;
};
