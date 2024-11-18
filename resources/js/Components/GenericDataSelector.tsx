import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/UI/command';
import { Button } from '@/Components/UI/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { Resource } from '@/Support/Interfaces/Resources';
import { cn } from '@/Lib/Utils';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface GenericDataSelectorProps<T extends Resource> {
    /**
     * ID for the GenericDataSelector component
     */
    id?: string;

    /**
     * Data to display in the list, e.g. manual state control
     *
     * Usage:
     * const [data, setData] = useState<UserResource[]>([]);
     * <GenericDataSelector data={data} />
     */
    data?: T[];

    /**
     * Function to fetch data based on filters
     * This function should accept an object with the search term
     *
     * Usage:
     * fetchData={(filters) => fetchUsers(filters)}
     * @param filters
     */
    fetchData?: (filters: ServiceFilterOptions) => Promise<T[]>;

    /**
     * Function to set the selected data
     * This function should accept the ID of the selected data
     *
     * Usage:
     * setSelectedData={(id) => setData({ ...data, progress_id: id })}
     * @param id
     */
    setSelectedData: (id: number | null) => void;

    /**
     * Placeholder text for the search input
     * Default is 'Search...'
     */
    customSearchPlaceholder?: string;

    /**
     * Placeholder text for the button
     * Default is 'Select...'
     */
    placeholder?: string;

    /**
     * ID of the currently selected data
     * If this is set, the label for the selected data will be displayed in the button
     */
    selectedDataId?: number | null;

    /**
     * Function to render each item in the list
     * This function should return a string to display in the list
     *
     * Usage:
     * renderItem={(item: UserResource) => `${item.name} - ${item.location}`}
     * @param item
     */
    renderItem: (item: T) => string;

    /**
     * Initial search term
     * Useful for pre-populating the search input, e.g. when editing
     */
    initialSearch?: string;

    /**
     * Key to use as the label for each item
     * Default is 'name'
     * Can be overridden to use a different key
     *
     * Dynamic label key for the entity (e.g., 'name', 'location', 'username')
     */
    labelKey?: keyof T;

    /**
     * Optional class name for the button
     * Useful for custom styling
     */
    buttonClassName?: string;

    /**
     * Optional class name for the popover content
     * Useful for custom styling
     */
    popoverContentClassName?: string;

    /**
     * Allow the selection to be cleared
     * If true, a '- Clear Selection -' option will be displayed
     */
    nullable?: boolean;

    /**
     * Custom label function
     * This function is called to generate the label for each item in the list
     *
     * Usage:
     * customLabel={(item: UserResource) => `${item.name} - ${item.location}`}
     * @param item
     */
    customLabel?: (item: T) => string;

    /**
     * Function to call when the search term changes
     * This function should accept the new search term
     *
     * Usage:
     * onSearchChange={(searchTerm) => console.log(searchTerm)}
     * @param searchTerm
     */
    onSearchChange?: (searchTerm: string) => void;
}

const GenericDataSelector = <T extends Resource>({
    id,
    data,
    fetchData,
    setSelectedData,
    placeholder = 'Select...',
    selectedDataId,
    renderItem,
    initialSearch,
    labelKey = 'name' as keyof T, // Default to 'name' but can be overridden
    buttonClassName,
    popoverContentClassName,
    nullable,
    customLabel,
    customSearchPlaceholder,
    onSearchChange,
}: GenericDataSelectorProps<T>) => {
    const { t } = useLaravelReactI18n();
    const [searchTerm, setSearchTerm] = useState(initialSearch ?? '');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [fetchedData, setFetchedData] = useState<T[]>([]);
    const [openPopover, setOpenPopover] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (fetchData && !data) {
            const fetch = async () => {
                setIsFetching(true);
                const response = await fetchData({ search: debouncedSearchTerm });
                setFetchedData(response);
                setIsFetching(false);
            };
            void fetch();
        }
    }, [debouncedSearchTerm, fetchData, data]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (onSearchChange) {
            onSearchChange(e.target.value);
        }
    };

    const handleSelectItem = (id: number) => {
        setSelectedData(id);
        setOpenPopover(false);
    };

    const handleClearItem = () => {
        setSelectedData(null);
        setOpenPopover(false);
    };

    const getLabel = (item: T): string => {
        if (customLabel) {
            return customLabel(item);
        }
        const value = item[labelKey];
        return typeof value === 'string' ? value : t('components.generic_data_selector.fields.select_placeholder');
    };

    const items = data ?? fetchedData;

    return (
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild id={id} className="w-">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPopover}
                    className={cn('w-40 justify-between', buttonClassName)}
                >
                    {selectedDataId
                        ? items.find(item => item.id === selectedDataId)
                            ? getLabel(items.find(item => item.id === selectedDataId)!)
                            : t('components.generic_data_selector.fields.select_placeholder')
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('w-[200px] p-0', popoverContentClassName)}>
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder={
                            customSearchPlaceholder ?? t('components.generic_data_selector.fields.search_placeholder')
                        }
                        value={searchTerm}
                        onInput={handleSearchChange}
                        className="border-none focus:ring-0"
                        disabled={isFetching}
                    />
                    <CommandList>
                        <CommandGroup>
                            {nullable && (
                                <CommandItem onSelect={handleClearItem}>
                                    {t('components.generic_data_selector.actions.clear_selection')}
                                </CommandItem>
                            )}
                            {isFetching && (
                                <CommandItem disabled>
                                    {t('components.generic_data_selector.actions.loading')}
                                </CommandItem>
                            )}
                            {!isFetching && items.length === 0 && (
                                <CommandItem disabled>
                                    {t('components.generic_data_selector.actions.no_results')}
                                </CommandItem>
                            )}
                            {!isFetching &&
                                items.map(item => (
                                    <CommandItem key={item.id} onSelect={() => handleSelectItem(item.id)}>
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                selectedDataId === item.id ? 'opacity-100' : 'opacity-0',
                                            )}
                                        />
                                        {renderItem(item)}
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default memo(GenericDataSelector) as typeof GenericDataSelector;
