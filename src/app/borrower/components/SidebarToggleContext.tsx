'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarToggleProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarToggle = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebarToggle must be used within SidebarToggleProvider');
  return context;
};
