import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/UI/accordion';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimateIn from '@/Lib/AnimateIn';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

type Gerbong = {
    id: number;
    namaGerbong: string;
    panel: Panel[];
};

type Panel = {
    id: number;
    namaPanel: string;
    jumlahPanel: number;
};

const listGerbongConst: Gerbong[] = [
    {
        id: 0,
        namaGerbong: 'K1',
        panel: [
            {
                id: 0,
                namaPanel: 'AC',
                jumlahPanel: 20,
            },
            {
                id: 1,
                namaPanel: 'Mainboard',
                jumlahPanel: 11,
            },
        ],
    },
    {
        id: 1,
        namaGerbong: 'M',
        panel: [
            {
                id: 1,
                namaPanel: 'AC',
                jumlahPanel: 20,
            },
            {
                id: 2,
                namaPanel: 'Mainboard',
                jumlahPanel: 11,
            },
        ],
    },
];

export default function DetailTrainset() {
    const [listGerbong, setListGerbong] = useState<Gerbong[] | undefined>(listGerbongConst);

    function tambahGerbong() {
        setListGerbong([
            ...listGerbong!,
            {
                id: listGerbong!.length + 1,
                namaGerbong: 'K3',
                panel: [{ id: 1, namaPanel: 'PIDS', jumlahPanel: 13 }],
            },
        ]);
    }
    function tambahPanel(id: number) {
        // setListGerbong(
        //     listGerbong!.map(gerbong => {
        //         if (gerbong.id == id) {
        //             return listGerbong;
        //         } else {
        //         }
        //     }),
        //    );
        // setListGerbong(
        //     listGerbong!.map(gerbong => {
        //         if (gerbong.id === id) {
        //             const gerbongPanel = gerbong.panel.map(pan => {
        //                 if (pan.id === idPanel) {
        //                     return [
        //                         ...gerbong.panel,
        //                         { id: gerbong.panel.length + 1, namaPanel: 'Mainboard', jumlahPanel: 18 },
        //                     ];
        //                 }
        //                 return pan
        //             });
        //             // return {...joke, likes: joke.likes + 1}
        //         } else {
        //             gerbong;
        //         }
        //     }),
        // );
        setListGerbong(
            listGerbong!.map((gerbong) => {
                if (gerbong.id === id) {
                    return {
                        ...gerbong,
                        panel: [
                            ...gerbong.panel,
                            {
                                id: gerbong.panel.length + 1,
                                namaPanel: 'Mainboard',
                                jumlahPanel: 18,
                            },
                        ],
                    };
                    // }
                }
                return gerbong;
            }),
        );
    }

    return (
        <div className=''>
            <AuthenticatedLayout>
                <Head title='Detail Trainset' />
                <div className='py-12'>
                    <div className='h-screen max-w-7xl space-y-6 sm:px-6 lg:px-8'>
                        <h1 className='text-2xl font-bold'>Trainset 1</h1>
                        <AnimateIn
                            to='opacity-100 translate-y-0 translate-x-0'
                            from='opacity-0 -translate-y-4'
                            duration={300}
                        >
                            {/* <div className="p-4 sm:p-8 bg-white h-fit dark:bg-gray-800 shadow sm:rounded-lg"> */}
                            {listGerbong!.map((gerbong) => (
                                <Accordion type='single' collapsible>
                                    <AccordionItem value='item-1'>
                                        <AccordionTrigger>{gerbong.namaGerbong}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className='p-2'>
                                                <Input placeholder={gerbong.namaGerbong}></Input>
                                                <div className='mt-2 flex gap-4'>
                                                    <Input placeholder='Nama Panel'></Input>
                                                    <Input placeholder='Jumlah'></Input>
                                                    <Button onClick={() => tambahPanel(gerbong.id)}>
                                                        Tambah Panel
                                                    </Button>
                                                </div>
                                                <hr className='mt-4 border-black' />
                                                <div className=''>
                                                    {gerbong.panel.map((panel) => (
                                                        <div className='mt-4 grid grid-cols-3 items-center justify-between gap-4'>
                                                            <p className='pl-2'>
                                                                {panel.namaPanel}
                                                            </p>
                                                            <p className='text-center'>
                                                                x{panel.jumlahPanel}
                                                            </p>
                                                            <div className='flex justify-end'>
                                                                <Link href='buat-kpm'>
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
                            <Button onClick={tambahGerbong} className='mt-5 w-full'>
                                Tambah Gerbong
                            </Button>
                            {/* </div> */}
                        </AnimateIn>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
