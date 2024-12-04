
'use client';
import React, { createContext, useContext, useState } from 'react';

interface DashboardContextType {
  profileState: string;
  setProfileState: React.Dispatch<React.SetStateAction<string>>;
}
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);
export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileState, setProfileState] = useState<string>('dashboard');

  return (
    <DashboardContext.Provider value={{ profileState, setProfileState }}>
      {children}
    </DashboardContext.Provider>
  );
};
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
