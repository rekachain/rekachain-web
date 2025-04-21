import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { Button } from '@/Components/UI/button';
import { checkPermission } from '@/Helpers/permissionHelper';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { productRestockService } from '@/Services/productRestockService';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { Head, router } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { lazy, Suspense, useState } from 'react';
import MakeProject from './Partials/MakeProject';

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
    };

    const handleInitiateProject = async (data: any) => {
        await productRestockService.initiateRestockProject({
            ...data,
            product_restock_ids: selectedIds,
        });
        router.visit(route(`${ROUTES.PRODUCT_RESTOCKS}.index`));
        void useSuccessToast(t('pages.product_restock.partials.make_project.messages.initiated'));
    };
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
                                <Button
                                    variant={isSelecting ? 'destructive' : 'tertiary'}
                                    onClick={() => {
                                        setIsSelecting(!isSelecting);
                                        isSelecting && setSelectedIds([]);
                                    }}
                                >
                                    {isSelecting
                                        ? t('pages.product_restock.index.buttons.cancel_initiation')
                                        : t(
                                              'pages.product_restock.index.buttons.initiate_selection',
                                          )}
                                </Button>
                                {isSelecting && (
                                    <MakeProject handleInitiateProject={handleInitiateProject} />
                                )}
                            </>
                        )}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <ProductRestocks
                            selectedIds={selectedIds}
                            isSelecting={isSelecting}
                            handleSelectionChange={handleSelectionChange}
                        />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
