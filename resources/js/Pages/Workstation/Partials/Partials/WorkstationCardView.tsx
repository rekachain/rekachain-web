import { Button, buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/sidebarHelper';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { WorkstationResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function WorkstationCardView({
    workstationResponse,
    handleWorkstationDeletion,
}: {
    workstationResponse: PaginateResponse<WorkstationResource>;
    handleWorkstationDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            {workstationResponse?.data.map((workstation) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={workstation.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-4 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='items-scenter flex w-full justify-between'>
                            <h4 className='text-xl font-bold'>{workstation.name}</h4>
                            <div className='text-center'>
                                <h5 className='text-md items-center font-bold'>
                                    {t(
                                        'pages.workstation.partials.partials.workstation_card.headers.division',
                                        {
                                            division: workstation.division.name,
                                        },
                                    )}
                                </h5>
                            </div>
                        </div>

                        <h5 className='text-sm font-bold'>
                            {t(
                                'pages.workstation.partials.partials.workstation_card.headers.workshop',
                                {
                                    workshop: workstation.workshop.name,
                                },
                            )}
                        </h5>
                        <h5 className='text-sm'>
                            {t(
                                'pages.workstation.partials.partials.workstation_card.headers.location',
                                {
                                    location: workstation.location,
                                },
                            )}
                        </h5>
                        <div className='flex w-full items-center justify-end'>
                            {checkPermission(PERMISSION_ENUM.WORKSTATION_UPDATE) && (
                            <Link
                                href={route(`${ROUTES.WORKSTATIONS}.edit`, workstation.id)}
                                className={buttonVariants({ variant: 'link' })}
                            >
                                {t('action.edit')}
                            </Link>
                            )}
                            {checkPermission(PERMISSION_ENUM.WORKSTATION_DELETE) && workstation.can_be_deleted && (
                                <Button
                                    variant='link'
                                    onClick={() => handleWorkstationDeletion(workstation.id)}
                                >
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
