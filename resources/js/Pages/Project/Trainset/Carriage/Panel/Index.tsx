import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { CarriageResource, ProjectResource, TrainsetResource } from '@/support/interfaces/resources';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/ui/breadcrumb';
import { ROUTES } from '@/support/constants/routes';

const Panels = memo(lazy(() => import('./Partials/Panels')));

export default function ({
    project,
    trainset,
    carriage: initialCarriage,
}: {
    project: ProjectResource;
    trainset: TrainsetResource;
    carriage: CarriageResource;
}) {
    const [carriage, setProject] = useState<CarriageResource>(initialCarriage);
    const { data, setData, post, processing, errors, reset } = useForm({
        trainsetNeeded: 0,
        isLoading: false,
    });

    const handleAddTrainset = async () => {
        setData('isLoading', true);
        // await carriageService.addTrainset(carriage.id, data.trainsetNeeded);
        // await handleSyncCarriage();
        // reset();
    };

    const handleSyncCarriage = async () => {
        // const updatedProject = await carriageService.get(initialCarriage.id);
        // setProject(updatedProject);
    };
    return (
        <>
            <Head title={`Carriage: ${carriage.type}`} />
            <AuthenticatedLayout>
                <div className="p-4 space-y-4">
                    <div className="flex flex-col gap-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link href={route(`${ROUTES.PROJECTS}.index`)}>Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link href={route(`${ROUTES.PROJECTS_TRAINSETS}.index`, [project.id])}>
                                        Proyek {project?.name}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link
                                        href={route(`${ROUTES.PROJECTS_TRAINSETS_CARRIAGES}.index`, [
                                            project.id,
                                            trainset.id,
                                        ])}
                                    >
                                        Trainset {trainset?.name}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Carriage {carriage.type}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center gap-4">
                            <h1 className="text-page-header my-4">Carriage {carriage.type}</h1>
                            <Button>Tambah ga ya</Button>
                            {/*<p className="text-page-subheader">Initial Date: {carriage.initial_date}</p>*/}
                        </div>
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Panels carriage={carriage} handleSyncCarriage={handleSyncCarriage} />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
