import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { StepResource } from '@/Support/Interfaces/Resources';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { stepService } from '@/Services/stepService';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';

export default function () {
    const [stepResponse, setStepResponse] = useState<PaginateResponse<StepResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const handleSyncSteps = withLoading(async () => {
        const res = await stepService.getAll(filters);
        setStepResponse(res);
    });

    useEffect(() => {
        void handleSyncSteps();
    }, [filters]);

    const handleStepDeletion = withLoading(async (id: number) => {
        await stepService.delete(id);
        await handleSyncSteps();
        void useSuccessToast('Step deleted successfully');
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
                        <TableHead>Proses</TableHead>
                        <TableHead>Estimasi Manufaktur</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stepResponse?.data.map(step => (
                        <TableRow key={step.id}>
                            <TableCell>{step.name}</TableCell>
                            <TableCell>{step.process}</TableCell>
                            <TableCell>{step.estimated_time}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.STEPS}.edit`, step.id)}
                                >
                                    Edit
                                </Link>
                                {step.can_be_deleted && (
                                    <Button variant="link" onClick={() => handleStepDeletion(step.id)}>
                                        Delete
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={stepResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
