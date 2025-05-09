import { Button, buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { StepResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function StepCardView({
    stepResponse,
    handleStepDeletion,
    // auth,
}: {
    stepResponse: PaginateResponse<StepResource>;

    handleStepDeletion: (id: number) => void;
    // auth: any; // sementara
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            {stepResponse?.data.map((step) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={step.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='items-scenter flex w-full justify-between'>
                            <h4 className='text-base font-bold'>{step.name}</h4>
                            <div className='text-center'>
                                <h4 className='text-base font-bold'>
                                    {t('pages.step.partials.partials.step_card.headers.process', {
                                        process: step.process,
                                    })}
                                </h4>
                                {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {step.division.name}
                                </h5> */}
                            </div>
                        </div>
                        <p className='text-sm'>
                            {t(
                                'pages.step.partials.partials.step_card.headers.estimated_manufacturing_time',
                                {
                                    estimated_manufacturing_time: step?.estimated_time ?? '',
                                },
                            )}
                        </p>

                        {/* <h5 className="font-bold text-sm ">Workshop : {step.workshop.name}</h5>
                        <h5 className=" text-sm ">Lokasi : {step.location}</h5> */}
                        <div className='flex w-full items-center justify-end'>
                            {checkPermission(PERMISSION_ENUM.STEP_UPDATE) && (
                                <Link
                                    href={route(`${ROUTES.STEPS}.edit`, step.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.edit')}
                                </Link>
                            )}
                            {checkPermission(PERMISSION_ENUM.STEP_DELETE) && (
                                <Button variant='link' onClick={() => handleStepDeletion(step.id)}>
                                    {t('action.delete')}
                                </Button>
                            )}
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </>
    );
}
