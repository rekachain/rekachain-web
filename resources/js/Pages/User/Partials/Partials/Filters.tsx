import GenericFilters from '@/Components/GenericFilters';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { memo } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/select';
import { ServiceFilterTrashedType } from '@/Support/Interfaces/Types';

const Filters = ({
    setFilters,
    filters,
}: {
    filters: ServiceFilterOptions;
    setFilters: (filters: ServiceFilterOptions) => void;
}) => {
    return (
        <GenericFilters setFilters={setFilters} filters={filters}>
            <Select
                onValueChange={value =>
                    setFilters((prevValue: ServiceFilterOptions) => {
                        const newFilters = { ...prevValue };
                        if (value === 'null') {
                            delete newFilters.trashed;
                        } else {
                            newFilters.trashed = value as ServiceFilterTrashedType;
                        }
                        return newFilters;
                    })
                }
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Worker Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Worker Status</SelectLabel>
                        <SelectItem value="null">Active</SelectItem>
                        <SelectItem value="with">All</SelectItem>
                        <SelectItem value="only">Terminated</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </GenericFilters>
    );
};

export default memo(Filters);
