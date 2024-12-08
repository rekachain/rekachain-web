import { Button, buttonVariants } from '@/Components/UI/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { WorkDayTimeEnum } from '@/Support/Enums/workDayTimeEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { WorkDayResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { checkPermission } from '@/Helpers/sidebarHelper';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';

export default function WDTableView({
    workDayResponse,
    handleWorkDayDeletion,
}: {
    workDayResponse: PaginateResponse<WorkDayResource>;
    handleWorkDayDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t('pages.work_day.partials.partials.work_day_table.headers.name')}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.work_day.partials.partials.work_day_table.headers.start_date',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.work_day.partials.partials.work_day_table.headers.break_time',
                            )}
                        </TableHead>
                        <TableHead>
                            {t('pages.work_day.partials.partials.work_day_table.headers.end_date')}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workDayResponse?.data.map((workDay) => (
                        <TableRow key={workDay.id}>
                            <TableCell>{workDay.day}</TableCell>
                            <TableCell>{workDay.start_time}</TableCell>
                            <TableCell>
                                {workDay.work_day_times
                                    .filter((time) => time.status === WorkDayTimeEnum.BREAK)
                                    .map((time) => (
                                        <div key={time.id}>
                                            {time.start_time} - {time.end_time}
                                        </div>
                                    ))}
                            </TableCell>
                            <TableCell>{workDay.end_time}</TableCell>
                            <TableCell>
                            {checkPermission(PERMISSION_ENUM.WORK_DAY_UPDATE) && (
                                <Link
                                    href={route(`${ROUTES.WORK_DAYS}.edit`, workDay.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.edit')}
                                </Link>
                            )}
                                {checkPermission(PERMISSION_ENUM.WORK_DAY_DELETE) && workDay.can_be_deleted && (
                                    <Button
                                        variant='link'
                                        onClick={() => handleWorkDayDeletion(workDay.id)}
                                    >
                                        {t('action.delete')}
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
