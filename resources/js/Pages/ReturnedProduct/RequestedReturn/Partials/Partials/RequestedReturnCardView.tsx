import { buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ReturnedProductResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ReturnedProductCardView({
    requestedReturnResponse,
    handleRequestedReturnDeletion,
}: {
    requestedReturnResponse: PaginateResponse<ReturnedProductResource>;
    handleRequestedReturnDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            {requestedReturnResponse?.data.map((returnedProduct) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={returnedProduct.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-4 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='flex w-full items-center justify-between'>
                            <h4 className='text-xl font-bold'>{returnedProduct.serial_number}</h4>
                            <div className='text-center'>
                                <h5 className='text-md items-center font-bold'>
                                    {returnedProduct.localized_status}
                                </h5>
                            </div>
                        </div>

                        <h5 className='text-sm'>
                            {t(
                                'pages.returned_product.partials.partials.returned_product_card.headers.created_at',
                                {
                                    date: returnedProduct.created_at,
                                },
                            )}
                        </h5>
                        <h5 className='text-sm'>{'updated at: ' + returnedProduct.updated_at}</h5>
                        <div className='flex w-full items-center justify-end'>
                            {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_UPDATE) && (
                                <Link
                                    href={route(
                                        `${ROUTES.RETURNED_PRODUCTS}.edit`,
                                        returnedProduct.id,
                                    )}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.edit')}
                                </Link>
                            )}
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </>
    );
}
