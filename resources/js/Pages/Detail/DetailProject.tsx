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

type Proyek = {
    noProyek: number;
    jumlahTS: number;
};

type Trainset = {
    noTrainset: number;
    susunanKereta: string;
};

const listTrainset: Trainset[] = [
    { noTrainset: 610, susunanKereta: 'TSA 8 (9 K1 + 1 M + 1P)' },
    { noTrainset: 611, susunanKereta: 'TSB 2 (4 K1 + 5 K3 + 1 M + 1 P)' },
    { noTrainset: 612, susunanKereta: 'TSC 3 (8 K3 + 1 M + 1 P)' },
];
import { Calculator, FileSearch } from 'lucide-react';
import AnimateIn from '@/lib/AnimateIn';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type DetailProject = {
    detail: string;
};

export default function DetailProject({ detail }: DetailProject) {
    return (
        <AuthenticatedLayout>
            <Head title="Proyek " />
            <div className="py-12">
                <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                    <AnimateIn
                        from="opacity-0 -translate-y-4"
                        to="opacity-100 translate-y-0 translate-x-0"
                        duration={300}
                    >
                        <div className="p-4 sm:p-8 bg-white  dark:bg-gray-800 shadow sm:rounded-lg h-fit">
                            <h1 className="text-2xl font-bold">Proyek {detail}</h1>
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
                                        <TableRow key={trainset.noTrainset}>
                                            <TableCell className="font-medium">{trainset.noTrainset}</TableCell>
                                            <TableCell className="text-left">{trainset.susunanKereta}</TableCell>
                                            <TableCell className="flex justify-center ">
                                                <FileSearch className="hover:cursor-pointer"></FileSearch>
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
