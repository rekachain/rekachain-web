import { ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { ReactNode, useEffect } from 'react';
import { useDebounce, useIsFirstRender } from '@uidotdev/usehooks';
import { useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/select';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { RiCloseLine, RiSearchLine } from '@remixicon/react';
import { STYLING } from '@/Support/Constants/styling';

interface GenericFiltersProps {
    filters: ServiceFilterOptions;
    setFilters: (filters: ServiceFilterOptions) => void;
    children?: ReactNode;
}

export default function GenericFilters({ filters, setFilters, children }: GenericFiltersProps) {
    const { t } = useLaravelReactI18n();
    const isFirstRender = useIsFirstRender();
    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.page_size || 10,
    });

    const debouncedSearch = useDebounce(data.search, 500);

    useEffect(() => {
        if (isFirstRender) return;
        setFilters({
            ...filters,
            search: debouncedSearch,
            page_size: data.perPage,
        });
    }, [debouncedSearch, data.perPage]);

    return (
        <div className="flex items-center gap-4 rounded bg-background-2 p-3">
            <div className="form-control relative w-fit">
                <Input
                    value={data.search}
                    type="text"
                    placeholder={t('components.generic_filters.fields.search_placeholder')}
                    onChange={e => setData('search', e.target.value)}
                />
                {data?.search?.length > 0 ? (
                    <span
                        onClick={() => setData('search', '')}
                        className="absolute inset-y-0 right-4 inline-flex items-center transition-all hover:text-red-500"
                    >
                        <RiCloseLine size={STYLING.ICON.SIZE.SMALL} />
                    </span>
                ) : (
                    <span className="absolute inset-y-0 right-4 inline-flex items-center transition-all hover:text-blue-500">
                        <RiSearchLine size={STYLING.ICON.SIZE.SMALL} />
                    </span>
                )}
            </div>

            <Select
                onValueChange={value => {
                    setData('perPage', +value);
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('components.generic_filters.fields.pagination_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{t('components.generic_filters.fields.pagination_placeholder')}</SelectLabel>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="200">200</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                        <SelectItem value="1000">1000</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            {children}
        </div>
    );
}
