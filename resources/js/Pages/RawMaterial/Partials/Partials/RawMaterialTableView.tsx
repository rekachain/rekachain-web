import { Button, buttonVariants } from '@/Components/UI/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { RawMaterialResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function RawMaterialTableView({
    rawMaterialResponse,
    handleRawMaterialDeletion,
}: {
    rawMaterialResponse: PaginateResponse<RawMaterialResource>;
    handleRawMaterialDeletion: (id: number) => void;
}) {
    return (
        <div>
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
        </div>
    );
}
