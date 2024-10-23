import { PaginateResponse } from '@/Support/Interfaces/Others';
import { StepResource } from '@/Support/Interfaces/Resources';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';

export default function StepTableView({
    stepResponse,
    handleStepDeletion,
    // auth,
}: {
    stepResponse: PaginateResponse<StepResource>;

    handleStepDeletion: (id: number) => void;
    // auth: any; // sementara
}) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Proses</TableHead>
                        <TableHead>Estimasi Manufaktur (Menit)</TableHead>
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
        </div>
    );
}
