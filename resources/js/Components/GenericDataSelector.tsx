import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/UI/command';
import { Button } from '@/Components/UI/button';
import { ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { Resource } from '@/Support/Interfaces/Resources';
import { cn } from '@/Lib/utils';

interface GenericDataSelectorProps<T extends Resource> {
    /**
     * ID for the GenericDataSelector component
     */
    id?: string;

    /**
     * Function to fetch data based on filters
     * This function should accept an object with the search term
     *
     * Usage:
     * fetchData={(filters) => fetchUsers(filters)}
     * @param filters
     */
    fetchData: (filters: { search: string }) => Promise<T[]>;

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
}

const GenericDataSelector = <T extends Resource>({
    id,
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
}: GenericDataSelectorProps<T>) => {
    const [searchTerm, setSearchTerm] = useState(initialSearch ?? '');
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce the search input
    const [data, setData] = useState<T[]>([]);
    const [openPopover, setOpenPopover] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        // Fetch data when search term changes
        const fetch = async () => {
            setIsFetching(true);
            const response = await fetchData({ search: debouncedSearchTerm });
            setData(response);
            setIsFetching(false);
        };
        void fetch();
    }, [debouncedSearchTerm, fetchData]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectItem = (id: number) => {
        setSelectedData(id);
        setOpenPopover(false);
    };

    const handleClearItem = () => {
        setSelectedData(null);
        setOpenPopover(false);
    };

    // Type guard to ensure the value is a string or null
    const getLabel = (item: T): string => {
        if (customLabel) {
            return customLabel(item);
        }
        const value = item[labelKey];
        return typeof value === 'string' ? value : 'Select...';
    };

    return (
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild id={id}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPopover}
                    className={cn('w-full justify-between', buttonClassName)}
                >
                    {selectedDataId
                        ? data.find(item => item.id === selectedDataId)
                            ? getLabel(data.find(item => item.id === selectedDataId)!)
                            : 'Select...'
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('w-[200px] p-0', popoverContentClassName)}>
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder="Search..."
                        value={searchTerm}
                        onInput={handleSearchChange}
                        className="border-none focus:ring-0"
                        disabled={isFetching}
                    />
                    <CommandList>
                        <CommandGroup>
                            {nullable && <CommandItem onSelect={handleClearItem}>- Clear Selection -</CommandItem>}
                            {isFetching && <CommandItem disabled>Loading...</CommandItem>}
                            {!isFetching && data.length === 0 && <CommandItem disabled>No results found</CommandItem>}
                            {!isFetching &&
                                data.map(item => (
                                    <CommandItem key={item.id} onSelect={() => handleSelectItem(item.id)}>
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
