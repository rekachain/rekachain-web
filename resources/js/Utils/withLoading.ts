import { SweetAlertOptions } from 'sweetalert2';
import { useLoading } from '@/Contexts/LoadingContext';

export function withLoading(
    fn: (...args: any[]) => Promise<void>,
    confirmation?: boolean,
    confirmationObject?: SweetAlertOptions,
) {
    const { setLoading } = useLoading();

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
            const { isConfirmed } = await window.Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: 'This action is irreversible',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                ...confirmationObject,
            });

            if (!isConfirmed) {
                return;
            }
            return await invoke(...args);
        }
        return await invoke(...args);
    };
}
