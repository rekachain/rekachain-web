import { Button, buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { WorkshopResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function WorkshopCardView({
    workshopResponse,
    handleWorkshopDeletion,
}: {
    workshopResponse: PaginateResponse<WorkshopResource>;
    handleWorkshopDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            {workshopResponse?.data.map((workshop) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={workshop.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='items-scenter flex w-full justify-between'>
                            <h4 className='text-xl font-bold'>{workshop.name}</h4>
                            <div className='text-center'>
                                {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                            </div>
                        </div>

                        <h5 className='text-sm'>
                            {t('pages.workshop.partials.partials.workshop_card.headers.address', {
                                address: workshop.address,
                            })}
                        </h5>

                        <div className='flex w-full items-center justify-end'>
                            {checkPermission(PERMISSION_ENUM.WORKSHOP_UPDATE) && (
                                <Link
                                    href={route(`${ROUTES.WORKSHOPS}.edit`, workshop.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.edit')}
                                </Link>
                            )}
                            {checkPermission(PERMISSION_ENUM.WORKSHOP_DELETE) &&
                                workshop.can_be_deleted && (
                                    <Button
                                        variant='link'
                                        onClick={() => handleWorkshopDeletion(workshop.id)}
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
