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

type KPM = {
    noLampKpm: string;
    tanggal: string;
    panel: string;
};

type DetailKereta = {
    detailTS: string;
    noProyek: string;
    susunanKereta: string;
};

const listTrainset: KPM[] = [
    { noLampKpm: '349/PPC/KPM/VI/2024', tanggal: '08 Juni 2024', panel: 'AC Panel K1, Distribusi K1, Genset P ' },
    { noLampKpm: '350/PPC/KPM/VI/2024', tanggal: '1 Juli 2024', panel: 'Main Panel & LDK M, Underfrme B M' },
    { noLampKpm: '351/PPC/KPM/VI/2024', tanggal: '16 Agustus', panel: 'AC Dist P, Distribusi M, Pids M' },
];
import { Calculator, FileSearch } from 'lucide-react';
import AnimateIn from '@/lib/AnimateIn';

export default function DetailTS({ noProyek, detailTS, susunanKereta }: DetailKereta) {
    noProyek;
    detailTS;
    susunanKereta;
    return (
        <AuthenticatedLayout>
            <Head title={`Susunan Kereta ${susunanKereta}`} />
            <div className="py-12">
                <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                    <AnimateIn
                        from="opacity-0 -translate-y-4"
                        to="opacity-100 translate-y-0 translate-x-0"
                        duration={300}
                    >
                        <div className="p-4 sm:p-8 bg-white  dark:bg-gray-800 shadow sm:rounded-lg h-fit">
                            <h1 className="text-2xl font-bold">Susunan Kereta {susunanKereta}</h1>
                            <h4 className="mb-3 mt-1">
                                <Link href="/proyek">Proyek </Link>/
                                <Link href={`/detail-proyek/${noProyek}`}> {noProyek} </Link>/
                                <Link href={`/${noProyek}/detail-ts/${detailTS}`}> {detailTS} </Link>/
                                <Link href={susunanKereta}> {susunanKereta} </Link>
                            </h4>
                            <Table>
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="lg:w-[350px] md:w-[100px] sm:w-[50px]">
                                            No Lampiran KPM
                                        </TableHead>
                                        <TableHead className="text-left">Tanggal</TableHead>
                                        <TableHead className="text-left">Panel dalam susunan kereta</TableHead>
                                        <TableHead className="text-center">Detail</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {listTrainset.map(KPM => (
                                        <TableRow key={KPM.noLampKpm}>
                                            <TableCell className="font-medium">{KPM.noLampKpm}</TableCell>
                                            <TableCell className="text-left">{KPM.tanggal}</TableCell>
                                            <TableCell className="text-left">{KPM.panel}</TableCell>
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
