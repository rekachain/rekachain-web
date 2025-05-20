import Checkbox from '@/Components/Checkbox';
import GenericDataSelector from '@/Components/GenericDataSelector';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/Components/UI/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { Switch } from '@/Components/UI/switch';
import { checkPermission } from '@/Helpers/permissionHelper';
import { cn } from '@/Lib/Utils';
import { projectService } from '@/Services/projectService';
import { trainsetService } from '@/Services/trainsetService';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { ProjectResource } from '@/Support/Interfaces/Resources';
import { router } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Check, ChevronsUpDown } from 'lucide-react';
import { memo, useCallback, useEffect, useState } from 'react';

const Filters = ({
    setFilters,
    filters,
}: {
    filters: ServiceFilterOptions;
    setFilters: (filters: ServiceFilterOptions) => void;
}) => {
    const { t } = useLaravelReactI18n();
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

    const fetchProjects = useCallback(async (filters: ServiceFilterOptions) => {
        return await projectService.getAll(filters).then((response) => response.data);
    }, []);

    const [trainsetFilters, setTrainsetFilters] = useState<ServiceFilterOptions>({
        search: '',
        column_filters: {
            project_id: filters.project_id ?? 1,
        }
    })
    const fetchTrainsets = useCallback(async (filters: ServiceFilterOptions) => {
        console.log(filters);
        return await trainsetService.getAll(filters).then((response) => response.data);
    }, []);

    useEffect(() => {
        setTrainsetFilters({
            ...trainsetFilters,
            column_filters: {
                project_id: filters.project_id ?? 1,
            }
        });
    }, [filters.project_id]);

    return (
        <>
            <div className='mr-2 flex items-center gap-3'>
                <Switch
                    onCheckedChange={(checked) => setFilters({ ...filters, useMerged: !checked })}
                    id='useMerged'
                    checked={!filters.useMerged}
                />
                <InputLabel
                    value={t('pages.dashboard.partials.filters.use_merged')}
                    htmlFor='useMerged'
                />
            </div>
            {checkPermission(PERMISSION_ENUM.PROJECT_READ) && (
                <>
                <GenericDataSelector
                    setSelectedData={(id) =>
                        setFilters({
                            ...filters,
                            project_id: id,
                        })
                    }
                    selectedDataId={filters.project_id || null}
                    renderItem={(item: ProjectResource) => `${item.name}`}
                    popoverContentClassName='w-full p-0'
                    placeholder={t('pages.dashboard.partials.filters.project_placeholder')}
                    nullable
                    id='project_selector'
                    fetchData={fetchProjects}
                    buttonClassName='w-25 justify-between md:w-40'
                />
                {filters.project_id && (
                    <GenericDataSelector
                        id="trainset_selector"
                        fetchData={(filters) => fetchTrainsets({...trainsetFilters, ...filters})}
                        setSelectedData={(id) => {
                            setFilters({
                                ...filters,
                                trainset_id: id,
                            });
                            router.visit(route(`${ROUTES.DASHBOARD}.trainset`, [filters.project_id, id]));
                        }}
                        selectedDataId={filters.trainset_id || null}
                        placeholder={t('pages.dashboard.partials.filters.trainset_placeholder')}
                        renderItem={item => `${item.name}`}
                        buttonClassName="w-25 justify-between md:w-40"
                        nullable
                    />
                )}
                </>
            )}
            {checkPermission([PERMISSION_ENUM.RETURNED_PRODUCT_READ]) && (
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
                                    : 'Filter Tahun'}
                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                            <Command>
                                <CommandList>
                                    <CommandEmpty>{'Year Not Found'}</CommandEmpty>
                                    <CommandGroup>
                                        {filters.returned_product.year && (
                                            <CommandItem
                                                onSelect={() => {
                                                    setFilters({
                                                        ...filters,
                                                        returned_product: {
                                                            ...filters.returned_product,
                                                            year: '',
                                                            month: 0,
                                                        },
                                                    });
                                                    setYearFilterOpen(false);
                                                }}
                                            >
                                                {t(
                                                    'components.generic_data_selector.actions.clear_selection',
                                                )}
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
                                                            year:
                                                                currentValue ===
                                                                filters.returned_product.year
                                                                    ? ''
                                                                    : currentValue.toString(),
                                                            month: filters.returned_product.month,
                                                        },
                                                    });
                                                    setYearFilterOpen(false);
                                                }}
                                                key={yearItem}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        filters.returned_product.year ===
                                                            yearItem.toString()
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
                                        ? months.find(
                                              (month) =>
                                                  month.value === filters.returned_product.month,
                                          )?.label
                                        : 'Filter Bulan'}
                                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-[200px] p-0'>
                                <Command>
                                    <CommandList>
                                        <CommandEmpty>{'Month Not Found'}</CommandEmpty>
                                        <CommandGroup>
                                            {filters.returned_product.month !== 0 && (
                                                <CommandItem
                                                    onSelect={() => {
                                                        setFilters({
                                                            ...filters,
                                                            returned_product: {
                                                                ...filters.returned_product,
                                                                year: filters.returned_product.year,
                                                                month: 0,
                                                            },
                                                        });
                                                        setMonthFilterOpen(false);
                                                    }}
                                                >
                                                    {t(
                                                        'components.generic_data_selector.actions.clear_selection',
                                                    )}
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
                                                            },
                                                        });
                                                        setMonthFilterOpen(false);
                                                    }}
                                                    key={monthItem.label}
                                                >
                                                    <Check
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            filters.returned_product.month ===
                                                                monthItem.value
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
