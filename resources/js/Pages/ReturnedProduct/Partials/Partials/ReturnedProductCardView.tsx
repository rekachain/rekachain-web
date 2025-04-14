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
    returnedProductResponse,
    handleReturnedProductDeletion,
}: {
    returnedProductResponse: PaginateResponse<ReturnedProductResource>;
    handleReturnedProductDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            {returnedProductResponse?.data.map((returnedProduct) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={returnedProduct.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-4 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='flex w-full justify-between'>
                            <h4 className='text-xl font-bold'>
                                {returnedProduct.product_return?.name}
                            </h4>
                            <div className='text-center'>
                                <h5 className='text-md font-bold'>
                                    {t(
                                        'pages.returned_product.partials.partials.returned_product_card.headers.type',
                                        {
                                            type:
                                                returnedProduct.product_returnable_type ===
                                                'App\\Models\\Panel'
                                                    ? 'Panel'
                                                    : 'Component',
                                        },
                                    )}
                                </h5>
                            </div>
                        </div>

                        <h5 className='text-sm'>
                            <strong>
                                {t(
                                    'pages.returned_product.partials.partials.returned_product_card.headers.serial_number',
                                )}
                                :
                            </strong>{' '}
                            {returnedProduct.serial_number}
                        </h5>

                        <h5 className='text-sm'>
                            <strong>
                                {t(
                                    'pages.returned_product.partials.partials.returned_product_card.headers.description',
                                )}
                                :
                            </strong>{' '}
                            {returnedProduct.product_return?.description || '-'}
                        </h5>

                        <h5 className='text-sm'>
                            <strong>
                                {t(
                                    'pages.returned_product.partials.partials.returned_product_card.headers.note',
                                )}
                                :
                            </strong>{' '}
                            {returnedProduct.latest_returned_product_note?.note ?? '-'}
                        </h5>

                        <h5 className='text-sm'>
                            <strong>
                                {t(
                                    'pages.returned_product.partials.partials.returned_product_card.headers.status',
                                )}
                                :
                            </strong>{' '}
                            {returnedProduct.localized_status}
                        </h5>

                        <h5 className='text-sm'>
                            <strong>
                                {t(
                                    'pages.returned_product.partials.partials.returned_product_card.headers.created_at',
                                )}
                                :
                            </strong>{' '}
                            {returnedProduct.created_at}
                        </h5>

                        <div className='flex w-full items-center justify-end gap-2'>
                            {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_READ) && (
                                <Link
                                    href={route(
                                        `${ROUTES.RETURNED_PRODUCTS}.show`,
                                        returnedProduct.id,
                                    )}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.show')}
                                </Link>
                            )}
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
                            {checkPermission(PERMISSION_ENUM.RETURNED_PRODUCT_DELETE) && (
                                <button
                                    onClick={() =>
                                        handleReturnedProductDeletion(returnedProduct.id)
                                    }
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.delete')}
                                </button>
                            )}
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </>
    );
}
