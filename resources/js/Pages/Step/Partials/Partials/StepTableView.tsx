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
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { StepResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function StepTableView({
    stepResponse,
    handleStepDeletion,
    // auth,
}: {
    stepResponse: PaginateResponse<StepResource>;

    handleStepDeletion: (id: number) => void;
    // auth: any; // sementara
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t('pages.step.partials.partials.step_table.headers.name')}
                        </TableHead>
                        <TableHead>
                            {t('pages.step.partials.partials.step_table.headers.process')}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.step.partials.partials.step_table.headers.estimated_manufacturing_time',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stepResponse?.data.map((step) => (
                        <TableRow key={step.id}>
                            <TableCell>{step.name}</TableCell>
                            <TableCell>{step.process}</TableCell>
                            <TableCell>{step.estimated_time}</TableCell>
                            <TableCell>
                                <Link
                                    href={route(`${ROUTES.STEPS}.edit`, step.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.edit')}
                                </Link>
                                {step.can_be_deleted && (
                                    <Button
                                        variant='link'
                                        onClick={() => handleStepDeletion(step.id)}
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
