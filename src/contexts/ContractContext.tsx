"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface ContractContextType {
    solBalance: string;
    setSolBalance: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContext: ContractContextType = {
    solBalance:"0",
    setSolBalance: () => {},
};

// Create the context
export const ContractContext = createContext<ContractContextType>(defaultContext);

const ContractContextProvider = ({ children }: { children: ReactNode }) => {
  const [solBalance,setSolBalance] = useState("0")

  return (
    <ContractContext.Provider value={{ solBalance, setSolBalance }}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
