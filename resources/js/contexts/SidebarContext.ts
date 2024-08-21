import { createContext } from 'react';

interface ISidebarContext {
    selectedMenu: string;
    setSelectedMenu: (value: string) => void;
}

export const SidebarContext = createContext<ISidebarContext | null>(null);
