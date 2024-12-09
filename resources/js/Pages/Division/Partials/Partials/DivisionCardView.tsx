import { Button, buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { DivisionResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { checkPermission } from '@/Helpers/permissionHelper';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';

export default function DivisionCardView({
    divisionResponse,
    handleDivisionDeletion,
}: {
    divisionResponse: PaginateResponse<DivisionResource>;
    handleDivisionDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            {divisionResponse?.data.map((division) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={division.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='items-scenter flex w-full justify-between'>
                            <h4 className='text-xl font-bold'>{division.name}</h4>
                            <div className='text-center'>
                                {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                            </div>
                        </div>
                        <div className='flex w-full items-center justify-end'>
                        {checkPermission(PERMISSION_ENUM.DIVISION_UPDATE) && (
                            <Link
                                href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                                className={buttonVariants({ variant: 'link' })}
                            >
                                {t('action.edit')}
                            </Link>
                        )}
                            {checkPermission(PERMISSION_ENUM.DIVISION_DELETE) && division.can_be_deleted && (
                                <Button
                                    variant='link'
                                    onClick={() => handleDivisionDeletion(division.id)}
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
