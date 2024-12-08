import { PaginateMeta, PaginateResponse, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { ProjectPanelResource, ProjectResource, TrainsetResource } from '@/Support/Interfaces/Resources';
import React, { useState } from 'react'
import Import from '../Import';
import AnimateIn from '@/Lib/AnimateIn';


export default function CardView(

{
    project,
    trainset,
    panelResponse
}: {
    project: ProjectResource;
    trainset: TrainsetResource;
    panelResponse:PaginateResponse<ProjectPanelResource>
}) {
    // const [panelResponse, setPanelResponse] = useState<PaginateResponse<ProjectPanelResource>>();
    // const [panelResponseMeta, setPanelResponseMeta] = useState<PaginateMeta>();
    // const [filters, setFilters] = useState<ServiceFilterOptions>({
    //     page: 1,
    //     perPage: 10,
    // }
// ) 
  return (

        <div>
            {panelResponse?.data.map((data) => (
                <div >
                    <AnimateIn
                        to='opacity-100 translate-y-0 translate-x-0'
                        key={data.panel.id}
                        from='opacity-0 -translate-y-4'
                        duration={300}
                    >
                        <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                            <div className='items-scenter flex w-full justify-between'>
                                <h4 className='text-xl font-bold'>{data.panel.name}</h4>
                                <div className='text-center'>
                                    {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                                </div>
                            </div>

                            <h5 className='text-base'>
                                {data.panel.description}
                                {/* {t(
                                    'pages.project.trainset.partials.partials.trainset_table.headers.trainset_carriage',
                                )} */}
                            </h5>
                            <p className='text-sm'>
                                {trainset.preset_name && `(${trainset.preset_name}) `}

                                {trainset.carriages &&
                                    trainset.carriages.length > 0 &&
                                    trainset.carriages.map((carriage, index) => (
                                        <span key={carriage.id}>
                                            {carriage.pivot?.qty} {carriage.type}
                                            {index < trainset.carriages!.length - 1 && ' + '}
                                        </span>
                                    ))}
                            </p>
                            {/* <h5 className="  text-sm ">
                                Waktu Istirahat :
                                {trainset.work_day_times
                                    .filter(time => time.status === WorkDayTimeEnum.BREAK)
                                    .map(time => (
                                        <div key={time.id}>
                                            {time.start_time} - {time.end_time}
                                        </div>
                                    ))}
                            </h5> */}
                            {/* <h5 className="  text-sm ">Waktu Selesai : {trainset.end_time}</h5> */}

                            <div className='flex w-full items-center justify-end'>
                                            <Import
                                                trainset={trainset}
                                                project={project}
                                                panel={data.panel}
                                                hasMaterials={data.has_materials}
                                            />
                                {/* <Button variant="link" onClick={() => handleWorkshopDeletion(workshop.id)}>
                            Delete
                        </Button> */}
                            </div>
                        </div>
                    </AnimateIn>
                </div>
            ))}
        </div>
  )
}
