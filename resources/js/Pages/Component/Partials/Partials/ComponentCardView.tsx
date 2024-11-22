import React from 'react';
import AnimateIn from '@/Lib/AnimateIn';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ComponentResource } from '@/Support/Interfaces/Resources';
import { Button, buttonVariants } from '@/Components/UI/button';
import { Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({
    componentResponse,
    handleComponentDeletion,
}: {
    componentResponse: PaginateResponse<ComponentResource>;

    handleComponentDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            {componentResponse?.data.map(component => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={component.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3">
                        <div className="flex w-full justify-between items-scenter">
                            <h4 className="font-bold text-base">{component.name}</h4>
                            {/* <div className="text-center">
                                <h4 className="font-bold text-base">Proses : {component.name}</h4> */}
                            {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {component.division.name}
                                </h5> */}
                            {/* </div> */}
                        </div>
                        <p className="text-sm">
                            {t('pages.component.partials.partials.component_card.headers.description', {
                                description: component.description ?? '-',
                            })}
                        </p>
                        <p className="text-sm">
                            {t('pages.component.partials.partials.component_card.headers.progress', {
                                progress: component.progress?.name ?? '-',
                            })}
                        </p>
                        {/* <h5 className="font-bold text-sm ">Workshop : {component.workshop.name}</h5>
                        <h5 className=" text-sm ">Lokasi : {component.location}</h5> */}
                        <div className="flex items-center justify-end w-full">
                            <Link
                                className={buttonVariants({ variant: 'link' })}
                                href={route(`${ROUTES.COMPONENTS}.edit`, component.id)}
                            >
                                {t('action.edit')}
                            </Link>
                            <Button variant="link" onClick={() => handleComponentDeletion(component.id)}>
                                {t('action.delete')}
                            </Button>
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </div>
    );
}
