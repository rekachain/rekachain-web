import { Button, buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { CarriageResource } from '@/Support/Interfaces/Resources';
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
            {carriageResponse?.data.map((carriage) => (
                // <AnimateIn
                //     from="opacity-0 -translate-y-4"
                //     to="opacity-100 translate-y-0 translate-x-0"
                //     duration={300}
                //     key={carriage.id}
                // >
                <div
                    key={carriage.id}
                    className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'
                >
                    <div className='items-scenter flex w-full justify-between'>
                        <h4 className='text-base font-bold'>{carriage.type}</h4>
                        {/* <div className="text-center">
                                <h4 className="font-bold text-base">Proses : {carriage.name}</h4> */}
                        {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {carriage.division.name}
                                </h5> */}
                        {/* </div> */}
                    </div>
                    <p className='text-sm'>
                        {t('pages.carriage.partials.partials.carriage_table.headers.description', {
                            description: carriage?.description ?? '',
                        })}
                    </p>

                    {/* <h5 className="font-bold text-sm ">Workshop : {carriage.workshop.name}</h5>
                        <h5 className=" text-sm ">Lokasi : {carriage.location}</h5> */}
                    <div className='flex w-full items-center justify-end'>
                    {checkPermission(PERMISSION_ENUM.CARRIAGE_UPDATE) && (
                        <Link
                            href={route(`${ROUTES.CARRIAGES}.edit`, carriage.id)}
                            className={buttonVariants({ variant: 'link' })}
                        >
                            {t('action.edit')}
                        </Link>
                    )}
                    {checkPermission(PERMISSION_ENUM.CARRIAGE_DELETE) && (
                        <Button variant='link' onClick={() => handleCarriageDeletion(carriage.id)}>
                            {t('action.delete')}
                        </Button>
                    )}
                    </div>
                </div>
                // </AnimateIn>
            ))}
        </div>
    );
}
