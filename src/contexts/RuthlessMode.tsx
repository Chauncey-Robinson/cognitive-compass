import { createContext, useContext, useState, ReactNode } from 'react';

interface RuthlessModeContextType {
  isRuthless: boolean;
  toggleRuthless: () => void;
  setRuthless: (value: boolean) => void;
}

const RuthlessModeContext = createContext<RuthlessModeContextType | undefined>(undefined);

export function RuthlessModeProvider({ children }: { children: ReactNode }) {
  const [isRuthless, setIsRuthless] = useState(false);

  const toggleRuthless = () => setIsRuthless(prev => !prev);
  const setRuthless = (value: boolean) => setIsRuthless(value);

  return (
    <RuthlessModeContext.Provider value={{ isRuthless, toggleRuthless, setRuthless }}>
      {children}
    </RuthlessModeContext.Provider>
  );
}

export function useRuthlessMode() {
  const context = useContext(RuthlessModeContext);
  if (context === undefined) {
    throw new Error('useRuthlessMode must be used within a RuthlessModeProvider');
  }
  return context;
}
