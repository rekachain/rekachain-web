import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { componentService } from '@/Services/componentService';
import { ROUTES } from '@/Support/Constants/routes';
import { useSuccessToast } from '@/Hooks/useToast';
import { ProgressResource } from '@/Support/Interfaces/Resources';
import { SelectGroup } from '@/Components/UI/select';
import { Label } from '@/Components/UI/label';
import { Check, ChevronsUpDown, RefreshCcw } from 'lucide-react';
import { STYLING } from '@/Support/Constants/styling';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useDebounce } from '@uidotdev/usehooks';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { progressService } from '@/Services/progressService';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/UI/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import cn from 'mxcn';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ProgressResource>>();
    const [searchProgress, setSearchProgress] = useState('');
    const { data, setData, post, processing, errors, reset, progress } = useForm<{
        progress_id: number | null;
        name: string;
    }>({
        progress_id: null,
        name: '',
    });

    const debouncedSearchProgress = useDebounce(searchProgress, 300);

    const handleSyncProgress = withLoading(async () => {
        const filters: ServiceFilterOptions = { search: debouncedSearchProgress };
        const res = await progressService.getAll(filters);
        setProgressResponse(res);
    });

    useEffect(() => {
        void handleSyncProgress();
    }, [debouncedSearchProgress]);

    const submit: FormEventHandler = withLoading(async event => {
        event.preventDefault();
        await componentService.create(data);
        void useSuccessToast(t('pages.components.create.messages.created'));
        router.visit(route(`${ROUTES.COMPONENTS}.index`));
    });

    return (
        <>
            <Head title={t('pages.components.create.title')} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.components.create.title')}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <SelectGroup className="space-y-2">
                                <div className="flex flex-col bg-background-2 gap-4 p-4">
                                    <Label htmlFor="progress">{t('pages.components.create.fields.progress')}</Label>
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
                                    </div> */}
                                    {/* <div className="flex gap-4">
                                        <Select
                                            key={data.progress_id} // Force re-render when progress_id changes
                                            onValueChange={v => setData('progress_id', +v)}
                                            value={data.progress_id?.toString()}
                                            disabled={loading}
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
                                                        : t('pages.components.create.fields.progress')}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput
                                                        onValueChange={e => setSearchProgress(e)}
                                                        placeholder={t(
                                                            'pages.components.create.fields.progress_placeholder',
                                                        )}
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>No results found</CommandEmpty>
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
                            <InputLabel htmlFor="name" value={t('pages.components.create.fields.name')} />
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1"
                                autoComplete="name"
                                required
                                onChange={e => setData('name', e.target.value)}
                            />
                        </div>

                        <Button className="mt-4" disabled={processing}>
                            {t('pages.components.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
