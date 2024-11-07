import AnimateIn from '@/Lib/AnimateIn';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ProjectComponentResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Import from '../Import';

export default function ({
    project,
    componentResponse,
}: {
    project: ProjectResource;
    componentResponse: PaginateResponse<ProjectComponentResource>;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            {componentResponse?.data.map(data => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={data.component.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                        <div className="flex w-full justify-between items-scenter">
                            <h4 className="font-bold text-base">{data.component.name}</h4>
                            {/* <div className="text-center">
                                <h4 className="font-bold text-base">Proses : {component.name}</h4> */}
                            {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {component.division.name}
                                </h5> */}
                            {/* </div> */}
                        </div>
                        <p className="text-sm">{data.component.description}</p>

                        <h5 className="font-bold text-sm ">
                            {t('pages.project.component.partials.partials.component_card.headers.total_qty', {
                                total_qty: data.total_qty,
                            })}
                        </h5>
                        {/* <h5 className=" text-sm ">Lokasi : {component.location}</h5> */}
                        <div className="flex items-center justify-end w-full">
                            <Import project={project} component={data.component} />
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </div>
    );
}
