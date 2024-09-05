import { useLoading } from '@/contexts/LoadingContext';

export function withLoading(fn: (...args: any[]) => Promise<void>) {
    const { setLoading } = useLoading();

    return async function (...args: any[]) {
        setLoading(true);

        try {
            await fn(...args);
        } catch (error) {
            // Handle the error if necessary, but errors are already handled globally using axios interceptors.
            console.error('Error during async operation:', error);
        } finally {
            setLoading(false);
        }
    };
}
