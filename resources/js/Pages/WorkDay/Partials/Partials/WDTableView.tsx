import { PaginateResponse } from '@/Support/Interfaces/Others';
import { WorkDayResource } from '@/Support/Interfaces/Resources';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import { WorkDayTimeEnum } from '@/Support/Enums/workDayTimeEnum';

export default function WDTableView({
    workDayResponse,
    handleWorkDayDeletion,
}: {
    workDayResponse: PaginateResponse<WorkDayResource>;
    handleWorkDayDeletion: (id: number) => void;
}) {
    return (
        <div>
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
        </div>
    );
}
