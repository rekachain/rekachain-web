import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { RawMaterialResource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';
import GenericPagination from '@/Components/GenericPagination';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';
import { useConfirmation } from '@/hooks/useConfirmation';
import { rawMaterialService } from '@/services/rawMaterialService';

export default function () {
    const [rawMaterialResponse, setRawMaterialResponse] = useState<PaginateResponse<RawMaterialResource>>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        perPage: 10,
    });

    const syncRawMaterials = async () => {
        rawMaterialService.getAll(filters).then(res => {
            setRawMaterialResponse(res);
        });
    };

    useEffect(() => {
        syncRawMaterials();
    }, [filters]);

    const handleRawMaterialDeletion = (id: number) => {
        const isConfirmed = useConfirmation().then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'Raw Material deleted successfully',
                });
                await rawMaterialService.delete(id);
                await syncRawMaterials();
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
                        <TableHead>Kode Material</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Spesifikasi</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rawMaterialResponse?.data.map(rawMaterial => (
                        <TableRow key={rawMaterial.id}>
                            <TableCell>{rawMaterial.material_code}</TableCell>
                            <TableCell>{rawMaterial.description}</TableCell>
                            <TableCell>{rawMaterial.specs}</TableCell>
                            <TableCell>{rawMaterial.unit}</TableCell>
                            <TableCell>
                                <Link
                                    className={buttonVariants({ variant: 'link' })}
                                    href={route(`${ROUTES.RAW_MATERIALS}.edit`, rawMaterial.id)}
                                >
                                    Edit
                                </Link>
                                <Button variant="link" onClick={() => handleRawMaterialDeletion(rawMaterial.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GenericPagination meta={rawMaterialResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
