import { createContext, ReactNode, useContext, useState } from 'react';

interface SidebarContextProps {
    selectedMenu: string;
    setSelectedMenu: (value: string) => void;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [selectedMenu, setSelectedMenu] = useState('');

    return (
        <SidebarContext.Provider value={{ selectedMenu, setSelectedMenu }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
