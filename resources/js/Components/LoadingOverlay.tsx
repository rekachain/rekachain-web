// src/components/LoadingOverlay.tsx
import React from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';

export default function LoadingOverlay() {
    const { loading } = useLoading();

    if (!loading) return null;

    return <StaticLoadingOverlay />;
}
