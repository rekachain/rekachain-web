import React, { ReactElement } from 'react';

export default function StaticLoadingOverlay({ variant = 2 }: { variant?: number }) {
    const variants: Record<number, ReactElement> = {
        1: (
            <div className="h-screen w-screen fixed bottom-0 left-0 bg-black bg-opacity-75 z-[300] text-white flex flex-col justify-center items-center gap-12">
                <div className="sk-chase [--sk-size:5rem] [--sk-color:#fefefe]">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </div>
        ),
        2: (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[100] flex justify-center items-center">
                <div className="animate-spin rounded-full border-t-4 border-b-4 border-white border-l-transparent border-r-transparent w-24 h-24"></div>
            </div>
        ),
    };
    return variants[variant];
}
