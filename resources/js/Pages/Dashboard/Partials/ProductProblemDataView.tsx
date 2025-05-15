import GenericPagination from '@/Components/GenericPagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { ComponentProblemResource, PaginateResponse, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { ProductProblemResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';

export default function ({
    data,
}: {
    data: PaginateResponse<ComponentProblemResource>;
}) {
    const { t, setLocale } = useLaravelReactI18n();

    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
        // orderBy: 'component_id',
    });
    const [currentFilter, setCurrentFilter] = useState(filters);

    const [progressResponse, setProgressResponse] = useState<PaginateResponse<ComponentProblemResource>>();

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };
    
    const syncDatas = withLoading(async () => {
        if (data === progressResponse && currentFilter === filters) return;
        setCurrentFilter(filters);
        await window.axios.get(
            route(`${ROUTES.DASHBOARD}`, {
                intent: IntentEnum.WEB_DASHBOARD_GET_PRODUCT_PROBLEM,
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

    return (console.log(progressResponse),
        <div className='mt-5 w-full'>
            {progressResponse && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                {t('component_name')}
                            </TableHead>
                            <TableHead>
                                {t('date_range')}
                            </TableHead>
                            <TableHead>
                                {t('notes')}
                            </TableHead>
                            <TableHead>
                                {t('total_problem')}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {progressResponse.data.map((data, index) => (
                            <TableRow key={`${index}_${data.component_name}`}>
                                <TableCell>{data.component_name}</TableCell>
                                <TableCell>{data.date_range}</TableCell>
                                <TableCell>{data.notes}</TableCell>
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
