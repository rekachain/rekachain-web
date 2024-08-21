import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimateIn from '@/lib/AnimateIn';
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
        <div className="">
            <AuthenticatedLayout>
                <Head title="Buat Trainset" />
                <div className="py-12">
                    <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                        <h1 className="text-2xl font-bold">List Trainset</h1>
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                        >
                            <div className="p-4 sm:p-8 bg-white h-fit dark:bg-gray-800 shadow sm:rounded-lg">
                                <h1 className="text-xl font-bold ">Tambah Trainset</h1>
                                <div className="flex gap-2 mt-2">
                                    <Input
                                        onChange={e => {
                                            setInput(Number(e.target.value));
                                        }}
                                        className="w-1/4 "
                                        placeholder="Jumlah Trainset"
                                    ></Input>
                                    <Button
                                        onClick={() => {
                                            let tempList: Trainset[] = [];
                                            for (let i = 0; i < input; i++) {
                                                tempList.push({
                                                    namaTrainset: i.toString(),
                                                    jumlahGerbong: 0,
                                                });
                                            }
                                            setListTrainset(prevListTrainset => [...prevListTrainset, ...tempList]);
                                        }}
                                    >
                                        Tambah Trainset
                                    </Button>
                                </div>
                            </div>
                        </AnimateIn>
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                        >
                            <div className="p-4 sm:p-8 bg-white h-fit dark:bg-gray-800 shadow sm:rounded-lg">
                                <Table className="mt-2">
                                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Trainset</TableHead>
                                            <TableHead className="text-center">Jumlah Gerbong</TableHead>
                                            <TableHead className="text-center">Action </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {listTrainset.map(trainset => (
                                            <TableRow key={trainset.namaTrainset}>
                                                <TableCell className="font-medium">{trainset.namaTrainset}</TableCell>
                                                <TableCell className="text-center">{trainset.jumlahGerbong}</TableCell>
                                                <TableCell className="flex justify-center ">
                                                    <Link href="buat-trainset">
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
        </div>
    );
}
