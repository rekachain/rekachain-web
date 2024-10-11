import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/UI/command';
import { Button } from '@/Components/UI/button';
import { ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/popover';
import { Resource } from '@/Support/Interfaces/Resources';
import { cn } from '@/Lib/utils';

interface GenericDataSelectorProps<T extends Resource> {
    id?: string; // ID for the input element
    fetchData: (filters: { search: string }) => Promise<T[]>; // Function to fetch data based on filters
    setSelectedData: (id: number | null) => void; // Callback to set selected data in the parent component
    placeholder?: string; // Placeholder text for search input
    selectedDataId?: number | null; // ID of the currently selected data
    renderItem: (item: T) => string; // Function to render an item for display
    initialSearch?: string; // Initial search term, useful for pre-populating the search input, e.g. when editing
    labelKey?: keyof T; // Dynamic label key for the entity (e.g., 'name', 'location', 'username')
    buttonClassName?: string; // Optional class name for the button
    popoverContentClassName?: string; // Optional class name for the popover content
    nullable?: boolean; // Whether the selector can be cleared
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
