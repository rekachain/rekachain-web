import React from 'react';
import { CarriageResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ROUTES } from '@/Support/Constants/routes';
import { Button, buttonVariants } from '@/Components/UI/button';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function CarriageCardView({
    carriageResponse,
    handleCarriageDeletion,
    // auth,
}: {
    carriageResponse: PaginateResponse<CarriageResource>;

    handleCarriageDeletion: (id: number) => void;
    // auth: any; // sementara
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            {carriageResponse?.data.map(carriage => (
                // <AnimateIn
                //     from="opacity-0 -translate-y-4"
                //     to="opacity-100 translate-y-0 translate-x-0"
                //     duration={300}
                //     key={carriage.id}
                // >
                <div
                    className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-3"
                    key={carriage.id}
                >
                    <div className="flex w-full justify-between items-scenter">
                        <h4 className="font-bold text-base">{carriage.type}</h4>
                        {/* <div className="text-center">
                                <h4 className="font-bold text-base">Proses : {carriage.name}</h4> */}
                        {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {carriage.division.name}
                                </h5> */}
                        {/* </div> */}
                    </div>
                    <p className="text-sm">
                        {t('pages.carriage.partials.partials.carriage_table.headers.description', {
                            description: carriage?.description ?? '',
                        })}
                    </p>

                    {/* <h5 className="font-bold text-sm ">Workshop : {carriage.workshop.name}</h5>
                        <h5 className=" text-sm ">Lokasi : {carriage.location}</h5> */}
                    <div className="flex items-center justify-end w-full">
                        <Link
                            className={buttonVariants({ variant: 'link' })}
                            href={route(`${ROUTES.CARRIAGES}.edit`, carriage.id)}
                        >
                            {t('action.edit')}
                        </Link>
                        <Button variant="link" onClick={() => handleCarriageDeletion(carriage.id)}>
                            {t('action.delete')}
                        </Button>
                    </div>
                </div>
                // </AnimateIn>
            ))}
        </div>
    );
}
