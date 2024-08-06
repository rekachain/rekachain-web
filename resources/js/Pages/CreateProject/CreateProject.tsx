import { Input } from '@/Components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useToast } from '@/Components/ui/use-toast';
import AnimateIn from '@/lib/AnimateIn';
import { buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';

type Project = {
    nomorProyek: number;
    jumlahTrainset: number;
};
export default function CreateProject() {
    const { toast } = useToast();
    const project = {} as Project;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        nomorProyek: project.nomorProyek,
        jumlahTrainset: project.jumlahTrainset,
    });
    const submit: FormEventHandler = e => {
        e.preventDefault();
        // alert('halo');
        toast({
            title: 'Proyek Berhasil Dibuat !',
            description: 'Jumat, 10 February , 2023 saat 5:57 PM',
        });

        location.href = route('buat-trainset');
    };
    return (
        <AuthenticatedLayout>
            <Head title="Buat Proyek" />
            <div className="py-12">
                <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                    <AnimateIn
                        from="opacity-0 -translate-y-4"
                        to="opacity-100 translate-y-0 translate-x-0"
                        duration={300}
                    >
                        <form onSubmit={submit}>
                            <div className="p-4 sm:p-8 bg-white h-[20rem] dark:bg-gray-800 shadow sm:rounded-lg">
                                <h1 className="text-2xl font-bold">Buat Proyek</h1>
                                <h3 className="text-lg mt-2">Nomor Projek :</h3>

                                {/* <InputLabel htmlFor="name" value="Name" /> */}

                                {/* <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    /> */}
                                <div className="w-64 flex items-center rounded border-2 px-2 mt-3 ">
                                    <Input
                                        value={data.nomorProyek}
                                        onChange={e => setData('nomorProyek', Number(e.target.value))}
                                        className="h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="Buat Proyek"
                                        type="number"
                                    />
                                </div>
                                <h3 className="text-lg mt-2">Jumlah Trainset :</h3>

                                <div className="w-64 flex items-center rounded border-2 px-2 mt-3 ">
                                    <Input
                                        value={data.jumlahTrainset}
                                        onChange={e => setData('jumlahTrainset', Number(e.target.value))}
                                        className="h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="Jumlah Trainset"
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                {/* <Link href={route(`buat-trainset`)}> */}
                                <button type="submit" className="p-2 mt-5 bg-blue-600 rounded-md text-white">
                                    Buat Proyek
                                </button>
                                {/* </Link> */}
                            </div>
                        </form>
                    </AnimateIn>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
