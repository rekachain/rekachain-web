import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/UI/breadcrumb';
import { Button } from '@/Components/UI/button';
import { Dialog, DialogContent, DialogTrigger } from '@/Components/UI/dialog';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { checkPermission } from '@/Helpers/permissionHelper';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { componentService } from '@/Services/componentService';
import { productProblemService } from '@/Services/productProblemService';
import { returnedProductService } from '@/Services/returnedProductService';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import {
    ComponentResource,
    ProductProblemResource,
    ReturnedProductResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, Link } from '@inertiajs/react';
import { Separator } from '@radix-ui/react-select';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import AddProductProblem from './Partials/AddProductProblem';
import ProductProblemImport from './Partials/ProductProblemImport';
import UpdateProductProblemStatus from './Partials/UpdateProductProblemStatus';

export default function ({ data }: { data: ReturnedProductResource }) {
    const { t } = useLaravelReactI18n();

    const [productProblemData, setProductProblemData] = useState<ProductProblemResource[]>(
        data.product_problems ?? [],
    );
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
                <div key={data.id} className='m-5 text-black dark:text-white'>
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
                                    <BreadcrumbPage>{data.product_return?.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <h1 className='text-page-header my-4'>
                            {t('pages.returned_product.show.title', {
                                name: data.product_return?.name || '',
                            })}
                        </h1>
                        <div className='grid grid-cols-1 md:grid-cols-4'>
                            <div className='flex flex-col col-span-3 gap-3'>
                                <div className="grid grid-cols-2">
                                    <div className='mt-5 flex flex-col gap-3'>
                                        <div className='mb-2'>
                                            <p className='font-bold'>
                                                {t('pages.returned_product.show.labels.serial_number')}
                                            </p>
                                            <p>{data.serial_number || '-'}</p>
                                        </div>
                                        <div className=''>
                                            <p className='font-bold'>
                                                {t('pages.returned_product.show.labels.buyer')}
                                            </p>
                                            <p>{data.buyer ? `${data.buyer.name} ${data.buyer.phone_number ? `- (${data.buyer.phone_number})` : ''}` : '-'}</p>
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
                                </div>
                                <div className='mt-2'>
                                    <p className='font-bold'>
                                        {t('pages.returned_product.show.labels.notes')}
                                    </p>
                                    <div className='mt-3 grid grid-cols-1 gap-3 max-h-40 overflow-auto'>
                                        {data.returned_product_notes?.map((note) => (
                                            <div
                                                key={note.id}
                                                className='flex items-center justify-between rounded bg-background-2 p-3 mr-1'
                                            >
                                                <div className=''>
                                                    <p className='font-bold'>{note.user?.name || ''}</p>
                                                    <p>{note.note}</p>
                                                </div>
                                                <p className='text-sm'>{note.created_at}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 flex flex-col items-center gap-3 justify-center'>
                                <Dialog>
                                    <DialogTrigger className='max-h-fit max-w-fit' asChild>
                                        <div className='cursor-pointer bg-white p-3'>
                                            <img
                                                src={data.image}
                                                className='max-h-52 max-w-52'
                                                alt='Evidence'
                                            />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className='max-h-screen max-w-fit'>
                                        <img
                                            src={data.image}
                                            className='max-h-screen max-w-full'
                                            alt='Evidence Full'
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <Separator className='my-6 h-1' />
                        <div className='mt-3 items-center gap-3 md:flex hidden'>
                            <h1 className='text-xl font-bold'>{'Product Problems'}</h1>
                            {checkPermission(PERMISSION_ENUM.PRODUCT_PROBLEM_CREATE) &&
                                componentResource && (
                                    <AddProductProblem
                                        setComponentResource={setComponentResource}
                                        returnedProduct={data}
                                        handleSyncReturnedProduct={handleSyncReturnedProduct}
                                        componentResource={componentResource}
                                    />
                                )}
                            {checkPermission(PERMISSION_ENUM.PRODUCT_PROBLEM_IMPORT) && (
                                <ProductProblemImport returnedProductId={data.id} />
                            )}
                        </div>
                        <div className='hidden md:block'>
                            <Table wrapperClassName='block max-h-96'>
                                <TableCaption>
                                    {(data.product_problems?.length ?? 0) > 0
                                        ? 'List Product Problems'
                                        : 'Tidak ada data. Silahkan tambahkan data.'}
                                </TableCaption>
                                <TableHeader className='dark:bg-background-dark sticky top-0 bg-background'>
                                    <TableRow>
                                        <TableHead className=''>
                                            {t(
                                                'pages.returned_product.show.table_headers.component_name',
                                            )}
                                        </TableHead>
                                        <TableHead>
                                            {t(
                                                'pages.returned_product.show.table_headers.description',
                                            )}
                                        </TableHead>
                                        <TableHead>
                                            {t(
                                                'pages.returned_product.show.table_headers.note',
                                            )}
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
                                            <TableCell>
                                                {productProblem.component?.description}
                                            </TableCell>
                                            <TableCell>
                                                {productProblem.latest_product_problem_note?.note ?? '-'}
                                            </TableCell>
                                            <TableCell>{productProblem.localized_status}</TableCell>
                                            <TableCell>
                                                {/* {checkPermission(PERMISSION_ENUM.PRODUCT_PROBLEM_READ) && (
                                                <Link
                                                    href={route(`${ROUTES.PRODUCT_PROBLEMS}.show`, productProblem.id)}
                                                    className={buttonVariants({ variant: 'link' })}
                                                >
                                                    {t('action.show')}
                                                </Link>
                                            )} */}
                                                {checkPermission(
                                                    PERMISSION_ENUM.PRODUCT_PROBLEM_UPDATE,
                                                ) && (
                                                    <UpdateProductProblemStatus
                                                        productProblemId={productProblem.id}
                                                        handleSyncReturnedProduct={
                                                            handleSyncReturnedProduct
                                                        }
                                                        currentStatus={productProblem.status}
                                                    ></UpdateProductProblemStatus>
                                                )}
                                                {checkPermission(
                                                    PERMISSION_ENUM.PRODUCT_PROBLEM_DELETE,
                                                ) && (
                                                    <Button
                                                        variant='link'
                                                        onClick={() =>
                                                            handleProductProblemDeletion(
                                                                productProblem.id,
                                                            )
                                                        }
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
