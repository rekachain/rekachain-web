import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { lazy, memo, Suspense, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import StaticLoadingOverlay from '@/Components/StaticLoadingOverlay';
import { TrainsetResource } from '@/support/interfaces/resources';

const Carriages = memo(lazy(() => import('./Partials/Carriages')));

export default function ({ trainset: initialTrainset }: { trainset: TrainsetResource }) {
    const [trainset, setTrainset] = useState<TrainsetResource>(initialTrainset);
    const { data, setData, post, processing, errors, reset } = useForm({
        isLoading: false,
    });

    return (
        <>
            <Head title={`Project ${trainset.name}`} />
            <AuthenticatedLayout>
                <div className="p-4 space-y-4">
                    <div className="flex flex-col gap-2">
                        <div>
                            <h1 className="text-page-header my-4">Trainset {trainset.name}</h1>
                        </div>

                        {/*<div className="rounded p-5 bg-background-2">*/}
                        {/*    <form onSubmit={handleAddTrainset} className="flex flex-col gap-2">*/}
                        {/*        <Label htmlFor="tambah-trainset">Tambah trainset baru</Label>*/}
                        {/*        <div className="flex gap-2">*/}
                        {/*            <Input*/}
                        {/*                id="tambah-trainset"*/}
                        {/*                type="number"*/}
                        {/*                className="w-fit"*/}
                        {/*                placeholder="Add Trainset"*/}
                        {/*                value={data.trainsetNeeded}*/}
                        {/*                onChange={e => setData('trainsetNeeded', +e.target.value)}*/}
                        {/*            />*/}
                        {/*            <Button type="submit" disabled={data.isLoading}>*/}
                        {/*                {data.isLoading ? (*/}
                        {/*                    <>*/}
                        {/*                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />*/}
                        {/*                        Adding Trainset*/}
                        {/*                    </>*/}
                        {/*                ) : (*/}
                        {/*                    'Add Trainset'*/}
                        {/*                )}*/}
                        {/*            </Button>*/}
                        {/*        </div>*/}
                        {/*    </form>*/}
                        {/*</div>*/}
                    </div>
                    <Suspense fallback={<StaticLoadingOverlay />}>
                        <Carriages trainset={trainset} />
                    </Suspense>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
