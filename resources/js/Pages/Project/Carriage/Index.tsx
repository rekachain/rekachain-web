import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { projectService } from '@/Services/projectService';
import { ROUTES } from '@/Support/Constants/routes';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense, useState } from 'react';

export default function ({ project: initialProject }: { project: ProjectResource }) {
    const { t } = useLaravelReactI18n();
    const [project, setProject] = useState<ProjectResource>(initialProject);
    const handleSyncProject = withLoading(async () => {
        const updatedProject = await projectService.get(initialProject.id);
        setProject(updatedProject);
    });

    const Carriages = lazy(() => import('./Partials/Carriages'));
    return (
        <>
            <Head title={t('pages.project.carriage.index.title')} />
            <AuthenticatedLayout>
                <div className='space-y-4 p-4'>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <Link href={route(`${ROUTES.PROJECTS}.index`)}>
                                            {t('pages.project.carriage.index.breadcrumbs.home')}
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {t('pages.project.carriage.index.breadcrumbs.project', {
                                                project: project.name,
                                            })}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <h1 className='text-page-header my-4'>
                                {t('pages.project.carriage.index.title')}
                            </h1>
                        </div>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Carriages project={project} handleSyncProject={handleSyncProject} />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
