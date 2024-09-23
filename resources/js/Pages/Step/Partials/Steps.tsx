import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { StepResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { stepService } from '@/services/stepService';
import { useSuccessToast } from '@/hooks/useToast';
import { useLoading } from '@/Contexts/LoadingContext';

export default function () {
    const [stepResponse, setStepResponse] = useState<PaginateResponse<StepResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const { setLoading } = useLoading();

    const syncSteps = async () => {
        setLoading(true);
        const res = await stepService.getAll(filters);
        setStepResponse(res);
        setLoading(false);
    };

    useEffect(() => {
        syncSteps();
    }, [filters]);

    const handleStepDeletion = (id: number) => {
        useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setLoading(true);
                await stepService.delete(id);
                await syncSteps();
                useSuccessToast('Step deleted successfully');
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
