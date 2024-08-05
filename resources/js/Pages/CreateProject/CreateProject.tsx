import { Input } from '@/Components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type Project = {
    nomorProyek: number;
    jumlahTrainset: number;
};
export default function CreateProject() {
    const project = {} as Project;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        nomorProyek: project.nomorProyek,
        jumlahTrainset: project.jumlahTrainset,
    });
    const submit: FormEventHandler = e => {
        e.preventDefault();
        alert('halo');
    };
    return (
        <AuthenticatedLayout>
            <Head title="Buat Proyek" />
            <div className="py-12">
                <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                    <form onSubmit={submit}>
                        <div className="p-4 sm:p-8 bg-white h-[20rem] dark:bg-gray-800 shadow sm:rounded-lg">
                            <h1 className="text-2xl font-bold">Buat Proyek</h1>
                            <h3 className="text-lg mt-2">Nomor Projek :</h3>

                            <div className="w-64 flex items-center rounded border-2 px-2 mt-3 ">
                                <Input
                                    className="h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="Buat Proyek"
                                    type="number"
                                />
                            </div>
                            <h3 className="text-lg mt-2">Jumlah Trainset :</h3>

                            <div className="w-64 flex items-center rounded border-2 px-2 mt-3 ">
                                <Input
                                    className="h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="Jumlah Trainset"
                                    type="number"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="p-2 mt-5 bg-blue-600 rounded-md text-white">
                                Buat Proyek
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
