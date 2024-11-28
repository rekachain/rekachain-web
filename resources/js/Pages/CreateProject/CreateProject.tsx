import { Input } from '@/Components/UI/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useToast } from '@/Components/UI/use-toast';
import AnimateIn from '@/Lib/AnimateIn';

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
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // alert('halo');
        const newDate = new Date();
        const date = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();

        toast({
            title: 'Proyek Berhasil Dibuat !',
            process: `${year}${month < 10 ? `0${month}` : `${month}`}${date}`,
        });
        location.href = route('list-trainset');
    };
    return (
        <AuthenticatedLayout>
            <Head title='Buat Proyek' />
            <div className='py-12'>
                <div className='h-screen w-1/2 max-w-7xl space-y-6 sm:min-w-full sm:px-6 lg:px-8'>
                    <AnimateIn
                        to='opacity-100 translate-y-0 translate-x-0'
                        from='opacity-0 -translate-y-4'
                        duration={300}
                    >
                        <form onSubmit={submit}>
                            <div className='h-[20rem] bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8'>
                                <h1 className='text-2xl font-bold'>Buat Proyek</h1>
                                <h3 className='mt-2 text-lg'>Nomor Projek :</h3>

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
                                <div className='mt-3 flex w-64 items-center rounded border-2 px-2'>
                                    <Input
                                        value={data.nomorProyek}
                                        type='number'
                                        placeholder='Buat Proyek'
                                        onChange={(e) =>
                                            setData('nomorProyek', Number(e.target.value))
                                        }
                                        className='h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                    />
                                </div>
                                <h3 className='mt-2 text-lg'>Jumlah Trainset :</h3>

                                <div className='mt-3 flex w-64 items-center rounded border-2 px-2'>
                                    <Input
                                        value={data.jumlahTrainset}
                                        type='number'
                                        placeholder='Jumlah Trainset'
                                        onChange={(e) =>
                                            setData('jumlahTrainset', Number(e.target.value))
                                        }
                                        className='h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                                    />
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                {/* <Link href={route(`buat-trainset`)}> */}
                                <button
                                    type='submit'
                                    className='mt-5 rounded-md bg-blue-600 p-2 text-white'
                                >
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
