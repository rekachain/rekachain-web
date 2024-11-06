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
            {carriageResponse?.data.map(data => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={data.carriage.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                        <div className="flex w-full justify-between items-scenter">
                            <h4 className="font-bold text-base">{data.carriage.type}</h4>
                        </div>
                        <p className="text-sm">{data.carriage.description}</p>

                        <h5 className="font-bold text-sm ">
                            {t('pages.project.carriages.partials.partials.carriage_card.headers.total_qty', {
                                total_qty: data.total_qty,
                            })}
                        </h5>
                        <div className="flex items-center justify-end w-full">
                            <Link
                                className={buttonVariants({ variant: 'link' })}
                                href={route(`${ROUTES.PROJECTS_CARRIAGES_COMPONENTS}.index`, [project.id, data.carriage.id])}
                            >
                                {t('pages.project.partials.partials.project_table.actions.components')}
                            </Link>
                            <Link
                                className={buttonVariants({ variant: 'link' })}
                                href={route(`${ROUTES.PROJECTS_CARRIAGES_PANELS}.index`, [project.id, data.carriage.id])}
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
