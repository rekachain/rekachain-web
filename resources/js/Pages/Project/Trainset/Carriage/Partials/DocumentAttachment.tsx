import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { useEffect } from 'react';
import { Head } from '@inertiajs/react';

const DocumentAttachment = () => {
    const temporaryChangeThemeToLightMode = () => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    };

    useEffect(() => {
        setTimeout(() => {
            temporaryChangeThemeToLightMode();

            window.print();
            window.onafterprint = () => {
                history.back();
            };
        }, 500);
    }, []);

    return (
        <>
            <Head title={'Document Attachment'} />
            <div className="">
                <h1 className="text-xl font-bold">KPM Mekanik</h1>
                <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">No Lampiran :</p>
                            <p>3349/PPC/KPM/VI/2024</p>
                        </div>
                        <div className="">
                            <p className="font-bold">No Reservasi :</p>
                            <p>-</p>
                        </div>
                        <div className="">
                            <p className="font-bold">Serial Number :</p>
                            <p>110-210</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">Nomor Referensi :</p>
                            <p>-</p>
                        </div>
                        <div className="">
                            <p className="font-bold">Tanggal :</p>
                            <p>17-08-2024</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5 text-white items-center">
                        <div className="">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                                alt=""
                                width={200}
                            />
                        </div>
                    </div>
                </div>
                <hr className="border-black border-[0.5px] mt-5" />
                <h1 className="text-xl font-bold mt-3">Status Pekerjaan </h1>
                <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">Supervisor :</p>
                            <p>Chamzal Izal</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="">
                            <p className="font-bold">Workstation :</p>
                            <p>Candi Sewu</p>
                        </div>
                        <div className="">
                            <p className="font-bold">Step 1 Cutting :</p>
                            <p>Selesai</p>
                        </div>
                        <div className="">
                            <p className="font-bold">Step 2 Assembly :</p>
                            <p>Diproses</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5 text-white items-center"></div>
                </div>
                <hr className="border-black border-[0.5px] mt-5" />
                <h1 className="text-xl font-bold mt-3">List Material </h1>
                {/* <div className="grid grid-cols-5">
                            <div className="flex flex-col gap-5 mt-5">
                                <div className="">
                                    <p className="font-bold">Kode Material:</p>
                                    <p>22858OH0000XXG01</p>
                                </div>
                                <div className="">
                                    <p className="font-bold">Kode Material:</p>
                                    <p>22858OH0000XXG01</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5">
                                <div className="">
                                    <p className="font-bold">Deskripsi :</p>
                                    <p>L1lp,L2lp</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5 ">
                                <div className="">
                                    <p className="font-bold">Spesifikasi :</p>
                                    <p>Indicator Lamp, Green 220VAC</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5 ">
                                <div className="">
                                    <p className="font-bold">Jumlah Diminta :</p>
                                    <p>18</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5 ">
                                <div className="">
                                    <p className="font-bold">Jumlah Diserahkan :</p>
                                    <p>18</p>
                                </div>
                            </div>
                        </div> */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Kode Material</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead>Spesifikasi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 200 }, (_, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">22858OH0000XXG01 </TableCell>
                                <TableCell>L1lp,L2lp </TableCell>
                                <TableCell>Indicator Lamp, Green 220VAC </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default DocumentAttachment;
