import { ReactNode } from 'react';

interface AlertProps {
    message: string;
    children: ReactNode;
}

const CustomPresetAlert = ({ message, children }: AlertProps) => {
    return (
        <div className="sticky bottom-0 left-0 right-0 bg-yellow-500 text-white p-4 animate-slide-up">
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default CustomPresetAlert;
