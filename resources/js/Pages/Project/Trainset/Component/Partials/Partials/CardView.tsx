import React from 'react'
import { ProjectComponentResource, ProjectResource, TrainsetResource } from '@/Support/Interfaces/Resources'
import { PaginateResponse } from '@/Support/Interfaces/Others'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import AnimateIn from '@/Lib/AnimateIn'
import Import from '../Import'

export default function CardView(

    {
        project,
        trainset,
        componentResponse
    }:{
        project:ProjectResource,
        trainset:TrainsetResource
        componentResponse:PaginateResponse<ProjectComponentResource>
    }
) {

    const { t } = useLaravelReactI18n();
  return (

        <div>
            {componentResponse?.data.map((data) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={data.component.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='items-scenter flex w-full justify-between'>
                            <h4 className='text-base font-bold'>{data.component.name}</h4>
                            {/* <div className="text-center">
                                <h4 className="font-bold text-base">Proses : {panel.name}</h4> */}
                            {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {panel.division.name}
                                </h5> */}
                            {/* </div> */}
                        </div>
                        <p className='text-sm'>{data.component.description}</p>

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
                            <Import
                                project={project}
                                component={data.component}
                                hasMaterials={data.has_materials} 
                                trainset={trainset}                            />
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </div>
  )
}
