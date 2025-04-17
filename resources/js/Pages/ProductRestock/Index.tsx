import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { Button, buttonVariants } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense, useState } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();
    const ProductRestocks = lazy(() => import('./Partials/ProductRestock'));
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    
    const handleSelectionChange = (selectedId: number) => {
        if (selectedIds.includes(selectedId)) {
            setSelectedIds(selectedIds.filter((id) => id !== selectedId));
        } else {
            setSelectedIds([...selectedIds, selectedId]);
        }
    }
    return (
        <>
            <Head title={t('pages.product_restock.index.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.product_restock.index.title')}
                        </h1>
                        {checkPermission(PERMISSION_ENUM.PRODUCT_RESTOCK_CREATE) && (
                            <>
                            <Button onClick={() => {
                                setIsSelecting(!isSelecting);
                                isSelecting && setSelectedIds([]);
                            }} variant={isSelecting ? 'destructive' : 'tertiary'}>
                                {isSelecting ? t('pages.product_restock.index.buttons.cancel_initiation') : t('pages.product_restock.index.buttons.initiate_selection')}
                            </Button>
                            {isSelecting && (
                                <Link href={route(`${ROUTES.PRODUCT_RESTOCKS}.create`)} className={buttonVariants({ variant: 'tertiary' })}>
                                    {t('pages.product_restock.index.buttons.initiate_selection')}
                                </Link>
                            )}
                            </>
                        )}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <ProductRestocks isSelecting={isSelecting} selectedIds={selectedIds} handleSelectionChange={handleSelectionChange} />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
