import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { PageProps as AppPageProps } from './';
import Swal from 'sweetalert2';

declare global {
    interface Window {
        axios: AxiosInstance;
        Swal: typeof Swal;
    }

    var route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
    interface PageProps extends AppPageProps {}
}
