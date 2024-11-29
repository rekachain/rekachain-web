import 'spinkit/spinkit.min.css';
import '../css/app.css';
import './bootstrap';

import LoadingOverlay from '@/Components/LoadingOverlay';
import { Toaster } from '@/Components/UI/toaster';
import { ConfirmationDialogProvider } from '@/Contexts/ConfirmationDialogContext';
import { LoadingProvider } from '@/Contexts/LoadingContext';
import { createInertiaApp } from '@inertiajs/react';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <LaravelReactI18nProvider
                locale={'en'}
                files={import.meta.glob('/lang/*.json')}
                fallbackLocale={'en'}
            >
                <LoadingProvider>
                    <ConfirmationDialogProvider>
                        <App {...props} />
                        <Toaster />
                        <LoadingOverlay />
                    </ConfirmationDialogProvider>
                </LoadingProvider>
            </LaravelReactI18nProvider>,
        );
    },
    progress: {
        color: '#FF204E',
    },
});
