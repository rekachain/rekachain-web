import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { buttonVariants } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const Components = lazy(() => import('./Partials/Components'));
    return (
        <>
            <Head title={t('pages.component.index.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.component.index.title')}</h1>
                        <Link
                            href={route(`${ROUTES.COMPONENTS}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            {t('pages.component.index.buttons.create')}
                        </Link>
                        {/*<Import />*/}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Components />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
