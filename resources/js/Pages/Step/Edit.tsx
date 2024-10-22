import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { FormEventHandler, useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { stepService } from '@/Services/stepService';
import { ROUTES } from '@/Support/Constants/routes';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { ProgressResource, StepResource } from '@/Support/Interfaces/Resources';
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

export default function ({ step }: { step: StepResource }) {
    const { t } = useLaravelReactI18n();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ProgressResource>>();
    const [searchProgress, setSearchProgress] = useState(step.progress?.name);
    const { data, setData } = useForm({
        progress_id: step.progress_id,
        name: step.name,
        estimated_time: step.estimated_time ?? 0,
        process: step.process,
    });

    const { loading } = useLoading();

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
        await stepService.update(step.id, data);
        router.visit(route(`${ROUTES.STEPS}.index`));
        void useSuccessToast(t('pages.step.edit.messages.updated'));
    });

    return (
        <>
            <Head title={t('pages.step.edit.title', { name: step.name })} />
            <AuthenticatedLayout>
                <div className="p-4">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-page-header my-4">{t('pages.step.edit.title', { name: step.name })}</h1>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="mt-4">
                            <SelectGroup className="space-y-2">
                                <div className="flex flex-col bg-background-2 gap-4 p-4">
                                    <Label htmlFor="progress">{t('pages.step.edit.fields.progress')}</Label>
                                    <div className="flex gap-2">
                                        {/* TODO: refactor using GenericDataSelector, BUG: existing progress wont show */}
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
                                                        : t('pages.step.edit.fields.progress')}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput
                                                        onValueChange={e => setSearchProgress(e)}
                                                        placeholder={t('pages.step.edit.fields.progress_placeholder')}
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
                                </div>
                            </SelectGroup>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="name" value={t('pages.step.edit.fields.name')} />
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1"
                                autoComplete="name"
                                onChange={e => setData('name', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="process" value={t('pages.step.edit.fields.process')} />
                            <Input
                                id="process"
                                type="text"
                                name="process"
                                value={data.process}
                                className="mt-1"
                                autoComplete="process"
                                onChange={e => setData('process', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="estimated_time"
                                value={t('pages.step.edit.fields.estimated_manufacturing_time')}
                            />
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

                        <Button className="mt-4" disabled={loading}>
                            {t('pages.step.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
