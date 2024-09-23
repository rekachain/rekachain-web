// src/components/LoadingOverlay.tsx
import React from 'react';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { useLoading } from '@/Contexts/LoadingContext';

export default function LoadingOverlay() {
    const { loading } = useLoading();

    if (!loading) return null;

    return <StaticLoadingOverlay />;
}
