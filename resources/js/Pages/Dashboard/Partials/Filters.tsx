import Checkbox from '@/Components/Checkbox';
import GenericDataSelector from '@/Components/GenericDataSelector';
import GenericFilters from '@/Components/GenericFilters';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/UI/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { checkPermission } from '@/Helpers/permissionHelper';
import { cn } from '@/Lib/Utils';
import { projectService } from '@/Services/projectService';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Check, ChevronsUpDown } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

const Filters = ({
    data,
    setFilters,
    filters,
}: {
    data: any;
    filters: ServiceFilterOptions;
    setFilters: (filters: ServiceFilterOptions) => void;
}) => {
    const { t } = useLaravelReactI18n();
    const [open, setOpen] = useState(false);
    const [yearFilterOpen, setYearFilterOpen] = useState(false);
    const [monthFilterOpen, setMonthFilterOpen] = useState(false);
    const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    const months = [
        { value: 1, label: 'Januari' },
        { value: 2, label: 'Februari' },
        { value: 3, label: 'Maret' },
        { value: 4, label: 'April' },
        { value: 5, label: 'Mei' },
        { value: 6, label: 'Juni' },
        { value: 7, label: 'Juli' },
        { value: 8, label: 'Agustus' },
        { value: 9, label: 'September' },
        { value: 10, label: 'Oktober' },
        { value: 11, label: 'November' },
        { value: 12, label: 'Desember' },
    ];
    const [openTrainset, setOpenTrainset] = useState(false);
    const [value, setValue] = useState(data['project'] !== null ? data['project'] : '');
    const [valueTrainset, setValueTrainset] = useState('');
    const project = [
        {
            value: 'Semua Proyek',
            label: 'Semua Proyek',
            link: '/dashboard',
        },
        {
            value: '612',
            label: '612',
            link: '/dashboard/1',
        },
        {
            value: 'KRL KCI',
            label: 'KRL KCI',
            link: '/dashboard/2',
        },
    ];
    
    const fetchProjects = useCallback(async (filters: ServiceFilterOptions) => {
        return await projectService.getAll(filters).then((response) => response.data);
    }, []);

    return (
        <>
        <div className="flex items-center gap-3 mr-2">
            <Checkbox
                id="useMerged"
                onChange={e => setFilters({ ...filters, useMerged: e.target.checked })}
                checked={filters.useMerged}
            />
            <InputLabel htmlFor="useMerged" value={t('pages.dashboard.partials.filters.use_merged')} />
        </div>
        {/* <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className=' ' asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    className='w-25 justify-between md:w-40'
                    aria-expanded={open}
                >
                    {value
                        ? project.find(
                            (projectItem) => projectItem.value === value,
                        )?.label
                        : t('pages.dashboard.partials.filters.project_placeholder')}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput
                        placeholder={t('pages.dashboard.index.find_project')}
                    />
                    <CommandList>
                        <CommandEmpty>
                            {t('pages.dashboard.index.project_not_found')}
                        </CommandEmpty>
                        <CommandGroup>
                            {
                                // @ts-ignore
                                data['projectDetail'].map((projectItem) => (
                                    <Link
                                        key={projectItem.id}
                                        href={`/dashboard/${projectItem.id}`}
                                    >
                                        <CommandItem
                                            value={`/dashboard/${projectItem.name}`}
                                            onSelect={(currentValue) => {
                                                setValue(
                                                    currentValue === value
                                                        ? ''
                                                        : currentValue,
                                                );
                                                setOpen(false);
                                            }}
                                            key={projectItem.value}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    value === projectItem.name
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                            {projectItem.name}
                                        </CommandItem>
                                    </Link>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover> */}
        <GenericDataSelector
            buttonClassName='w-25 justify-between md:w-40'
            setSelectedData={(id) =>
                setFilters({
                    ...filters,
                    project_id: id,
                })
            }
            selectedDataId={filters.project_id || null}
            renderItem={(item: ProjectResource) =>
                `${item.name}`
            }
            popoverContentClassName='w-full p-0'
            placeholder={t(
                'pages.dashboard.partials.filters.project_placeholder',
            )}
            nullable
            id='project_selector'
            fetchData={fetchProjects}
        />
        <Popover open={openTrainset} onOpenChange={setOpenTrainset}>
            <PopoverTrigger
                className={`${data['project'] == null ? 'hidden' : ' '}`}
                asChild
            >
                <Button
                    variant='outline'
                    role='combobox'
                    className='w-25 justify-between md:w-40'
                    aria-expanded={openTrainset}
                >
                    {valueTrainset
                        ? project.find(
                                (projectItem) =>
                                    projectItem.value === valueTrainset,
                            )?.label
                        : `${t('pages.dashboard.index.select_trainset')}`}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput
                        placeholder={`${t('pages.dashboard.index.find_trainset')}`}
                    />
                    <CommandList>
                        <CommandEmpty>
                            Trainset tidak ditemukan.
                        </CommandEmpty>
                        <CommandGroup>
                            {// @ts-ignore
                            data['tsList']?.map((projectItem) => (
                                <Link
                                    key={projectItem.id}
                                    href={`/dashboard/${data['projectId']}/${projectItem.id}`}
                                >
                                    <CommandItem
                                        value={projectItem.name}
                                        onSelect={(currentValue) => {
                                            setValueTrainset(
                                                currentValue ===
                                                    valueTrainset
                                                    ? ''
                                                    : currentValue,
                                            );
                                            setOpenTrainset(false);
                                        }}
                                        key={projectItem.id}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                valueTrainset ===
                                                    projectItem.name
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                        {projectItem.name}
                                    </CommandItem>
                                </Link>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
        {/* <button className={buttonVariants()}>Detail Trainset</button>
        <GenericDataSelector
            // TODO: redesain dis shts🗿
            id="trainset_id"
            fetchData={fetchTrainsetFilters}
            setSelectedData={id => setTrainsetFilters({ id: id })}
            selectedDataId={trainsetFilters?.id ?? null}
            placeholder={'Choose'}
            renderItem={item => `${item.name}`}
            buttonClassName="mt-1"
            nullable
        /> */}
        {checkPermission([PERMISSION_ENUM.RETURNED_PRODUCT_CREATE]) && (
            <>
                <Popover open={yearFilterOpen} onOpenChange={setYearFilterOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline'
                            role='combobox'
                            className='w-25 justify-between md:w-40'
                            aria-expanded={yearFilterOpen}
                        >
                            {filters.returned_product.year
                                ? filters.returned_product.year
                                : "Filter Tahun"}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0'>
                        <Command>
                            <CommandList>
                                <CommandEmpty>
                                    {"Year Not Found"}
                                </CommandEmpty>
                                <CommandGroup>
                                    {filters.returned_product.year && (
                                        <CommandItem onSelect={() => {
                                            setFilters({
                                                ...filters,
                                                returned_product: {
                                                    ...filters.returned_product,
                                                    year: '',
                                                    month: 0
                                                }
                                            })
                                            setYearFilterOpen(false);
                                        }}>
                                            {t('components.generic_data_selector.actions.clear_selection')}
                                        </CommandItem>
                                    )}
                                    {years.map((yearItem) => (
                                        <CommandItem
                                            value={yearItem.toString()}
                                            onSelect={(currentValue) => {
                                                setFilters({
                                                    ...filters,
                                                    returned_product: {
                                                        ...filters.returned_product,
                                                        year: currentValue === filters.returned_product.year
                                                            ? ''
                                                            : currentValue.toString(),
                                                        month: filters.returned_product.month
                                                    }
                                                })
                                                setYearFilterOpen(false);
                                            }}
                                            key={yearItem}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    filters.returned_product.year === yearItem.toString()
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                            {yearItem}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {filters.returned_product.year && (
                    <Popover open={monthFilterOpen} onOpenChange={setMonthFilterOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant='outline'
                                role='combobox'
                                className='w-25 justify-between md:w-40'
                                aria-expanded={monthFilterOpen}
                            >
                                {filters.returned_product.month
                                    ? months.find(month => month.value === filters.returned_product.month)?.label
                                    : "Filter Bulan"}
                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                            <Command>
                                <CommandList>
                                    <CommandEmpty>
                                        {"Month Not Found"}
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {filters.returned_product.month !== 0 && (
                                            <CommandItem onSelect={() => {
                                                setFilters({
                                                    ...filters,
                                                    returned_product: {
                                                        ...filters.returned_product,
                                                        year: filters.returned_product.year,
                                                        month: 0,
                                                    }
                                                })
                                                setMonthFilterOpen(false)
                                            }}>
                                                {t('components.generic_data_selector.actions.clear_selection')}
                                            </CommandItem>
                                        )}
                                        {months.map((monthItem) => (
                                            <CommandItem
                                                value={monthItem.label}
                                                onSelect={() => {
                                                    setFilters({
                                                        ...filters,
                                                        returned_product: {
                                                            ...filters.returned_product,
                                                            year: filters.returned_product.year,
                                                            month: monthItem.value,
                                                        }
                                                    })
                                                    setMonthFilterOpen(false);
                                                }}
                                                key={monthItem.label}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        filters.returned_product.month === monthItem.value
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                                {monthItem.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                )}
            </>
            
        )}
        </>
    );
};

export default memo(Filters);
