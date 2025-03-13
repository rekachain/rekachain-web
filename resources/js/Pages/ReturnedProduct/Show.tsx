import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/UI/breadcrumb";
import { buttonVariants } from "@/Components/UI/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/UI/table";
import { checkPermission } from "@/Helpers/permissionHelper";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ROUTES } from "@/Support/Constants/routes";
import { PERMISSION_ENUM } from "@/Support/Enums/permissionEnum";
import { ReturnedProductResource } from "@/Support/Interfaces/Resources";
import { Head, Link } from "@inertiajs/react";
import { Separator } from "@radix-ui/react-select";
import ProductProblemImport from "./Partials/ProductProblemImport";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function ({ data }: { data: ReturnedProductResource }) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            <Head title={'Detail Returned Product'} />
            <AuthenticatedLayout>
                <div key={data.id} className='text-black dark:text-white m-5'>
                    <div>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link href={route(`${ROUTES.RETURNED_PRODUCTS}.index`)}>
                                        {'Returned Products'}
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
                        <h1 className='text-page-header my-4'>{'Detail Returned Product'}</h1>
                        <div className='grid grid-cols-1 md:grid-cols-3'>
                            <div className='mt-5 flex flex-col gap-3'>
                                <div className='mb-2'>
                                    <p className='font-bold'>
                                        {'Nomor Serial'}
                                    </p>
                                    <p>{data.serial_number || '-'}</p>
                                </div>
                                <div className=''>
                                    <p className='font-bold'>
                                        {'Jumlah Pengembalian'}
                                    </p>
                                    <p>{data.qty}</p>
                                </div>
                            </div>
                            <div className='mt-5 flex flex-col gap-3'>
                                <div className=''>
                                    <p className='font-bold'>
                                        {'Tanggal Pengembalian'}
                                    </p>
                                    <p>{data.created_at}</p>
                                </div>
                                <div className=''>
                                    <p className='font-bold'>
                                        {'Tanggal Pembaruan'}
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
                            {checkPermission(PERMISSION_ENUM.PRODUCT_PROBLEM_CREATE) && (
                                <Link
                                    href={route(`${ROUTES.PRODUCT_PROBLEMS}.create`)}
                                    className={buttonVariants({ variant: 'default' })}
                                >
                                    {'Add Problem'}
                                </Link>
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
                                            {'Nama Komponen'}
                                        </TableHead>
                                        <TableHead>
                                            {'Deskripsi'}
                                        </TableHead>
                                        <TableHead>
                                            {'Status'}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.product_problems?.map((productProblem) => (
                                        <TableRow key={productProblem.id}>
                                            <TableCell className='font-medium'>
                                                {productProblem.component?.name}
                                            </TableCell>
                                            <TableCell>{productProblem.component?.name}</TableCell>
                                            <TableCell>{productProblem.status}</TableCell>
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