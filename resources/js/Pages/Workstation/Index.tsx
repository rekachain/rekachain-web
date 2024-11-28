import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { buttonVariants } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const Workstations = lazy(() => import('./Partials/Workstations'));
    return (
        <>
            <Head title={t('pages.workstation.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.workstation.index.title')}
                        </h1>
                        <Link
                            href={route(`${ROUTES.WORKSTATIONS}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            {t('pages.workstation.index.buttons.create')}
                        </Link>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Workstations />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
