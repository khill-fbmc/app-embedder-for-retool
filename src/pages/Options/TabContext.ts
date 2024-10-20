import { createContext, useContext } from "react";

export type TabKeys = "config" | "storage" | "workflow" | "json";

export const TabContext = createContext<TabKeys>("config");

export const useTabContext = () => useContext(TabContext);
