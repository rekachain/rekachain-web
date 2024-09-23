import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { ProjectResource } from '../../../Support/Interfaces/Resources';
import { Label } from '@/Components/UI/label';
import { Input } from '@/Components/UI/input';
import { projectService } from '@/Services/projectService';
import { Loader2 } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';
import { ROUTES } from '@/Support/Constants/routes';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';

const Trainsets = memo(lazy(() => import('./Partials/Trainsets')));

export default function ({ project: initialProject }: { project: ProjectResource }) {
    const [project, setProject] = useState<ProjectResource>(initialProject);
    const { data, setData, post, processing, errors, reset } = useForm({
        trainsetNeeded: 0,
    });
    const { setLoading, loading } = useLoading();

    const handleAddTrainset = async () => {
        setLoading(true);
        await projectService.addTrainset(project.id, data.trainsetNeeded);
        await handleSyncProject();
        setLoading(false);
        reset();
        useSuccessToast('Trainset added successfully');
    };

    const handleSyncProject = async () => {
        setLoading(true);
        const updatedProject = await projectService.get(initialProject.id);
        setProject(updatedProject);
        setLoading(false);
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
                            <form onSubmit={handleAddTrainset} className="flex flex-col gap-2 group" noValidate>
                                <Label htmlFor="tambah-trainset">Tambah trainset baru</Label>
                                <div className="flex gap-2">
                                    <div className="">
                                        <Input
                                            // pattern="^[2-9]\d*$"
                                            id="tambah-trainset"
                                            type="number"
                                            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 w-fit peer"
                                            min={1}
                                            placeholder="Add Trainset"
                                            value={data.trainsetNeeded}
                                            onChange={e => setData('trainsetNeeded', +e.target.value)}
                                            required
                                        />
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Jumlah Trainset harus lebih dari 0
                                        </span>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="group-invalid:pointer-events-none group-invalid:opacity-30"
                                    >
                                        {loading ? (
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
