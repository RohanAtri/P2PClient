// app/borrower/layout.tsx
import { SidebarToggleProvider } from './components/SidebarToggleContext';
import RightSidebar from './components/RightSidebar';
import { ReactNode } from 'react';

export default function BorrowerLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarToggleProvider>
      <div className="flex">
        {/* Page Content */}
        <div className="flex-1">{children}</div>
        {/* Sidebar */}
        <RightSidebar />
      </div>
    </SidebarToggleProvider>
  );
}
