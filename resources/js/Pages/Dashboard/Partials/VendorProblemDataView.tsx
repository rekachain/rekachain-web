import GenericPagination from '@/Components/GenericPagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { VendorProblemResource, PaginateResponse, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';

export default function ({
    data,
}: {
    data: PaginateResponse<VendorProblemResource>;
}) {
    const { t, setLocale } = useLaravelReactI18n();

    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 4,
        // orderBy: 'component_id',
    });
    const [currentFilter, setCurrentFilter] = useState(filters);

    const [progressResponse, setProgressResponse] = useState<PaginateResponse<VendorProblemResource>>();

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };
    
    const syncDatas = withLoading(async () => {
        if (data === progressResponse && currentFilter === filters) return;
        setCurrentFilter(filters);
        await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                intent: IntentEnum.WEB_DASHBOARD_GET_VENDOR_PROBLEM_COMPONENTS,
                ...filters,
            })
        ).then((res) => {
            console.log(res.data);
            setProgressResponse(res.data);
        });
    });

    useEffect(() => {
        syncDatas();
    }, [filters, setLocale]);

    return (
        <div className='mt-5 w-full'>
            {progressResponse && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                {t('pages.dashboard.partials.vendor_problem_data_view.headers.vendor_name')}
                            </TableHead>
                            <TableHead>
                                {t('pages.dashboard.partials.vendor_problem_data_view.headers.total_sent')}
                            </TableHead>
                            <TableHead>
                                {t('pages.dashboard.partials.vendor_problem_data_view.headers.total_problem')}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {progressResponse.data.map((data, index) => (
                            <TableRow key={`${index}_${data.vendor_name}`}>
                                <TableCell className='max-w-[150px]'>{data.vendor_name}</TableCell>
                                <TableCell>{data.total_sent}</TableCell>
                                <TableCell>{data.total_problem} ({data.problem_percent}%)</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <GenericPagination meta={progressResponse?.meta} handleChangePage={handlePageChange} isCompact/>
        </div>
    );
}
