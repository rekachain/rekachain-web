import { Button, buttonVariants } from '@/Components/UI/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { checkPermission } from '@/Helpers/sidebarHelper';
import { ROUTES } from '@/Support/Constants/routes';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ComponentResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ComponentTableView({
    componentResponse,
    handleComponentDeletion,
}: {
    componentResponse: PaginateResponse<ComponentResource>;

    handleComponentDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t('pages.component.partials.partials.component_table.headers.name')}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.component.partials.partials.component_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.component.partials.partials.component_table.headers.progress',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {componentResponse?.data.map((component) => (
                        <TableRow key={component.id}>
                            <TableCell>{component.name}</TableCell>
                            <TableCell>{component.description}</TableCell>
                            <TableCell>{component.progress?.name}</TableCell>
                            <TableCell>
                                {checkPermission(PERMISSION_ENUM.COMPONENT_UPDATE) && (
                                    <Link
                                    href={route(`${ROUTES.COMPONENTS}.edit`, component.id)}
                                    className={buttonVariants({ variant: 'link' })}
                                    >
                                    {t('action.edit')}
                                </Link>
                                )}
                                {checkPermission(PERMISSION_ENUM.COMPONENT_DELETE) && component.can_be_deleted && (
                                    <Button
                                        variant='link'
                                        onClick={() => handleComponentDeletion(component.id)}
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
