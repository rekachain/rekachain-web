import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimateIn from '@/Lib/AnimateIn';
import { Head } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { Label } from '@/Components/ui/label';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';

type material = {
    nama: string;
    jumlah: number;
};

export default function CreateKPM() {
    const [materials, setMaterial] = useState<material[] | undefined>([
        {
            nama: 'Besi',
            jumlah: 10,
        },
        {
            nama: 'Hypalon',
            jumlah: 5,
        },
    ]);

    function tambahMaterial() {
        setMaterial([
            ...materials!,
            {
                nama: 'Kayu',
                jumlah: 3,
            },
        ]);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Buat KPM" />
            <div className="py-12">
                <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                    <h1 className="text-2xl font-bold">KPM: Panel 1</h1>
                    <AnimateIn
                        from="opacity-0 -translate-y-4"
                        to="opacity-100 translate-y-0 translate-x-0"
                        duration={300}
                    >
                        <div className=" flex flex-col gap-5 ">
                            <Input placeholder="Serial Number"></Input>
                            <hr className="border-black" />
                            <h2 className="text-md">List Material</h2>
                            {materials?.map(material => (
                                <div className="border-2 flex justify-between border-black rounded-md p-3">
                                    <p>
                                        {material.nama} x {material.jumlah}
                                    </p>
                                    <div className="flex w-16 justify-between">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Pencil className="hover:cursor-pointer"></Pencil>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Material {material.nama}</DialogTitle>
                                                    <DialogDescription>Ubah material .</DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="">
                                                            Nama Material
                                                        </Label>
                                                        {/* <h4 className="text-lg">ma</h4> */}
                                                        <Input
                                                            id="name"
                                                            defaultValue={material.nama}
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="username" className="">
                                                            Jumlah Material
                                                        </Label>
                                                        <Input
                                                            id="username"
                                                            defaultValue={material.jumlah}
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Simpan Perubahan</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <Trash></Trash>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Apakah anda yakin akan menghapus material {material.nama}?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Material yang sudah dihapus tidak akan bisa dikembalikan
                                                        kembali, pastikan material yang dipilih sudah benar.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Kembali</AlertDialogCancel>
                                                    <AlertDialogAction>Hapus</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            ))}
                            <div className="flex gap-3">
                                <Input placeholder="Nama Material"></Input>
                                <Input placeholder="Jumlah Material"></Input>
                                <Button onClick={() => tambahMaterial()}>Tambah Material</Button>
                            </div>
                        </div>
                    </AnimateIn>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
