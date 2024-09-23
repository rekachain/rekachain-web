import { SweetAlertOptions } from 'sweetalert2';

export const useAlert = async (options: SweetAlertOptions) => {
    return await window.Swal.fire(options);
};

export const useSuccessAlert = async (title?: string, text?: string) => {
    return await useAlert({
        icon: 'success',
        title: title || 'Success',
        text: text || 'Operation successful',
    });
};

export const useErrorAlert = async (title?: string, text?: string) => {
    return await useAlert({
        icon: 'error',
        title: title || 'Error',
        text: text || 'Operation failed',
    });
};

export const useWarningAlert = async (title?: string, text?: string) => {
    return await useAlert({
        icon: 'warning',
        title: title || 'Warning',
        text: text || 'Operation warning',
    });
};

export const useInfoAlert = async (title?: string, text?: string) => {
    return await useAlert({
        icon: 'info',
        title: title || 'Info',
        text: text || 'Operation info',
    });
};

export const useQuestionAlert = async (title?: string, text?: string) => {
    return await useAlert({
        icon: 'question',
        title: title || 'Question',
        text: text || 'Operation question',
    });
};
