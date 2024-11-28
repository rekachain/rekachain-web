import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head } from '@inertiajs/react';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const Permissions = lazy(() => import('./Partials/Permissions'));
    return (
        <>
            <Head title={t('pages.permission.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.permission.index.title')}
                        </h1>
                        {/*<Link className={buttonVariants({ variant: 'default' })} href={route(`${ROUTES.ROLES}.create`)}>*/}
                        {/*    Tambah Permission*/}
                        {/*</Link>*/}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Permissions />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
