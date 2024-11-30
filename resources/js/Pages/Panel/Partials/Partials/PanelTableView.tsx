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
import { PanelResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function PanelTableView({
    panelResponse,
    handlePanelDeletion,
}: {
    panelResponse: PaginateResponse<PanelResource>;
    handlePanelDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t('pages.panel.partials.partials.panel_table.headers.name')}
                        </TableHead>
                        <TableHead>
                            {t('pages.panel.partials.partials.panel_table.headers.description')}
                        </TableHead>
                        <TableHead>
                            {t('pages.panel.partials.partials.panel_table.headers.progress')}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {panelResponse?.data.map((panel) => (
                        <TableRow key={panel.id}>
                            <TableCell>{panel.name}</TableCell>
                            <TableCell>{panel.description}</TableCell>
                            <TableCell>{panel.progress?.name}</TableCell>
                            <TableCell>
                                <Link
                                    href={route(`${ROUTES.PANELS}.edit`, panel.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                >
                                    {t('action.edit')}
                                </Link>
                                {panel.can_be_deleted && (
                                    <Button
                                        variant='link'
                                        onClick={() => handlePanelDeletion(panel.id)}
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
