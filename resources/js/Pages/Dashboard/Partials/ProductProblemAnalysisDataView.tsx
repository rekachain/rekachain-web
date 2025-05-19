import GenericPagination from '@/Components/GenericPagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { productProblemAnalysisService } from '@/Services/productProblemAnalysisService';
import { PaginateResponse, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { ProductProblemAnalysisResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';

export default function () {
    const { t } = useLaravelReactI18n();

    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const [problemAnalysisResponse, setProblemAnalysisResponse] =
        useState<PaginateResponse<ProductProblemAnalysisResource>>();

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    const syncDatas = withLoading(async () => {
        await productProblemAnalysisService.getAll(filters).then(setProblemAnalysisResponse);
    });

    useEffect(() => {
        syncDatas();
    }, [filters]);

    return (
        <div className='mt-5 w-full'>
            {problemAnalysisResponse && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                {t(
                                    'pages.dashboard.partials.product_problem_analysis_data_view.headers.date_range',
                                )}
                            </TableHead>
                            <TableHead>
                                {t(
                                    'pages.dashboard.partials.product_problem_analysis_data_view.headers.component_name',
                                )}
                            </TableHead>
                            <TableHead>
                                {t(
                                    'pages.dashboard.partials.product_problem_analysis_data_view.headers.summary',
                                )}
                            </TableHead>
                            <TableHead>
                                {t(
                                    'pages.dashboard.partials.product_problem_analysis_data_view.headers.cause',
                                )}
                            </TableHead>
                            <TableHead>
                                {t(
                                    'pages.dashboard.partials.product_problem_analysis_data_view.headers.solution',
                                )}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {problemAnalysisResponse.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className='text-center'>
                                    {t(
                                        'pages.dashboard.partials.product_problem_analysis_data_view.no_data',
                                    )}
                                </TableCell>
                            </TableRow>
                        ) || problemAnalysisResponse.data.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.date_range}</TableCell>
                                <TableCell>{data.component_name}</TableCell>
                                <TableCell>{data.summary}</TableCell>
                                <TableCell>{data.cause}</TableCell>
                                <TableCell>{data.solution}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <GenericPagination
                meta={problemAnalysisResponse?.meta}
                handleChangePage={handlePageChange}
            />
        </div>
    );
}
