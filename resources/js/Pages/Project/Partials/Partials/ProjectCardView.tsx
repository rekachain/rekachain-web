import { Button, buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
            {projectResponse.data.map(project => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={project.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-5">
                        <div className="flex w-full justify-between items-center">
                            <h4 className="font-bold text-lg">{project.name}</h4>
                            <div className="text-center">
                                <h5
                                    className="font-bold text-base
                             items-center "
                                >
                                    {project.initial_date}
                                </h5>
                            </div>
                        </div>
                        <h4 className="text-base">
                            {t('pages.project.partials.partials.project_card.headers.trainset_count', {
                                trainset_count: project.trainset_count,
                            })}
                        </h4>
                        {/* <p>Jumlah User :{project.users_count}</p>
                        <p>Jumlah Izin :{project.permissions_count}</p> */}
                        <div className="flex items-center justify-end w-full">
                            <Link
                                className={buttonVariants({ variant: 'link' })}
                                href={route(`${ROUTES.PROJECTS}.edit`, project.id)}
                                // className={buttonVariants({ variant: 'link' })}
                                // href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                            >
                                {t('action.edit')}
                            </Link>
                            <Button variant="link" onClick={() => handleProjectDeletion(project.id)}>
                                {t('action.delete')}
                            </Button>
                            <Link
                                className={buttonVariants({ variant: 'link' })}
                                href={route(`${ROUTES.PROJECTS_TRAINSETS}.index`, project.id)}
                            >
                                {t('pages.project.partials.partials.project_card.actions.trainsets')}
                            </Link>
                            <Link
                                className={buttonVariants({ variant: 'link' })}
                                href={route(`${ROUTES.PROJECTS_COMPONENTS}.index`, project.id)}
                            >
                                {'components'}
                            </Link>
                        </div>
                    </div>
                    {/* </div> */}
                </AnimateIn>
            ))}
        </div>
    );
}
