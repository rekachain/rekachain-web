import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/sidebarHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function () {
    const { t } = useLaravelReactI18n();
    const Users = lazy(() => import('./Partials/Users'));

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 900px)',
    });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });
    return (
        <>
            <Head title={t('pages.user.index.title')} />
            <AuthenticatedLayout>
                <div className='p-2 md:p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>Staff</h1>
                        {checkPermission(PERMISSION_ENUM.USER_CREATE) && (
                            <Link
                            href={route(`${ROUTES.USERS}.create`)}
                            className={buttonVariants({ variant: 'default' })}
                            >
                            {t('pages.user.index.buttons.create')}
                        </Link>
                        )}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Users />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
