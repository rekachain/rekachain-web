import { Button, buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ComponentResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
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
            {componentResponse?.data.map((component) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={component.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='items-scenter flex w-full justify-between'>
                            <h4 className='text-base font-bold'>{component.name}</h4>
                            {/* <div className="text-center">
                                <h4 className="font-bold text-base">Proses : {component.name}</h4> */}
                            {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {component.division.name}
                                </h5> */}
                            {/* </div> */}
                        </div>
                        <p className='text-sm'>
                            {t(
                                'pages.component.partials.partials.component_card.headers.description',
                                {
                                    description: component.description ?? '-',
                                },
                            )}
                        </p>
                        <p className='text-sm'>
                            {t(
                                'pages.component.partials.partials.component_card.headers.progress',
                                {
                                    progress: component.progress?.name ?? '-',
                                },
                            )}
                        </p>
                        {/* <h5 className="font-bold text-sm ">Workshop : {component.workshop.name}</h5>
                        <h5 className=" text-sm ">Lokasi : {component.location}</h5> */}
                        <div className='flex w-full items-center justify-end'>
                        {checkPermission(PERMISSION_ENUM.COMPONENT_UPDATE) && (
                            <Link
                                href={route(`${ROUTES.COMPONENTS}.edit`, component.id)}
                                className={buttonVariants({ variant: 'link' })}
                            >
                                {t('action.edit')}
                            </Link>
                        )}
                        {checkPermission(PERMISSION_ENUM.COMPONENT_DELETE) && (
                            <Button
                                variant='link'
                                onClick={() => handleComponentDeletion(component.id)}
                            >
                                {t('action.delete')}
                            </Button>
                        )}
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </div>
    );
}
