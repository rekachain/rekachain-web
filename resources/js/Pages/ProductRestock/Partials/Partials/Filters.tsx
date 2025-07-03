import GenericFilters from '@/Components/GenericFilters';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/select';
import { ProductRestockStatusEnum } from '@/Support/Enums/productRestockStatusEnum';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { memo } from 'react';

const Filters = ({
    setFilters,
    filters,
    localizedProductRestockStatuses,
}: {
    filters: ServiceFilterOptions;
    setFilters: (filters: ServiceFilterOptions) => void;
    localizedProductRestockStatuses: Record<string, string>;
}) => {
    const { t } = useLaravelReactI18n();

    return (
        <GenericFilters setFilters={setFilters} filters={filters}>
            {localizedProductRestockStatuses && (
                <Select
                    onValueChange={(value) =>
                        setFilters((prevValue: ServiceFilterOptions) => {
                            const newFilters = { ...prevValue };
                            if (value === 'all') {
                                delete newFilters.column_filters?.status;
                            } else {
                                if (!newFilters.column_filters) {
                                    newFilters.column_filters = {};
                                }
                                newFilters.column_filters.status =
                                    value as ProductRestockStatusEnum;
                            }
                            return newFilters;
                        })
                    }
                >
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue
                            placeholder={t(
                                'pages.product_restock.partials.partials.filters.status.title',
                            )}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>
                                {t('pages.product_restock.partials.partials.filters.status.title')}
                            </SelectLabel>
                            <SelectItem value='all'>
                                {t('pages.product_restock.partials.partials.filters.status.all')}
                            </SelectItem>
                            {Object.entries(localizedProductRestockStatuses).map(
                                ([key, status]) => (
                                    <SelectItem value={key} key={key}>
                                        {status}
                                    </SelectItem>
                                ),
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        </GenericFilters>
    );
};

export default memo(Filters);
