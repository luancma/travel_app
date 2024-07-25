import { useState, useMemo, createContext, useContext } from "react";

export interface BottomNavigationContextType {
  selected: number;
  setSelected: (value: number) => void;
}

const BottomNavigationContextType = createContext<BottomNavigationContextType>({
  selected: 0,
  setSelected: () => null,
});

const BottomNavigationProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const [selected, setSelected] = useState<number>(0);

  const context = useMemo(() => ({ selected, setSelected }), [selected, setSelected]);

  return <BottomNavigationContextType.Provider value={context}>{children}</BottomNavigationContextType.Provider>;
}

const useBottomNavigation = () => {
  const context = useContext(BottomNavigationContextType);
  if (context === undefined) {
    throw new Error('useBottomNavigation must be used within a BottomNavigationProvider');
  }
  return context;
}

export { BottomNavigationProvider, BottomNavigationContextType, useBottomNavigation };
