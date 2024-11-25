import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { buttonVariants } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import Import from '@/Pages/RawMaterial/Partials/Import';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const RawMaterials = lazy(() => import('./Partials/RawMaterials'));
    return (
        <>
            <Head title={t('pages.raw_material.index.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex flex-col md:flex-row gap-5 md:items-center">
                        <h1 className="text-page-header my-4">{t('pages.raw_material.index.title')}</h1>
                        <Link
                            href={route(`${ROUTES.RAW_MATERIALS}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            {t('pages.raw_material.index.buttons.create')}
                        </Link>
                        <Import />
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <RawMaterials />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
