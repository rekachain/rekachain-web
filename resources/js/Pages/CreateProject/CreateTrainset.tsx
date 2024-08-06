import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimateIn from '@/lib/AnimateIn';
import { Head } from '@inertiajs/react';
// import { Table } from 'lucide-react';

export default function CreateTrainset() {
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
                            <div className="p-4 sm:p-8 bg-white h-[10rem] dark:bg-gray-800 shadow sm:rounded-lg">
                                <h1 className="text-xl font-bold ">Tambah Trainset</h1>
                                <div className="flex gap-2 mt-2">
                                    <Input className="w-1/4 " placeholder="Jumlah Trainset"></Input>
                                    <Button>Tambah Trainset</Button>
                                </div>
                            </div>
                        </AnimateIn>
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                        >
                            <div className="p-4 sm:p-8 bg-white h-[20rem] dark:bg-gray-800 shadow sm:rounded-lg">
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
                                        {/* {listProyek.map(proyek => (
                                            <TableRow key={proyek.noProyek}>
                                                <TableCell className="font-medium">{proyek.noProyek}</TableCell>
                                                <TableCell className="text-center">{proyek.jumlahTS}</TableCell>
                                                <TableCell className="flex justify-center ">
                                                    <FileSearch className="hover:cursor-pointer"></FileSearch>
                                                </TableCell>
                                            </TableRow>
                                        ))} */}
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
