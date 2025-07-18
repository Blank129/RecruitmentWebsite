"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {};

const AuthContexts = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <AuthContexts.Provider value={{}}>{children}</AuthContexts.Provider>;
};

export const AuthContext = (): AuthContextType => {
  const context = useContext(AuthContexts);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
