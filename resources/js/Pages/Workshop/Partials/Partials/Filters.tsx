import GenericFilters from '@/Components/GenericFilters';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { memo } from 'react';

const Filters = ({
    setFilters,
    filters,
}: {
    filters: ServiceFilterOptions;
    setFilters: (filters: ServiceFilterOptions) => void;
}) => {
    return <GenericFilters setFilters={setFilters} filters={filters}></GenericFilters>;
};

export default memo(Filters);