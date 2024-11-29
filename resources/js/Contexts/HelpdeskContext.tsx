import { helpdeskContactService } from '@/Services/helpdeskContactService';
import { HelpdeskContactResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface HelpdeskContextProps {
    helpdeskContactResponse?: HelpdeskContactResource;
    syncHelpdeskContacts: () => Promise<void>;
}

const HelpdeskContext = createContext<HelpdeskContextProps | undefined>(undefined);

export const HelpdeskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [helpdeskContactResponse, setHelpdeskContactResponse] =
        useState<HelpdeskContactResource>();

    const syncHelpdeskContacts = withLoading(async () => {
        const res = await helpdeskContactService.getAll();
        if (res.data.length === 0) return;
        const [helpdeskContactResponse] = res.data;
        setHelpdeskContactResponse(helpdeskContactResponse);
    });

    useEffect(() => {
        void syncHelpdeskContacts();
    }, []);

    return (
        <HelpdeskContext.Provider
            value={{
                helpdeskContactResponse,
                syncHelpdeskContacts,
            }}
        >
            {children}
        </HelpdeskContext.Provider>
    );
};

export const useHelpdesk = (): HelpdeskContextProps => {
    const context = useContext(HelpdeskContext);
    if (!context) {
        throw new Error('useHelpdesk must be used within a HelpdeskProvider');
    }
    return context;
};
