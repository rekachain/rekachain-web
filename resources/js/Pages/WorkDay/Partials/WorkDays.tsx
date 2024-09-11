import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { WorkDayResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { workDayService } from '@/services/workDayService';
import { useSuccessToast } from '@/hooks/useToast';
import { useLoading } from '@/contexts/LoadingContext';
import { WorkDayTimeEnum } from '@/support/enums/workDayTimeEnum';

export default function () {
    const [workDayResponse, setWorkDayResponse] = useState<PaginateResponse<WorkDayResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        relations: 'work_day_times',
        perPage: 10,
    });

    const { setLoading } = useLoading();

    const syncWorkDays = async () => {
        setLoading(true);
        const res = await workDayService.getAll(filters);
        setWorkDayResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        syncWorkDays();
    }, [filters]);

    const handleWorkDayDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await workDayService.delete(id);
                await syncWorkDays();
                useSuccessToast('WorkDay deleted successfully');
                setLoading(false);
            }
        });
    };

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
