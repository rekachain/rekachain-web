import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { buttonVariants } from '@/Components/UI/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from '@/Support/Constants/routes';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense } from 'react';
import Import from './Partials/Import';

export default function () {
    const { t } = useLaravelReactI18n();
    const Projects = lazy(() => import('./Partials/Projects'));
    return (
        <>
            <Head title={t('pages.project.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-start md:items-center gap-5'>
                        <h1 className='text-page-header md:my-4'>{t('pages.project.index.title')}</h1>
                        <div className="flex flex-col md:flex-row gap-2 justify-end">
                            <Link
                                href={route(`${ROUTES.PROJECTS}.create`)}
                                className={buttonVariants({ variant: 'default' })}
                            >
                                {t('pages.project.index.buttons.create')}
                            </Link>
                            <Import />
                        </div>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Projects />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
