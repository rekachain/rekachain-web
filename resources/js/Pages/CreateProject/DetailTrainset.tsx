import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimateIn from '@/lib/AnimateIn';
import { Head, Link } from '@inertiajs/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { useState } from 'react';

type Gerbong = {
    namaGerbong: string;
    panel: Panel[];
};

type Panel = {
    namaPanel: string;
    jumlahPanel: number;
};

const listGerbongConst: Gerbong[] = [
    {
        namaGerbong: 'K1',
        panel: [
            {
                namaPanel: 'AC',
                jumlahPanel: 20,
            },
            {
                namaPanel: 'Mainboard',
                jumlahPanel: 11,
            },
        ],
    },
    {
        namaGerbong: 'M',
        panel: [
            {
                namaPanel: 'AC',
                jumlahPanel: 20,
            },
            {
                namaPanel: 'Mainboard',
                jumlahPanel: 11,
            },
        ],
    },
];

export default function DetailTrainset() {
    const [listGerbong, setListGerbong] = useState<Gerbong[]>(listGerbongConst);
    return (
        <div className="">
            <AuthenticatedLayout>
                <Head title="Detail Trainset" />
                <div className="py-12">
                    <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                        <h1 className="text-2xl font-bold">Trainset 1</h1>
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                        >
                            {/* <div className="p-4 sm:p-8 bg-white h-fit dark:bg-gray-800 shadow sm:rounded-lg"> */}
                            {listGerbong.map(gerbong => (
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>{gerbong.namaGerbong}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="p-2">
                                                <Input placeholder={gerbong.namaGerbong}></Input>
                                                <div className="flex mt-2 gap-4">
                                                    <Input placeholder="Nama Panel"></Input>
                                                    <Input placeholder="Jumlah"></Input>
                                                    <Button>Tambah Panel</Button>
                                                </div>
                                                <hr className="mt-4 border-black" />
                                                <div className="">
                                                    {gerbong.panel.map(panel => (
                                                        <div
                                                            className="
                                                         mt-4 gap-4 justify-between items-center grid grid-cols-3
                                                        "
                                                        >
                                                            <p className="pl-2">{panel.namaPanel}</p>
                                                            <p className="text-center">x{panel.jumlahPanel}</p>
                                                            <div className="flex justify-end">
                                                                <Link href="buat-kpm">
                                                                    <Button>Detail KPM</Button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ))}
                            <Button className="mt-5 w-full">Tambah Gerbong</Button>
                            {/* </div> */}
                        </AnimateIn>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
