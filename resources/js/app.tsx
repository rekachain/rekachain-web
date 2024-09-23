import './bootstrap';
import 'spinkit/spinkit.min.css';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Toaster } from './Components/ui/toaster';
import LoadingOverlay from '@/Components/LoadingOverlay';
import { LoadingProvider } from '@/Contexts/LoadingContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: title => `${title} - ${appName}`,
    resolve: name => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <LoadingProvider>
                <App {...props} />
                <Toaster />
                <LoadingOverlay />
            </LoadingProvider>,
        );
    },
    progress: {
        color: '#FF204E',
    },
});
