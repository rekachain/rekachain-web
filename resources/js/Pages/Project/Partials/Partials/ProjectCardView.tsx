import { Button, buttonVariants } from '@/Components/UI/button';
import { Select, SelectContent, SelectTrigger } from '@/Components/UI/select';
import { checkPermission } from '@/Helpers/permissionHelper';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { STYLING } from '@/Support/Constants/styling';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Ellipsis } from 'lucide-react';

export default function ProjectCardView({
    projectResponse,
    handleProjectDeletion,
}: {
    projectResponse: PaginateResponse<ProjectResource>;
    handleProjectDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            {projectResponse.data.map((project) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={project.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-5 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='flex w-full items-center justify-between'>
                            <h4 className='text-lg font-bold'>{project.name}</h4>
                            <div className='text-center'>
                                <h5 className='items-center text-base font-bold'>
                                    {project.initial_date}
                                </h5>
                            </div>
                        </div>
                        <h4 className='text-base'>
                            {t(
                                'pages.project.partials.partials.project_card.headers.trainset_count',
                                {
                                    trainset_count: project.trainset_count,
                                },
                            )}
                        </h4>
                        {/* <p>Jumlah User :{project.users_count}</p>
                        <p>Jumlah Izin :{project.permissions_count}</p> */}
                        <div className='flex w-full items-center justify-end'>
                            <Select>
                                <SelectTrigger className='w-fit border-none md:hidden'>
                                    <Ellipsis size={STYLING.ICON.SIZE.SMALL}></Ellipsis>
                                </SelectTrigger>
                                <SelectContent className=' '>
                                    <div className='flex flex-col justify-start gap-2'>
                                        {checkPermission(PERMISSION_ENUM.PROJECT_UPDATE) && (
                                            <Link
                                                href={route(`${ROUTES.PROJECTS}.edit`, project.id)}
                                                className={buttonVariants({ variant: 'link' })}
                                                // className={buttonVariants({ variant: 'link' })}
                                                // href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                                            >
                                                {t('action.edit')}
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.PROJECT_DELETE) &&
                                            project.can_be_deleted && (
                                                <Button
                                                    variant='link'
                                                    onClick={() =>
                                                        handleProjectDeletion(project.id)
                                                    }
                                                >
                                                    {t('action.delete')}
                                                </Button>
                                            )}
                                        {checkPermission(PERMISSION_ENUM.PROJECT_CARRIAGE_READ) && (
                                            <Link
                                                href={route(
                                                    `${ROUTES.PROJECTS_CARRIAGES}.index`,
                                                    project.id,
                                                )}
                                                className={buttonVariants({ variant: 'link' })}
                                            >
                                                {t(
                                                    'pages.project.partials.partials.project_table.actions.carriages',
                                                )}
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.PROJECT_TRAINSET_READ) && (
                                            <Link
                                                href={route(
                                                    `${ROUTES.PROJECTS_TRAINSETS}.index`,
                                                    project.id,
                                                )}
                                                className={buttonVariants({ variant: 'link' })}
                                            >
                                                {t(
                                                    'pages.project.partials.partials.project_card.actions.trainsets',
                                                )}
                                            </Link>
                                        )}
                                        {checkPermission(
                                            PERMISSION_ENUM.PROJECT_COMPONENT_READ,
                                        ) && (
                                            <Link
                                                href={route(
                                                    `${ROUTES.PROJECTS_COMPONENTS}.index`,
                                                    project.id,
                                                )}
                                                className={buttonVariants({ variant: 'link' })}
                                            >
                                                {t(
                                                    'pages.project.partials.partials.project_table.actions.components',
                                                )}
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.PROJECT_PANEL_READ) && (
                                            <Link
                                                href={route(
                                                    `${ROUTES.PROJECTS_PANELS}.index`,
                                                    project.id,
                                                )}
                                                className={buttonVariants({ variant: 'link' })}
                                            >
                                                {t(
                                                    'pages.project.partials.partials.project_table.actions.panels',
                                                )}
                                            </Link>
                                        )}
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* </div> */}
                </AnimateIn>
            ))}
        </div>
    );
}
