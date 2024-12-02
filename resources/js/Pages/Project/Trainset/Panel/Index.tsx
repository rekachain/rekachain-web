import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';
import { useLoading } from '@/Contexts/LoadingContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from '@/Support/Constants/routes';
import { ProjectResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, memo, Suspense } from 'react';
import Panels from './Partials/Panels';

const Trainsets = memo(lazy(() => import('../Partials/Trainsets')));

export default function ({
    trainset,
    project,
}: {
    trainset: TrainsetResource;
    project: ProjectResource;
}) {
    const { t } = useLaravelReactI18n();
    // const [project, setProject] = useState<ProjectResource>(initialProject);
    const { data, setData, reset } = useForm({
        trainsetNeeded: 0,
    });

    const { loading } = useLoading();

    const handleAddTrainset = withLoading(async (e) => {
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
                            <h1 className='text-page-header my-4'>Panel untuk {trainset.name}</h1>

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
                        <Panels trainset={trainset} project={project}></Panels>
                        {/* <Trainsets project={project} handleSyncProject={handleSyncProject} /> */}
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
