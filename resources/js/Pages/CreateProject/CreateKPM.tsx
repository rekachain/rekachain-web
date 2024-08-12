import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimateIn from '@/lib/AnimateIn';
import { Head } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';

export default function CreateKPM() {
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
                            <div className="border-2 flex justify-between border-black rounded-md p-3">
                                <p>Material 1 x 12</p>
                                <div className="flex w-16 justify-between">
                                    <Pencil></Pencil>
                                    <Trash></Trash>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Input placeholder="Nama Material"></Input>
                                <Input placeholder="Jumlah Material"></Input>
                                <Button>Tambah Material</Button>
                            </div>
                        </div>
                    </AnimateIn>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
