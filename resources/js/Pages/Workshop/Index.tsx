import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { buttonVariants } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const Workshops = lazy(() => import('./Partials/Workshops'));
    return (
        <>
            <Head title={t('pages.workshop.index.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.workshop.index.title')}</h1>
                        <Link
                            href={route(`${ROUTES.WORKSHOPS}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            {t('pages.workshop.index.buttons.create')}
                        </Link>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Workshops />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
