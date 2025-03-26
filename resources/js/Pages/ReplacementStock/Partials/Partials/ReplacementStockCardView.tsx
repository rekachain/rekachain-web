import { Button } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ReplacementStockResource } from '@/Support/Interfaces/Resources';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import AddStock from '../AddStock';

export default function ReplacementStockCardView({
    replacementStockResponse,
    handleReplacementStockDeletion,
    handleSyncReplacementStocks,
}: {
    replacementStockResponse: PaginateResponse<ReplacementStockResource>;
    handleReplacementStockDeletion: (id: number) => void;
    handleSyncReplacementStocks: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            {replacementStockResponse?.data.map((stock) => (
                // <AnimateIn
                //     from="opacity-0 -translate-y-4"
                //     to="opacity-100 translate-y-0 translate-x-0"
                //     duration={300}
                //     key={stock.id}
                // >
                <div
                    key={stock.id}
                    className='mt-3 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'
                >
                    <div className='items-scenter flex w-full justify-between'>
                        <h4 className='text-base font-bold'>{stock.component?.name ?? ''}</h4>
                        {/* <div className="text-center">
                                <h4 className="font-bold text-base">Proses : {stock.name}</h4> */}
                        {/* <h5 className="font-bold text-md items-center ">
                                    Divisi:
                                    {stock.division.name}
                                </h5> */}
                        {/* </div> */}
                    </div>
                    <p className='text-sm'>
                        {t('pages.replacement_stock.partials.partials.replacement_stock_card.headers.component_description', {
                            component_description: stock.component?.description ?? '-',
                        })}
                    </p>
                    <p className='text-sm'>
                        {t('pages.replacement_stock.partials.partials.replacement_stock_card.headers.qty', {
                            qty: stock.qty,
                        })}
                    </p>
                    <p className='text-sm'>
                        {t('pages.replacement_stock.partials.partials.replacement_stock_card.headers.threshold', {
                            threshold: stock.threshold,
                        })}
                    </p>

                    {/* <h5 className="font-bold text-sm ">Workshop : {stock.workshop.name}</h5>
                        <h5 className=" text-sm ">Lokasi : {stock.location}</h5> */}
                    <div className='flex w-full items-center justify-end'>
                        {checkPermission(PERMISSION_ENUM.REPLACEMENT_STOCK_UPDATE) && (
                            <AddStock replacementStock={stock} handleSyncReplacementStocks={handleSyncReplacementStocks}/>
                        )}
                        {checkPermission(PERMISSION_ENUM.REPLACEMENT_STOCK_DELETE) && (
                            <Button
                                variant='link'
                                onClick={() => handleReplacementStockDeletion(stock.id)}
                            >
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
