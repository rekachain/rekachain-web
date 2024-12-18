import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
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
import { useState } from 'react';
// import { Table } from 'lucide-react';

type Trainset = {
    namaTrainset: string;
    jumlahGerbong: number;
};

const listTrainsetConst: Trainset[] = [
    { namaTrainset: 'TSA 1', jumlahGerbong: 45 },
    { namaTrainset: 'TSA 2', jumlahGerbong: 32 },
    { namaTrainset: 'TSB 1', jumlahGerbong: 25 },
];
export default function CreateTrainset() {
    const [listTrainset, setListTrainset] = useState<Trainset[]>(listTrainsetConst);
    const [input, setInput] = useState(0);

    return (
        <div className=''>
            <AuthenticatedLayout>
                <Head title='Buat Trainset' />
                <div className='py-12'>
                    <div className='h-screen max-w-7xl space-y-6 sm:px-6 lg:px-8'>
                        <h1 className='text-2xl font-bold'>List Trainset</h1>
                        <AnimateIn
                            to='opacity-100 translate-y-0 translate-x-0'
                            from='opacity-0 -translate-y-4'
                            duration={300}
                        >
                            <div className='h-fit bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8'>
                                <h1 className='text-xl font-bold'>Tambah Trainset</h1>
                                <div className='mt-2 flex gap-2'>
                                    <Input
                                        placeholder='Jumlah Trainset'
                                        onChange={(e) => {
                                            setInput(Number(e.target.value));
                                        }}
                                        className='w-1/4'
                                    ></Input>
                                    <Button
                                        onClick={() => {
                                            const tempList: Trainset[] = [];
                                            for (let i = 0; i < input; i++) {
                                                tempList.push({
                                                    namaTrainset: i.toString(),
                                                    jumlahGerbong: 0,
                                                });
                                            }
                                            setListTrainset((prevListTrainset) => [
                                                ...prevListTrainset,
                                                ...tempList,
                                            ]);
                                        }}
                                    >
                                        Tambah Trainset
                                    </Button>
                                </div>
                            </div>
                        </AnimateIn>
                        <AnimateIn
                            to='opacity-100 translate-y-0 translate-x-0'
                            from='opacity-0 -translate-y-4'
                            duration={300}
                        >
                            <div className='h-fit bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8'>
                                <Table className='mt-2'>
                                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className='w-[100px]'>Trainset</TableHead>
                                            <TableHead className='text-center'>
                                                Jumlah Gerbong
                                            </TableHead>
                                            <TableHead className='text-center'>Action </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {listTrainset.map((trainset) => (
                                            <TableRow key={trainset.namaTrainset}>
                                                <TableCell className='font-medium'>
                                                    {trainset.namaTrainset}
                                                </TableCell>
                                                <TableCell className='text-center'>
                                                    {trainset.jumlahGerbong}
                                                </TableCell>
                                                <TableCell className='flex justify-center'>
                                                    <Link href='buat-trainset'>
                                                        <FileSearch className='hover:cursor-pointer'></FileSearch>
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
        </div>
    );
}
