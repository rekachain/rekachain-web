import { SweetAlertOptions } from 'sweetalert2';

export const useToast = async (options: SweetAlertOptions = {}) => {
    return await window.Swal.fire({
        toast: true,
        position: 'bottom-end',
        timer: 2000,
        showConfirmButton: false,
        ...options,
    });
};

export const useSuccessToast = async (title?: string, text?: string) => {
    return await useToast({
        icon: 'success',
        title: title || 'Success',
        text: text || 'Operation successful',
    });
};

export const useErrorToast = async (title?: string, text?: string) => {
    return await useToast({
        icon: 'error',
        title: title || 'Error',
        text: text || 'Operation failed',
    });
};

export const useWarningToast = async (title?: string, text?: string) => {
    return await useToast({
        icon: 'warning',
        title: title || 'Warning',
        text: text || 'Operation warning',
    });
};

export const useInfoToast = async (title?: string, text?: string) => {
    return await useToast({
        icon: 'info',
        title: title || 'Info',
        text: text || 'Operation info',
    });
};

export const useQuestionToast = async (title?: string, text?: string) => {
    return await useToast({
        icon: 'question',
        title: title || 'Question',
        text: text || 'Operation question',
    });
};
