import { useConfirmationDialog } from '@/Contexts/ConfirmationDialogContext';
import { useLoading } from '@/Contexts/LoadingContext';

export function withLoading(
    fn: (...args: any[]) => Promise<void>,
    confirmation?: boolean,
    // TODO: Refactor using type
    confirmationObject?: {
        title?: string;
        text?: string;
    },
) {
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
            // Execute form e.preventDefault() if it exists
            // TODO: Need to find a better way to handle this, it may not be the best way to handle this
            const event = args[0];
            if (event && typeof event.preventDefault === 'function') {
                event.preventDefault();
            }

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
