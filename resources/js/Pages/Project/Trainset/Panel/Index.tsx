import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/UI/button';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { ProjectResource, TrainsetResource } from '@/Support/Interfaces/Resources';
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
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Carriage } from '@/Support/Interfaces/Models';
import Panels from './Partials/Panels';

const Trainsets = memo(lazy(() => import('../Partials/Trainsets')));

export default function ({ trainset, project }: { trainset: TrainsetResource; project: ProjectResource }) {
    const { t } = useLaravelReactI18n();
    // const [project, setProject] = useState<ProjectResource>(initialProject);
    const { data, setData, reset } = useForm({
        trainsetNeeded: 0,
    });

    const { loading } = useLoading();

    const handleAddTrainset = withLoading(async e => {
        e.preventDefault();
        console.log('==========');
        console.log(trainset);
        // await projectService.addTrainset(project.id, data.trainsetNeeded);
        // await handleSyncProject();
        // reset();
        // void useSuccessToast(t('pages.project.trainset.index.messages.trainset_added'));
    });

    const handleSyncProject = withLoading(async () => {
        // const updatedProject = await projectService.get(initialProject.id);
        // setProject(updatedProject);
    });

    return (
        <>
            <Head title={'Trainset Component'} />
            <AuthenticatedLayout>
                <div className="p-4 space-y-4">
                    <div className="flex flex-col gap-2">
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
                            <h1 className="text-page-header my-4">Panel untuk {trainset.name}</h1>

                            {/* <h1 className="text-page-header my-4">
                                {t('pages.project.trainset.index.title', { name: project.name })}
                            </h1>
                            <p className="text-page-subheader">
                                {t('pages.project.trainset.index.initial_date', {
                                    initial_date: project.initial_date,
                                })}
                            </p> */}
                        </div>

                        {/* <div className="rounded p-5 bg-background-2">
                            <form onSubmit={handleAddTrainset} className="flex flex-col gap-2 group" noValidate>
                                <Label htmlFor="add-trainset">
                                    {t('pages.project.trainset.index.buttons.add_trainset')}
                                </Label>
                                <div className="flex gap-2">
                                    <div className="">
                                        <Input
                                            // pattern="^[2-9]\d*$"
                                            id="add-trainset"
                                            type="number"
                                            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 w-fit peer"
                                            min={1}
                                            placeholder={t(
                                                'pages.project.trainset.index.fields.trainset_needed_placeholder',
                                            )}
                                            value={data.trainsetNeeded}
                                            onChange={e => setData('trainsetNeeded', +e.target.value)}
                                            required
                                        />
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            {t('pages.project.trainset.index.fields.trainset_needed_error')}
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
                                                {t('action.loading')}
                                            </>
                                        ) : (
                                            t('pages.project.trainset.index.buttons.add_trainset')
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div> */}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Panels project={project} trainset={trainset}></Panels>
                        {/* <Trainsets project={project} handleSyncProject={handleSyncProject} /> */}
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
