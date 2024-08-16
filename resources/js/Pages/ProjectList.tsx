import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
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
import { Calculator, FileSearch } from 'lucide-react';
import AnimateIn from '@/lib/AnimateIn';

export default function ProjectList() {
    return (
        <AuthenticatedLayout>
            <Head title="List Proyek" />
            <div className="py-12">
                <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                    <AnimateIn
                        from="opacity-0 -translate-y-4"
                        to="opacity-100 translate-y-0 translate-x-0"
                        duration={300}
                    >
                        <div className="p-4 sm:p-8 bg-white h-[20rem] dark:bg-gray-800 shadow sm:rounded-lg">
                            <h1 className="text-2xl font-bold">List Proyek</h1>
                            <Table>
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">No. Proyek</TableHead>
                                        <TableHead className="text-center">Jumlah Trainset</TableHead>
                                        <TableHead className="text-center">Detail</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {listProyek.map(proyek => (
                                        <TableRow key={proyek.noProyek}>
                                            <TableCell className="font-medium">{proyek.noProyek}</TableCell>
                                            <TableCell className="text-center">{proyek.jumlahTS}</TableCell>
                                            <TableCell className="flex justify-center ">
                                                <FileSearch className="hover:cursor-pointer"></FileSearch>
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
