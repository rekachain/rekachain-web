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
import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { ServiceFilterTrashedType } from '@/Support/Interfaces/Types';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { memo } from 'react';

const Filters = ({
    setFilters,
    filters,
}: {
    filters: ServiceFilterOptions;
    setFilters: (filters: ServiceFilterOptions) => void;
}) => {
    const { t } = useLaravelReactI18n();

    return (
        <GenericFilters setFilters={setFilters} filters={filters}>
            <Select
                onValueChange={(value) =>
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
                <SelectTrigger className='w-[180px]'>
                    <SelectValue
                        placeholder={t('pages.user.partials.partials.filters.worker_status.title')}
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>
                            {t('pages.user.partials.partials.filters.worker_status.title')}
                        </SelectLabel>
                        <SelectItem value='null'>
                            {t('pages.user.partials.partials.filters.worker_status.fields.active')}
                        </SelectItem>
                        <SelectItem value='with'>
                            {t('pages.user.partials.partials.filters.worker_status.fields.all')}
                        </SelectItem>
                        <SelectItem value='only'>
                            {t(
                                'pages.user.partials.partials.filters.worker_status.fields.inactive',
                            )}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </GenericFilters>
    );
};

export default memo(Filters);
