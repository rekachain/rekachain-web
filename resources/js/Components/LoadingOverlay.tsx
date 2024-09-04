// src/components/LoadingOverlay.tsx
import React from 'react';
import { useLoading } from '@/contexts/LoadingContext';

const LoadingOverlay = () => {
    const { loading } = useLoading();

    if (!loading) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[100] flex justify-center items-center">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-white border-l-transparent border-r-transparent w-24 h-24"></div>
        </div>
    );
};

export default LoadingOverlay;
