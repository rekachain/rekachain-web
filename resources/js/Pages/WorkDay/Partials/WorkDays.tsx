import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { WorkDayResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { useConfirmation } from '@/Hooks/useConfirmation';
import { workDayService } from '@/Services/workDayService';
import { useSuccessToast } from '@/Hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';
import { WorkDayTimeEnum } from '@/Support/Enums/workDayTimeEnum';
import { withLoading } from '@/Utils/withLoading';

export default function () {
    const [workDayResponse, setWorkDayResponse] = useState<PaginateResponse<WorkDayResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        relations: 'work_day_times',
        perPage: 10,
    });

    const syncWorkDays = withLoading(async () => {
        const res = await workDayService.getAll(filters);
        setWorkDayResponse(res);
    });

    useEffect(() => {
        void syncWorkDays();
    }, [filters]);

    const handleWorkDayDeletion = withLoading(async (id: number) => {
        await workDayService.delete(id);
        await syncWorkDays();
        void useSuccessToast('WorkDay deleted successfully');
    }, true);

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Waktu Mulai</TableHead>
                        <TableHead>Waktu Istirahat</TableHead>
                        <TableHead>Waktu Selesai</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workDayResponse?.data.map(workDay => (
                        <TableRow key={workDay.id}>
                            <TableCell>{workDay.day}</TableCell>
                            <TableCell>{workDay.start_time}</TableCell>
                            <TableCell>
                                {workDay.work_day_times
                                    .filter(time => time.status === WorkDayTimeEnum.BREAK)
                                    .map(time => (
                                        <div key={time.id}>
                                            {time.start_time} - {time.end_time}
                                        </div>
                                    ))}
                            </TableCell>
                            <TableCell>{workDay.end_time}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.WORK_DAYS}.edit`, workDay.id)}
                                >
                                    Edit
                                </Link>
                                {workDay.can_be_deleted && (
                                    <Button variant="link" onClick={() => handleWorkDayDeletion(workDay.id)}>
                                        Delete
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={workDayResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
