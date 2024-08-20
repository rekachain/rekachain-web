import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { buttonVariants } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { ProjectResource } from '@/support/interfaces/resources';

export default function ({ project }: { project: ProjectResource }) {
    const ProjectDetails = lazy(() => import('./Partials/ProjectDetails'));
    return (
        <>
            <Head title={`Project ${project.name}`} />
            <AuthenticatedLayout>
                <div className="p-4 space-y-4">
                    <div className="flex flex-col">
                        <h1 className="text-page-header my-4">Project {project.name}</h1>
                        <p className="text-page-subheader">Initial Date: {project.initial_date}</p>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <ProjectDetails project={project} />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
