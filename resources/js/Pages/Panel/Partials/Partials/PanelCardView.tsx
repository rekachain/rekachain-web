import { Button, buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { PanelResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function PanelCardView({
    panelResponse,
    handlePanelDeletion,
}: {
    panelResponse: PaginateResponse<PanelResource>;
    handlePanelDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            {panelResponse?.data.map((panel) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={panel.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-5 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='flex w-full items-center justify-between'>
                            <h4 className='text-lg font-bold'>{panel.name}</h4>
                            {/* <div className="text-center">
                                <h5
                                    className="font-bold text-base
                             items-center "
                                >
                                    Divisi : {panel.division?.name}
                                </h5>
                            </div> */}
                        </div>
                        <h4 className='text-base'>
                            {t('pages.panel.partials.partials.panel_card.headers.description', {
                                description: panel.description ?? '-',
                            })}
                        </h4>
                        <p className='text-sm'>
                            {t('pages.panel.partials.partials.panel_card.headers.progress', {
                                progress: panel.progress?.name ?? '-',
                            })}
                        </p>
                        {/* <p>Jumlah User :{panel.users_count}</p>
                        <p>Jumlah Izin :{panel.permissions_count}</p> */}
                        <div className='flex w-full items-center justify-end'>
                            {checkPermission(PERMISSION_ENUM.PANEL_UPDATE) && (
                                <Link
                                    href={route(`${ROUTES.PANELS}.edit`, panel.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                    // className={buttonVariants({ variant: 'link' })}
                                    // href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                                >
                                    {t('action.edit')}
                                </Link>
                            )}
                            {checkPermission(PERMISSION_ENUM.PANEL_DELETE) && (
                                <Button
                                    variant='link'
                                    onClick={() => handlePanelDeletion(panel.id)}
                                >
                                    {t('action.delete')}
                                </Button>
                            )}
                        </div>
                    </div>
                    {/* </div> */}
                </AnimateIn>
            ))}
        </div>
    );
}
