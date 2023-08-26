import axios from "axios";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface User {
  name: string;
  email: String,
  password:String,
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
     useEffect(()=>{

        const token = localStorage.getItem('token');
        if(!token){
            axios.get('/profile').then(({data})=>{
                setUser(data);
            }).catch(() => {
                // Clear user data and token if token is invalid or expired
                setUser(null);
                localStorage.removeItem('token'); // Clear the token from local storage
              });
        }
     },[]);
     const logout = () => {
        // Clear user data from context
        setUser(null);
        // Clear tokens from local storage or cookies
        localStorage.removeItem('token'); 
        // Redirect the user
        return <Navigate to={"/"}/>; 
      };

  return (
    <UserContext.Provider value={{ user, setUser,logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

