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
import RawMaterialCardView from './Partials/RawMaterialCardView';
import RawMaterialTableView from './Partials/RawMaterialTableView';

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
            {rawMaterialResponse && (
                <>
                    <div className="hidden md:block">
                        <RawMaterialTableView
                            rawMaterialResponse={rawMaterialResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleRawMaterialDeletion={handleRawMaterialDeletion}
                        ></RawMaterialTableView>
                    </div>

                    <div className="block md:hidden">
                        <RawMaterialCardView
                            rawMaterialResponse={rawMaterialResponse}
                            // handleRoleDeletion={handleRoleResourceDeletion}
                            handleRawMaterialDeletion={handleRawMaterialDeletion}
                            // auth={''}
                            // auth={auth}
                        ></RawMaterialCardView>
                        {/* <UserCardView userResponse={userResponse} handleUserDeletion={handleUserDeletion} auth={auth} /> */}
                    </div>
                </>
            )}

            <GenericPagination meta={rawMaterialResponse?.meta} handleChangePage={handlePageChange} />
        </div>
    );
}
