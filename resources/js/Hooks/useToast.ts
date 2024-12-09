import { toast } from 'sonner';

export const useSuccessToast = (
    title: string = 'Success',
    description: string = 'Operation successful',
) => {
    return toast.success(title, {
        description,
    });
};

export const useErrorToast = (
    title: string = 'Error',
    description: string = 'Operation failed',
) => {
    return toast.error(title, {
        description,
    });
};

export const useWarningToast = (title: string = 'Warning', description: string = '') => {
    return toast.warning(title, {
        description,
    });
};

export const useInfoToast = (title: string = 'Info', description: string = '') => {
    return toast.info(title, {
        description,
    });
};
