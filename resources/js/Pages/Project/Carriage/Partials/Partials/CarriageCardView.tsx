import { buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ProjectCarriageResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Link } from '@inertiajs/react';

export default function ({
    project,
    carriageResponse,
}: {
    project: ProjectResource;
    carriageResponse: PaginateResponse<ProjectCarriageResource>;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            {carriageResponse?.data.map((data) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={data.carriage.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='items-scenter flex w-full justify-between'>
                            <h4 className='text-base font-bold'>{data.carriage.type}</h4>
                        </div>
                        <p className='text-sm'>{data.carriage.description}</p>

                        <h5 className='text-sm font-bold'>
                            {t(
                                'pages.project.carriage.partials.partials.carriage_card.headers.total_qty',
                                {
                                    total_qty: data.total_qty,
                                },
                            )}
                        </h5>
                        <div className='flex w-full items-center justify-end'>
                            <Link
                                href={route(`${ROUTES.PROJECTS_CARRIAGES_COMPONENTS}.index`, [
                                    project.id,
                                    data.carriage.id,
                                ])}
                                className={buttonVariants({ variant: 'link' })}
                            >
                                {t(
                                    'pages.project.partials.partials.project_table.actions.components',
                                )}
                            </Link>
                            <Link
                                href={route(`${ROUTES.PROJECTS_CARRIAGES_PANELS}.index`, [
                                    project.id,
                                    data.carriage.id,
                                ])}
                                className={buttonVariants({ variant: 'link' })}
                            >
                                {t('pages.project.partials.partials.project_table.actions.panels')}
                            </Link>
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </div>
    );
}
