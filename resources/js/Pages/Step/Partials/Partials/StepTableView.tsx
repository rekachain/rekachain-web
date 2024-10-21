import { PaginateResponse } from '@/Support/Interfaces/Others';
import { StepResource } from '@/Support/Interfaces/Resources';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
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
                        <TableHead>{t('pages.steps.index.partials.steps.partials.steps_table.headers.name')}</TableHead>
                        <TableHead>
                            {t('pages.steps.index.partials.steps.partials.steps_table.headers.process')}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.steps.index.partials.steps.partials.steps_table.headers.estimated_manufacturing_time',
                            )}
                        </TableHead>
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
                                    {t('action.edit')}
                                </Link>
                                {step.can_be_deleted && (
                                    <Button variant="link" onClick={() => handleStepDeletion(step.id)}>
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
