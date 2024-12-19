import { Button } from '@/Components/UI/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimateIn from '@/Lib/AnimateIn';
import { Head, Link } from '@inertiajs/react';
import { FileSearch } from 'lucide-react';
//   No Proyek jumlah TS Detail

type Proyek = {
    noProyek: number;
    jumlahTS: number;
};

const listProyek: Proyek[] = [
    { noProyek: 610, jumlahTS: 45 },
    { noProyek: 611, jumlahTS: 32 },
    { noProyek: 612, jumlahTS: 25 },
];

export default function ProjectList() {
    const handleDownload = () => {
        window.location.href = '/assets/excel-templates/imports/project/project-import.xlsm';
    };

    return (
        <AuthenticatedLayout>
            <Head title='List Proyek' />
            <div className='py-12'>
                <div className='h-screen max-w-7xl space-y-6 sm:px-6 lg:px-8'>
                    <AnimateIn
                        to='opacity-100 translate-y-0 translate-x-0'
                        from='opacity-0 -translate-y-4'
                        duration={300}
                    >
                        <div className='h-[20rem] bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8'>
                            <h1 className='text-2xl font-bold'>List Proyek</h1>
                            <Button onClick={handleDownload} className='mb-4'>
                                Download Template Data Proyek
                            </Button>
                            <Table>
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='w-[100px]'>No. Proyek</TableHead>
                                        <TableHead className='text-center'>
                                            Jumlah Trainset
                                        </TableHead>
                                        <TableHead className='text-center'>Detail</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {listProyek.map((proyek) => (
                                        <TableRow key={proyek.noProyek}>
                                            <TableCell className='font-medium'>
                                                {proyek.noProyek}
                                            </TableCell>
                                            <TableCell className='text-center'>
                                                {proyek.jumlahTS}
                                            </TableCell>
                                            <TableCell className='flex justify-center'>
                                                <Link href={`/detail-proyek/${proyek.noProyek}`}>
                                                    <FileSearch className='hover:cursor-pointer' />
                                                </Link>
                                                {/* <FileSearch className="hover:cursor-pointer"></FileSearch> */}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                {/* <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter> */}
                            </Table>
                        </div>
                    </AnimateIn>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
