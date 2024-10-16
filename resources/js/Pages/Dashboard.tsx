import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/Types';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Dashboard({ auth }: PageProps) {
    const { t } = useLaravelReactI18n();
    return (
        <AuthenticatedLayout>
            <Head title={t('pages.dashboard.index.title')} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">{t('pages.dashboard.index.welcome')}</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
