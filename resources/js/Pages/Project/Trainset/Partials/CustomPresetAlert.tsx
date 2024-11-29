import { ReactNode } from 'react';

interface AlertProps {
    message: string;
    children: ReactNode;
}

const CustomPresetAlert = ({ message, children }: AlertProps) => {
    return (
        <div className='animate-slide-up sticky bottom-0 left-0 right-0 bg-yellow-500 p-4 text-white'>
            <div className='flex items-center justify-between'>
                <span>{message}</span>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default CustomPresetAlert;
