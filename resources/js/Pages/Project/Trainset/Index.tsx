import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { ProjectResource } from '@/support/interfaces/resources';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { projectService } from '@/services/projectService';
import { Loader2 } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/ui/breadcrumb';
import { ROUTES } from '@/support/constants/routes';

const Trainsets = memo(lazy(() => import('./Partials/Trainsets')));

export default function ({ project: initialProject }: { project: ProjectResource }) {
    const [project, setProject] = useState<ProjectResource>(initialProject);
    const { data, setData, post, processing, errors, reset } = useForm({
        trainsetNeeded: 0,
        isLoading: false,
    });
    const handleAddTrainset = async () => {
        setData('isLoading', true);
        await projectService.addTrainset(project.id, data.trainsetNeeded);
        await handleSyncProject();
        reset();
    };

    const handleSyncProject = async () => {
        const updatedProject = await projectService.get(initialProject.id);
        setProject(updatedProject);
    };
    return (
        <>
            <Head title={`Project ${project.name}`} />
            <AuthenticatedLayout>
                <div className="p-4 space-y-4">
                    <div className="flex flex-col gap-2">
                        <div>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <Link href={route(`${ROUTES.PROJECTS}.index`)}>Home</Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Project {project.name}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>

                            <h1 className="text-page-header my-4">Project {project.name}</h1>
                            <p className="text-page-subheader">Initial Date: {project.initial_date}</p>
                        </div>

                        <div className="rounded p-5 bg-background-2">
                            <form onSubmit={handleAddTrainset} className="flex flex-col gap-2">
                                <Label htmlFor="tambah-trainset">Tambah trainset baru</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="tambah-trainset"
                                        type="number"
                                        className="w-fit"
                                        placeholder="Add Trainset"
                                        value={data.trainsetNeeded}
                                        onChange={e => setData('trainsetNeeded', +e.target.value)}
                                    />
                                    <Button type="submit" disabled={data.isLoading}>
                                        {data.isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Adding Trainset
                                            </>
                                        ) : (
                                            'Add Trainset'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Trainsets project={project} handleSyncProject={handleSyncProject} />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
