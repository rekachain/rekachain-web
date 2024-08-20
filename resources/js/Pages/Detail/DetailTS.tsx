import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import HeadLampiran from '@/Components/ui/lampiran';
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

type SusunanKereta = {
    susunanKereta: string;
    panel: string;
};

type DetailTS = {
    detailTS: string;
    noProyek: string;
};

const listTrainset: SusunanKereta[] = [
    { susunanKereta: 'K1', panel: 'AC Panel K1, Distribusi K1, Genset P ' },
    { susunanKereta: 'M', panel: 'Main Panel & LDK M, Underfrme B M' },
    { susunanKereta: 'P', panel: 'AC Dist P, Distribusi M, Pids M' },
];
import { Calculator, FileSearch } from 'lucide-react';
import AnimateIn from '@/lib/AnimateIn';

export default function DetailTS({ noProyek, detailTS }: DetailTS) {
    return (
        <AuthenticatedLayout>
            <Head title={`Detail ${detailTS}`} />
            <div className="py-12">
                <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                    <AnimateIn
                        from="opacity-0 -translate-y-4"
                        to="opacity-100 translate-y-0 translate-x-0"
                        duration={300}
                    >
                        <div className="p-4 sm:p-8 bg-white  dark:bg-gray-800 shadow sm:rounded-lg h-fit">
                            <h1 className="text-2xl font-bold"> {detailTS}</h1>
                            <h4 className="mb-3 mt-1">
                                <Link href="/proyek">Proyek </Link>/
                                <Link href={`/detail-proyek/${noProyek}`}> {noProyek} </Link>/
                                <Link href={detailTS}> {detailTS} </Link>
                            </h4>
                            <Table>
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="lg:w-[400px] md:w-[230px] sm:w-[50px]">
                                            Susunan Kereta
                                        </TableHead>
                                        <TableHead className="text-left">Panel dalam susunan kereta</TableHead>
                                        <TableHead className="text-center">Detail</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {listTrainset.map(SusunanKereta => (
                                        <TableRow key={SusunanKereta.susunanKereta}>
                                            <TableCell className="font-medium">{SusunanKereta.susunanKereta}</TableCell>
                                            <TableCell className="text-left">{SusunanKereta.panel}</TableCell>
                                            <TableCell className="flex justify-center ">
                                                <Link
                                                    href={`/${noProyek}/${detailTS}/detail-kereta/${SusunanKereta.susunanKereta}`}
                                                >
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
                            <HeadLampiran tipe="Mekanik" noProyek={noProyek} detailTS={detailTS} />
                            <HeadLampiran tipe="Elektrik" noProyek={noProyek} detailTS={detailTS} />
                        </div>
                    </AnimateIn>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
