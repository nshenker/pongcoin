"use client";
import { API_URL } from "@/utils/config";
import axios from "axios";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface ContractContextType {
    solBalance: string;
    setSolBalance: React.Dispatch<React.SetStateAction<string>>;
    user: null;
}

const defaultContext: ContractContextType = {
    solBalance:"0",
    setSolBalance: () => {},
    user:null,
};

// Create the context
export const ContractContext = createContext<ContractContextType>(defaultContext);

const ContractContextProvider = ({ children }: { children: ReactNode }) => {
  const [solBalance,setSolBalance] = useState("0")
  const [user, setUser] = useState(null);
  const getMe = async () => {
    const access_token = window.localStorage.getItem("token");

    try {
      const res = await axios.get(`${API_URL}/get/me`, {
        headers: {
          "x-access-token": access_token,
        },
      });

      if (res.status === 200) {
        setUser(res.data.data);
      }
    } catch (err) {}
  };
useEffect(()=>{
  getMe()
},[])
  return (
    <ContractContext.Provider value={{ solBalance, setSolBalance,user }}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
