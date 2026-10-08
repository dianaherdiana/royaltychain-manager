import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { initialWorks, type Work } from "@/lib/demo-data";
type DemoContextValue = {
  works: Work[];
  addWork: (work: Work) => void;
  updateWork: (id: string, patch: Partial<Work>, event?: Work["history"][number]) => void;
  connected: boolean;
  setConnected: (value: boolean) => void;
};
const globalKey = "__royaltichain_demo_context__";
const g = globalThis as unknown as Record<string, React.Context<DemoContextValue | null> | undefined>;
const DemoContext = g[globalKey] ?? (g[globalKey] = createContext<DemoContextValue | null>(null));
export function DemoProvider({ children }: { children: ReactNode }) {
  const [works, setWorks] = useState<Work[]>(initialWorks);
  const [connected, setConnected] = useState(false);
  return (
    <DemoContext.Provider
      value={{
        works,
        connected,
        setConnected,
        addWork: (work) => setWorks((old) => [work, ...old]),
        updateWork: (id, patch, event) =>
          setWorks((old) =>
            old.map((w) =>
              w.id === id
                ? { ...w, ...patch, history: event ? [...w.history, event] : w.history }
                : w,
            ),
          ),
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
const fallback: DemoContextValue = {
  works: initialWorks,
  addWork: () => {},
  updateWork: () => {},
  connected: false,
  setConnected: () => {},
};
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) {
    console.warn("RoyaltiChain demo data unavailable; using read-only fallback.");
    return fallback;
  }
  return value;
}
