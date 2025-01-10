"use client";
import { createContext, useState, useContext } from "react";
import { HomeContextType, WrapperProps } from "../types";

export const AppContext = createContext<HomeContextType | null>(null);

export function HomeWrapper({ children }: WrapperProps) {
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
    throw new Error("useApp tem de ser usado dentro do HomeWrapper");
  }

  return context;
}
