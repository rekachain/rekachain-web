import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/UI/dialog';
import { Button } from '@/Components/UI/button';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface ShowConfirmationProps {
    (onConfirm: () => void, confirmationTitle?: string, confirmationDescription?: string): void;
}

interface ConfirmationDialogContextProps {
    showConfirmation: ShowConfirmationProps;
}

const ConfirmationDialogContext = createContext<ConfirmationDialogContextProps | undefined>(
    undefined,
);

export const useConfirmationDialog = () => {
    const { t } = useLaravelReactI18n();
    const context = useContext(ConfirmationDialogContext);
    if (!context) {
        throw new Error(t('contexts.confirmation_dialog_context.context_provider_error'));
    }
    return context;
};

export const ConfirmationDialogProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { t } = useLaravelReactI18n();
    const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

    const showConfirmation: ShowConfirmationProps = (
        onConfirm: () => void,
        confirmationTitle?: string,
        confirmationDescription?: string,
    ) => {
        setTitle(confirmationTitle || t('contexts.confirmation_dialog_context.title'));
        setDescription(
            confirmationDescription || t('contexts.confirmation_dialog_context.description'),
        );
        setOnConfirm(() => onConfirm);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        setIsOpen(false);
        onConfirm();
    };

    return (
        <ConfirmationDialogContext.Provider value={{ showConfirmation }}>
            {children}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className='max-w-sm md:max-w-md'>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant='ghost' size='sm' onClick={() => setIsOpen(false)}>
                            {t('action.cancel')}
                        </Button>
                        <Button size='sm' onClick={handleConfirm}>
                            {t('action.confirm')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ConfirmationDialogContext.Provider>
    );
};
