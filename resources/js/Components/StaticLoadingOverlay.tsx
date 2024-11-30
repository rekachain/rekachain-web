import { ReactElement } from 'react';

export default function StaticLoadingOverlay({ variant = 2 }: { variant?: number }) {
    const variants: Record<number, ReactElement> = {
        1: (
            <div className='fixed bottom-0 left-0 z-[300] flex h-screen w-screen flex-col items-center justify-center gap-12 bg-black bg-opacity-75 text-white'>
                <div className='sk-chase [--sk-color:#fefefe] [--sk-size:5rem]'>
                    <div className='sk-chase-dot'></div>
                    <div className='sk-chase-dot'></div>
                    <div className='sk-chase-dot'></div>
                    <div className='sk-chase-dot'></div>
                    <div className='sk-chase-dot'></div>
                    <div className='sk-chase-dot'></div>
                </div>
            </div>
        ),
        2: (
            <div className='fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-black bg-opacity-50'>
                <div className='h-24 w-24 animate-spin rounded-full border-b-4 border-t-4 border-white border-l-transparent border-r-transparent'></div>
            </div>
        ),
    };
    return variants[variant];
}
