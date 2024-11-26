import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { buttonVariants } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { useMediaQuery } from 'react-responsive';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
                <div className="p-2 md:p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Staff</h1>
                        <Link href={route(`${ROUTES.USERS}.create`)} className={buttonVariants({ variant: 'default' })}>
                            {t('pages.user.index.buttons.create')}
                        </Link>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Users />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
