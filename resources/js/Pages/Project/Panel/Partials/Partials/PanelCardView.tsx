import AnimateIn from '@/Lib/AnimateIn';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ProjectPanelResource, ProjectResource } from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Import from '../Import';
import { checkPermission } from '@/Helpers/permissionHelper';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';

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
            {panelResponse?.data.map((data) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={data.panel.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='items-scenter flex w-full justify-between'>
                            <h4 className='text-base font-bold'>{data.panel.name}</h4>
                            {/* <div className="text-center">
                                <h4 className="font-bold text-base">Proses : {panel.name}</h4> */}
                            {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {panel.division.name}
                                </h5> */}
                            {/* </div> */}
                        </div>
                        <p className='text-sm'>{data.panel.description}</p>

                        <h5 className='text-sm font-bold'>
                            {t(
                                'pages.project.panel.partials.partials.panel_card.headers.total_qty',
                                {
                                    total_qty: data.total_qty,
                                },
                            )}
                        </h5>
                        {/* <h5 className=" text-sm ">Lokasi : {panel.location}</h5> */}
                        <div className='flex w-full items-center justify-end'>
                        {checkPermission(PERMISSION_ENUM.PROJECT_PANEL_IMPORT) && (
                            <Import
                                project={project}
                                panel={data.panel}
                                hasMaterials={data.has_materials}
                            />
                        )}
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </div>
    );
}
