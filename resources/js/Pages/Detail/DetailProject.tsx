import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
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

type Trainset = {
    kodeTrainset: string;
    susunanKereta: string;
};

type DetailProject = {
    detail: string;
};

const listTrainset: Trainset[] = [
    { kodeTrainset: 'TS1', susunanKereta: 'TSA 8 (9 K1 + 1 M + 1P)' },
    { kodeTrainset: 'TS2', susunanKereta: 'TSB 2 (4 K1 + 5 K3 + 1 M + 1 P)' },
    { kodeTrainset: 'TS3', susunanKereta: 'TSC 3 (8 K3 + 1 M + 1 P)' },
];
import { Calculator, FileSearch } from 'lucide-react';
import AnimateIn from '@/lib/AnimateIn';

export default function DetailProject({ detail }: DetailProject) {
    return (
        <AuthenticatedLayout>
            <Head title={`Proyek ${detail}`} />
            <div className="py-12">
                <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                    <AnimateIn
                        from="opacity-0 -translate-y-4"
                        to="opacity-100 translate-y-0 translate-x-0"
                        duration={300}
                    >
                        <div className="p-4 sm:p-8 bg-white  dark:bg-gray-800 shadow sm:rounded-lg h-fit">
                            <h1 className="text-2xl font-bold">Proyek {detail}</h1>
                            <h4 className="mb-3 mt-1">
                                <Link href="/proyek">Proyek</Link> / <Link href={detail}>{detail}</Link>
                            </h4>
                            <Table>
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="lg:w-[400px] md:w-[100px] sm:w-[50px]">Kode TS</TableHead>
                                        <TableHead className="text-left">Susunan Kereta</TableHead>
                                        <TableHead className="text-center">Detail</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {listTrainset.map(trainset => (
                                        <TableRow key={trainset.kodeTrainset}>
                                            <TableCell className="font-medium">{trainset.kodeTrainset}</TableCell>
                                            <TableCell className="text-left">{trainset.susunanKereta}</TableCell>
                                            <TableCell className="flex justify-center ">
                                                <Link href={`/${detail}/detail-ts/${trainset.kodeTrainset}`}>
                                                    <FileSearch className="hover:cursor-pointer"></FileSearch>
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