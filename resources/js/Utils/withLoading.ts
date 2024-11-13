import { useLoading } from '@/Contexts/LoadingContext';
import { useConfirmationDialog } from '@/Contexts/ConfirmationDialogContext';

export function withLoading(fn: (...args: any[]) => Promise<void>, confirmation?: boolean, confirmationObject?: any) {
    const { setLoading } = useLoading();
    const { showConfirmation } = useConfirmationDialog();

    const invoke = async (...args: any[]) => {
        setLoading(true);

        try {
            await fn(...args);
        } catch (error) {
            /**
             * errors are already handled globally using axios interceptors
             */
            console.error('Error during async operation:', error);
        } finally {
            setLoading(false);
        }
    };

    return async function (...args: any[]) {
        if (confirmation) {
            showConfirmation(
                async () => {
                    await invoke(...args);
                },
                confirmationObject?.title,
                confirmationObject?.text,
            );
        } else {
            await invoke(...args);
        }
    };
}
