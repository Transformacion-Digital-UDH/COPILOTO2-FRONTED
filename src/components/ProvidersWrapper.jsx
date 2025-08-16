import React from 'react';
import { SidebarProvider } from '../hooks/useSidebar';
import { AuthProvider } from '../hooks/useAuthStore';
import { ThemeProvider } from '../hooks/useThemeStore';
import { StandardLayout } from '../layouts/index.jsx';

const ProvidersWrapper = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <StandardLayout>
            {children}
          </StandardLayout>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default ProvidersWrapper;
