import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/UI/breadcrumb";
import { Button, buttonVariants } from "@/Components/UI/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/UI/table";
import { checkPermission } from "@/Helpers/permissionHelper";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from "@/Support/Constants/routes";
import { PERMISSION_ENUM } from "@/Support/Enums/permissionEnum";
import { ComponentResource, ProductProblemResource, ReturnedProductResource } from "@/Support/Interfaces/Resources";
import { Head, Link } from "@inertiajs/react";
import { Separator } from "@radix-ui/react-select";
import ProductProblemImport from "./Partials/ProductProblemImport";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { withLoading } from "@/Utils/withLoading";
import { productProblemService } from "@/Services/productProblemService";
import { useSuccessToast } from "@/Hooks/useToast";
import { useEffect, useState } from "react";
import { returnedProductService } from "@/Services/returnedProductService";
import AddProductProblem from "./Partials/AddProductProblem";
import { PaginateResponse } from "@/Support/Interfaces/Others";
import { componentService } from "@/Services/componentService";

export default function ({ data }: { data: ReturnedProductResource }) {
    const { t } = useLaravelReactI18n();

    const [productProblemData, setProductProblemData] = useState<ProductProblemResource[]>(data.product_problems ?? []);
    const [componentResource, setComponentResource] =
        useState<PaginateResponse<ComponentResource>>();

    const fetchInitialComponentData = withLoading(async () => {
        const res = await componentService.getAll();
        setComponentResource(res);
    });

    useEffect(() => {
        void fetchInitialComponentData();
    }, []);
    
    const handleProductProblemDeletion = withLoading(async (id: number) => {
        await productProblemService.delete(id);
        handleSyncReturnedProduct();
        void useSuccessToast(t('pages.returned_product.show.messages.deleted_problem'));
    });

    const handleSyncReturnedProduct = withLoading(async () => {
        const newProductProblems = await returnedProductService.get(data.id);
        setProductProblemData(newProductProblems.product_problems ?? []);
    });
    
    return (
        <>
            <Head title={t('pages.returned_product.show.title')} />
            <AuthenticatedLayout>
                <div key={data.id} className='text-black dark:text-white m-5'>
                    <div>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link href={route(`${ROUTES.RETURNED_PRODUCTS}.index`)}>
                                        {t('pages.returned_product.show.breadcrumbs.return')}
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {data.product_return?.name}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <h1 className='text-page-header my-4'>{t('pages.returned_product.show.title',{ name: data.product_return?.name || ''})}</h1>
                        <div className='grid grid-cols-1 md:grid-cols-3'>
                            <div className='mt-5 flex flex-col gap-3'>
                                <div className='mb-2'>
                                    <p className='font-bold'>
                                        {t('pages.returned_product.show.labels.serial_number')}
                                    </p>
                                    <p>{data.serial_number || '-'}</p>
                                </div>
                                <div className=''>
                                    <p className='font-bold'>
                                        {t('pages.returned_product.show.labels.return_quantity')}
                                    </p>
                                    <p>{data.qty}</p>
                                </div>
                            </div>
                            <div className='mt-5 flex flex-col gap-3'>
                                <div className=''>
                                    <p className='font-bold'>
                                        {t('pages.returned_product.show.labels.return_date')}
                                    </p>
                                    <p>{data.created_at}</p>
                                </div>
                                <div className=''>
                                    <p className='font-bold'>
                                        {t('pages.returned_product.show.labels.update_date')}
                                    </p>
                                    <p>{data.updated_at}</p>
                                </div>
                            </div>
                            {false && (
                                <div className='mt-5 flex flex-col items-center gap-3 text-white'>
                                    <div className='bg-white p-3'>
                                        <img width={200} src={'http://127.0.0.1:8000/storage/trainset_attachments/qr_images/1.svg'} alt='QR Code' />
                                    </div>
                                </div>
                            )}
                        </div>
                        <Separator className='my-6 h-1' />
                        <div className='mt-3 flex items-center gap-3'>
                            <h1 className='text-xl font-bold'>
                                {'Product Problems'}
                            </h1>
                            {checkPermission(PERMISSION_ENUM.PRODUCT_PROBLEM_CREATE) && componentResource && (
                                <AddProductProblem componentResource={componentResource} setComponentResource={setComponentResource} returnedProduct={data} handleSyncReturnedProduct={handleSyncReturnedProduct} />
                            )}
                            {checkPermission(PERMISSION_ENUM.PRODUCT_PROBLEM_IMPORT) && <ProductProblemImport returnedProductId={data.id} />}
                        </div>
                        <div className='hidden md:block'>
                            <Table wrapperClassName='block max-h-96'>
                                <TableCaption>
                                    {(data.product_problems?.length ?? 0) > 0 ? 'List Product Problems' : 'Tidak ada data. Silahkan tambahkan data.'}
                                </TableCaption>
                                <TableHeader className='dark:bg-background-dark sticky top-0 bg-background'>
                                    <TableRow>
                                        <TableHead className=''>
                                            {t('pages.returned_product.show.table_headers.component_name')}
                                        </TableHead>
                                        <TableHead>
                                            {t('pages.returned_product.show.table_headers.description')}
                                        </TableHead>
                                        <TableHead>
                                            {t('pages.returned_product.show.table_headers.status')}
                                        </TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {productProblemData.map((productProblem) => (
                                        <TableRow key={productProblem.id}>
                                            <TableCell className='font-medium'>
                                                {productProblem.component?.name}
                                            </TableCell>
                                            <TableCell>{productProblem.component?.description}</TableCell>
                                            <TableCell>{productProblem.localized_status}</TableCell>
                                            <TableCell>
                                            {/* {checkPermission(PERMISSION_ENUM.PRODUCT_PROBLEM_READ) && (
                                                <Link
                                                    href={route(`${ROUTES.PRODUCT_PROBLEMS}.show`, productProblem.id)}
                                                    className={buttonVariants({ variant: 'link' })}
                                                >
                                                    {t('action.show')}
                                                </Link>
                                            )}
                                            {checkPermission(PERMISSION_ENUM.PRODUCT_PROBLEM_UPDATE) && (
                                                <Link
                                                    href={route(`${ROUTES.PRODUCT_PROBLEMS}.edit`, productProblem.id)}
                                                    className={buttonVariants({ variant: 'link' })}
                                                >
                                                    {t('action.edit')}
                                                </Link>
                                            )} */}
                                            {checkPermission(PERMISSION_ENUM.PRODUCT_PROBLEM_DELETE) && (
                                                <Button
                                                    variant='link'
                                                    onClick={() => handleProductProblemDeletion(productProblem.id)}
                                                >
                                                    {t('action.delete')}
                                                </Button>
                                            )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}