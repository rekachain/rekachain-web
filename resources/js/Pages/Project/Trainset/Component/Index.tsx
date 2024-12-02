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
import { ProjectResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Suspense, useState } from 'react';
import Components from './Partials/Components';

export default function ({
    project: initialProject,
    trainset,
}: {
    project: ProjectResource;
    trainset: TrainsetResource;
}) {
    const { t } = useLaravelReactI18n();
    const [project, setProject] = useState<ProjectResource>(initialProject);
    const handleSyncProject = withLoading(async () => {
        const updatedProject = await projectService.get(initialProject.id);
        setProject(updatedProject);
    });

    // const Components = lazy(() => import('./Partials/Components'));
    return (
        <>
            <Head title={t('pages.project.component.index.title')} />
            <AuthenticatedLayout>
                <div className='space-y-4 p-4'>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <Link href={route(`${ROUTES.PROJECTS}.index`)}>
                                            {t('pages.project.trainset.index.breadcrumbs.home')}
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {t('pages.project.trainset.index.breadcrumbs.project', {
                                            project: project.name,
                                        })}
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{trainset.name}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <h1 className='text-page-header my-4'>
                                Komponen untuk {trainset.name}
                            </h1>
                        </div>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Components trainset={trainset} project={project} />
                        {/* <Components project={project} handleSyncProject={handleSyncProject} /> */}
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
