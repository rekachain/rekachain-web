import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/UI/accordion';
import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';

const tableStyle = {
    border: 'none', // Removes the table border
};

const cellStyle = {
    border: 'none', // Removes the cell border
    backgroundColor: 'transparent', // Changes the cell background color
    marginTop: '0px',
};

type DetailTS = {
    detailTS: string;
    noProyek: string;
    tipe: string;
};

type TypeListMaterial = {
    Komat_No_DD: string;
    Deskripsi: string;
    Spesifikasi: string;
    JumlahDiminta: number;
    JumlahDiserahkan: number;
};

const listMaterial: TypeListMaterial[] = [
    {
        Komat_No_DD: '22858OH0000XXG01',
        Deskripsi: 'L1lp,L2lp',
        Spesifikasi: 'Indicator Lamp, Green 220VAC',
        JumlahDiminta: 18,
        JumlahDiserahkan: 18,
    },
    {
        Komat_No_DD: '22858OH0000XXG01',
        Deskripsi: 'Operation lamp for manual mode,Power On',
        Spesifikasi: 'Indicator Lamp, ABB CL2-502G',
        JumlahDiminta: 18,
        JumlahDiserahkan: 13,
    },
    {
        Komat_No_DD: '22858OH0000XXG01',
        Deskripsi: 'AC OP (AC ON)',
        Spesifikasi: 'NFB, ABB S201-C6 1P 6A',
        JumlahDiminta: 18,
        JumlahDiserahkan: 18,
    },
];

const HeadLampiran: React.FC<DetailTS> = ({ tipe, noProyek, detailTS }) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h2>
                        KPM {tipe} {detailTS}
                    </h2>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-2">
                        <div className="">
                            <div className=" mt-4 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left ">No Lampiran :</p>
                                <p className="text-left ml-14">No Proyek :</p>
                                <div className="flex justify-end"></div>
                            </div>
                            <div className=" mt-2 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left ">3349/PPC/KPM/VI/2024</p>
                                <p className="text-left ml-14">{noProyek}</p>
                            </div>
                            <div className=" mt-4 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left ">No reservasi :</p>
                                <p className="text-left ml-14">No ref :</p>
                            </div>
                            <div className=" mt-2 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left ">-</p>
                                <p className="text-left ml-14">-</p>
                            </div>
                            <div className=" mt-4 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left ">Serial Number :</p>
                                <p className="text-left ml-14">Tanggal</p>
                            </div>
                            <div className=" mt-2 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left ">
                                    110-113 (4K1)
                                    <br />
                                    092-096 (5K3)
                                </p>
                                <p className="text-left ml-14">08-06-2024</p>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4 border-black" />
                    <div className="p-2">
                        <div className="">
                            <div className=" mt-4">
                                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }} className="text-left ">
                                    Status Pekerjaan
                                </h2>
                            </div>
                            <div className=" mt-4 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left ">Supervisor :</p>
                                <p className="text-left ml-14">Workstation :</p>
                                <div className="flex justify-end"></div>
                            </div>
                            <div className=" mt-2 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left ">John Doe</p>
                                <p className="text-left ml-14">Candi Sewu</p>
                            </div>
                            <div className=" mt-6 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left " style={{ fontWeight: 'bold' }}>
                                    Step 1 Cutting
                                </p>
                            </div>
                            <div className=" mt-2 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left ">
                                    Pekerja : John Doe <br /> Status : Selesai
                                </p>
                            </div>
                            <div className=" mt-6 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left " style={{ fontWeight: 'bold' }}>
                                    Step 2 Cutting
                                </p>
                            </div>
                            <div className=" mt-2 gap-4 justify-between items-center grid grid-cols-3">
                                <p className="text-left ">
                                    Pekerja : John Doe <br /> Status : Diproses
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4 border-black" />
                    <div className="p-2">
                        <div className="">
                            <div className=" mt-4">
                                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }} className="text-left ">
                                    List Material
                                </h2>
                            </div>
                            <Table>
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="lg:w-[300px] md:w-[200px] sm:w-[50px]">
                                            Komat/ No. DD
                                        </TableHead>
                                        <TableHead className="text-left">Deskripsi</TableHead>
                                        <TableHead className="text-left">Spesifikasi</TableHead>
                                        <TableHead className="text-center">Jumlah Diminta</TableHead>
                                        <TableHead className="text-center">Jumlah Diserahkan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {listMaterial.map(Material => (
                                        <TableRow key={Material.Komat_No_DD}>
                                            <TableCell className="font-medium">{Material.Komat_No_DD}</TableCell>
                                            <TableCell className="text-left">{Material.Deskripsi}</TableCell>
                                            <TableCell className="text-left">{Material.Spesifikasi}</TableCell>
                                            <TableCell className="text-center">{Material.JumlahDiminta}</TableCell>
                                            <TableCell className="text-center">{Material.JumlahDiserahkan}</TableCell>
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
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default HeadLampiran;
