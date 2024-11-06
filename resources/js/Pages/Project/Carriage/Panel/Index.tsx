import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { CarriageResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { projectService } from '@/Services/projectService';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';

export default function ({ project: initialProject, carriage: initialCarriage }: { project: ProjectResource, carriage: CarriageResource }) {
    const { t } = useLaravelReactI18n();
    const [project, setProject] = useState<ProjectResource>(initialProject);
    const [carriage, setCarriage] = useState<CarriageResource>(initialCarriage);
    const handleSyncProject = withLoading(async () => {
        const updatedProject = await projectService.get(initialProject.id);
        setProject(updatedProject);
    });

    const Panels = lazy(() => import('./Partials/Panels'));
    return (
        <>
            <Head title={t('pages.project.panel.index.title')} />
            <AuthenticatedLayout>
                <div className="p-4 space-y-4">
                    <div className="flex flex-col gap-2">
                        <div>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <Link href={route(`${ROUTES.PROJECTS}.index`)}>
                                            {t('pages.project.panel.index.breadcrumbs.home')}
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <Link href={route(`${ROUTES.PROJECTS_CARRIAGES}.index`, [project.id])}>
                                            {t('pages.project.panel.index.breadcrumbs.project', {
                                                project: project.name,
                                            })}
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {t('pages.project.carriages.panel.index.breadcrumbs.carriage', {
                                                carriage: carriage.type,
                                            })}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <h1 className="text-page-header my-4">{t('pages.project.panel.index.title')}</h1>
                        </div>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Panels project={project} carriage={carriage} />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}