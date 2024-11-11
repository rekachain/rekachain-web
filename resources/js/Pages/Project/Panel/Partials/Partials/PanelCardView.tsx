import AnimateIn from '@/Lib/AnimateIn';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ProjectPanelResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Import from '../Import';

export default function ({
    project,
    panelResponse,
}: {
    project: ProjectResource;
    panelResponse: PaginateResponse<ProjectPanelResource>;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            {panelResponse?.data.map(data => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={data.panel.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                        <div className="flex w-full justify-between items-scenter">
                            <h4 className="font-bold text-base">{data.panel.name}</h4>
                            {/* <div className="text-center">
                                <h4 className="font-bold text-base">Proses : {panel.name}</h4> */}
                            {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {panel.division.name}
                                </h5> */}
                            {/* </div> */}
                        </div>
                        <p className="text-sm">{data.panel.description}</p>

                        <h5 className="font-bold text-sm">
                            {t('pages.project.panel.partials.partials.panel_card.headers.total_qty', {
                                total_qty: data.total_qty,
                            })}
                        </h5>
                        {/* <h5 className=" text-sm ">Lokasi : {panel.location}</h5> */}
                        <div className="flex items-center justify-end w-full">
                            <Import project={project} panel={data.panel} hasMaterials={data.has_materials} />
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </div>
    );
}
