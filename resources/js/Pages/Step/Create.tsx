import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { FormEventHandler, useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button';
import { stepService } from '@/Services/stepService';
import { ROUTES } from '@/Support/constants/routes';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { ProgressResource } from '@/Support/interfaces/resources';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Label } from '@/Components/ui/label';
import { Check, ChevronsUpDown, RefreshCcw } from 'lucide-react';
import { STYLING } from '@/Support/constants/styling';
import { PaginateResponse } from '@/Support/interfaces/others';
import { withLoading } from '@/Utils/withLoading';
import { useDebounce } from '@uidotdev/usehooks';
import { ServiceFilterOptions } from '@/Support/interfaces/others/ServiceFilterOptions';
import { progressService } from '@/Services/progressService';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import cn from 'mxcn';

export default function () {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ProgressResource>>();
    const [searchProgress, setSearchProgress] = useState('');
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        progress_id: 0,
        name: '',
        estimated_time: 0,
        process: '',
    });
    const { loading, setLoading } = useLoading();

    const debouncedSearchProgress = useDebounce(searchProgress, 300);

    const handleSyncProgress = withLoading(async () => {
        const filters: ServiceFilterOptions = { search: debouncedSearchProgress };
        const res = await progressService.getAll(filters);
        setProgressResponse(res);
    });

    useEffect(() => {
        handleSyncProgress();
    }, [debouncedSearchProgress]);

    const submit: FormEventHandler = withLoading(async event => {
        event.preventDefault();
        await stepService.create(data);
        useSuccessToast('Step created successfully');
        router.visit(route(`${ROUTES.STEPS}.index`));
    });

    return (
        <>
            <Head title="Tambah Step" />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">Tambah Step</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <SelectGroup className="space-y-2">
                                <div className="flex flex-col bg-background-2 gap-4 p-4">
                                    <Label htmlFor="progress">Pilih progress yang sudah ada</Label>
                                    {/* <div className="flex gap-4">
                                        <Input
                                            placeholder="Cari progress"
                                            value={searchProgress}
                                            onChange={e => setSearchProgress(e.target.value)}
                                            disabled={loading}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={setSearchProgress.bind(null, '')}
                                        >
                                            <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                                        </Button>
                                    </div>
                                    <div className="flex gap-4">
                                        <Select
                                            key={data.progress_id} // Force re-render when progress_id changes
                                            onValueChange={v => setData('progress_id', +v)}
                                            value={data.progress_id?.toString()}
                                            disabled={loading}
                                            required
                                        >
                                            <SelectTrigger id="progress">
                                                <SelectValue placeholder="progress" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0" defaultChecked disabled>
                                                    {loading ? 'Loading' : 'Pilih progress'}
                                                </SelectItem>
                                                {progressResponse?.data.map(progress => (
                                                    <SelectItem key={progress.id} value={progress.id.toString()}>
                                                        {progress.name}
                                                        <br />
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div> */}
                                    <div className="flex gap-2">
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-full justify-between"
                                                >
                                                    {value
                                                        ? progressResponse?.data.find(
                                                              progress => progress.name === value,
                                                          )?.name
                                                        : 'Pilih progress...'}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput
                                                        onValueChange={e => setSearchProgress(e)}
                                                        placeholder="Cari Progress..."
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>Progress tidak ditemukan.</CommandEmpty>
                                                        <CommandGroup>
                                                            {progressResponse?.data.map(progress => (
                                                                <CommandItem
                                                                    key={progress.name}
                                                                    value={progress.name}
                                                                    onSelect={currentValue => {
                                                                        setData('progress_id', +progress.id);
                                                                        setValue(
                                                                            currentValue === value ? '' : currentValue,
                                                                        );
                                                                        setOpen(false);
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            value === progress.name
                                                                                ? 'opacity-100'
                                                                                : 'opacity-0',
                                                                        )}
                                                                    />
                                                                    {progress.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={setSearchProgress.bind(null, '')}
                                        >
                                            <RefreshCcw size={STYLING.ICON.SIZE.SMALL} />
                                        </Button>
                                    </div>
                                </div>
                            </SelectGroup>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="nama" value="Nama" />
                            <Input
                                id="nama"
                                type="text"
                                name="nama"
                                value={data.name}
                                className="mt-1"
                                autoComplete="nama"
                                required
                                onChange={e => setData('name', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="process" value="Proses" />
                            <Input
                                id="process"
                                type="text"
                                name="process"
                                value={data.process}
                                className="mt-1"
                                autoComplete="process"
                                required
                                onChange={e => setData('process', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="estimated_time" value="Estimasi Manufaktur (menit)" />
                            <Input
                                id="estimated_time"
                                type="number"
                                name="estimated_time"
                                value={data.estimated_time}
                                className="mt-1"
                                autoComplete="estimated_time"
                                onChange={e => setData('estimated_time', +e.target.value)}
                            />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            Tambah Step
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
