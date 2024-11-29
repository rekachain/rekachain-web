/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal, { SweetAlertOptions } from 'sweetalert2';

window.axios = axios;

function formatErrorMessages(error: any) {
    console.log(error);

    let errorHtml = '';
    if (error.response.data.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
            errorHtml += `<p>${error.response.data.errors[key][0]}</p>`;
        });
    }

    return `
    <div class="flex flex-col gap-2">
        <p>${error.response.data.message}</p>
        <div class="divider divider-horizontal">Details</div>
        ${errorHtml}
    </div>
    `;
}

function handleAxiosError(error: any) {
    // Skip interceptor (Bypass error handling)
    if (error.config.skipInterceptor) return Promise.reject(error);

    console.error('Hol up:', error);
    if (error.response?.status >= 500) {
        const ErrorSwal = withReactContent(Swal);

        const defaultAlertOptions: SweetAlertOptions = {
            icon: 'error',
            title: 'Oops...',
            text: error.response.data?.message,
            confirmButtonText: 'On it!',
        };

        if (error.response.data.errors && Object.keys(error.response.data.errors).length > 0) {
            defaultAlertOptions.html = formatErrorMessages(error);
        }

        ErrorSwal.fire(defaultAlertOptions);
    } else if (error.response?.status === 403) {
        const ErrorSwal = withReactContent(Swal);

        const defaultSwalOptions: SweetAlertOptions = {
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'error',
            title: 'Unauthorized',
            text: error.response.data.message,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        };

        if (error.response.data.errors && Object.keys(error.response.data.errors).length > 0) {
            defaultSwalOptions.html = formatErrorMessages(error);
        }

        ErrorSwal.fire(defaultSwalOptions);
    } else if (error.response?.status >= 402) {
        const ErrorSwal = withReactContent(Swal);

        const defaultSwalOptions: SweetAlertOptions = {
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'error',
            title: 'Whoops...',
            text: error.response.data.message,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        };

        if (error.response.data.errors && Object.keys(error.response.data.errors).length > 0) {
            defaultSwalOptions.html = formatErrorMessages(error);
        }

        ErrorSwal.fire(defaultSwalOptions);
    }
    return Promise.reject(error);
}

window.axios.interceptors.response.use((res) => res, handleAxiosError);

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept-Language'] = 'en';
