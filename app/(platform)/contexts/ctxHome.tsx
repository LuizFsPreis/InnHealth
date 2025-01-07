"use client";
import { createContext, useState, useContext, ReactNode } from "react";

// Define o tipo correto para o valor do contexto
interface AppContextType {
  isSearching: boolean;
  setisSearching: (value: boolean) => void;
  searchParam: string;
  setSearchParam: (value: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

interface AppWrapperProps {
  children: ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [isSearching, setisSearching] = useState(true);
  const [searchParam, setSearchParam] = useState("");

  return (
    <AppContext.Provider
      value={{
        isSearching,
        setisSearching,
        searchParam,
        setSearchParam,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within an AppWrapper");
  }

  return context;
}
