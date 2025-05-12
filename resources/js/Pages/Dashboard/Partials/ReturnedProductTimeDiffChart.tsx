import GenericPagination from '@/Components/GenericPagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { PaginateResponse, ReturnedProductTimeDiffResource, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';

export default function ({
    data,
}: {
    data: PaginateResponse<ReturnedProductTimeDiffResource>;
}) {
    const { t, setLocale } = useLaravelReactI18n();

    const [timeDiffFilters, setTimeDiffFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 4,
    });
    const [currentTimeDiffFilter, setCurrentTimeDiffFilter] = useState(timeDiffFilters);

    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ReturnedProductTimeDiffResource>>(data);

    const handlePageChange = (page: number) => {
        setTimeDiffFilters({ ...timeDiffFilters, page });
    };
    
    const syncDatas = withLoading(async () => {
        if (data === progressResponse && currentTimeDiffFilter === timeDiffFilters) return;
        setCurrentTimeDiffFilter(timeDiffFilters);
        await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                intent: IntentEnum.WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_DIFFERENCE,
                ...timeDiffFilters,
            })
        ).then((res) => {
            setProgressResponse(res.data);
        });
    });

    useEffect(() => {
        syncDatas();
    }, [timeDiffFilters, setLocale]);

    return (
        <div className='mt-5 w-full'>
            {progressResponse && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                {t('pages.dashboard.partials.returned_product_time_diff_chart.headers.year_month')}
                            </TableHead>
                            <TableHead>
                                {t('pages.dashboard.partials.returned_product_time_diff_chart.headers.avg_duration')}
                            </TableHead>
                            <TableHead>
                                {t('pages.dashboard.partials.returned_product_time_diff_chart.headers.total_returned')}
                            </TableHead>
                            <TableHead>
                                {t('pages.dashboard.partials.returned_product_time_diff_chart.headers.total_problem')}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {progressResponse.data.map((data) => (
                            <TableRow key={data.year_month}>
                                <TableCell>{data.year_month}</TableCell>
                                <TableCell>{data.avg_duration}</TableCell>
                                <TableCell>{data.total_returned}</TableCell>
                                <TableCell>{data.total_problem}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <GenericPagination meta={progressResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
