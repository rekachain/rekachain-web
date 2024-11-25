import { Button, buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { RawMaterialResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function RawMaterialCardView({
    rawMaterialResponse,
    handleRawMaterialDeletion,
}: {
    rawMaterialResponse: PaginateResponse<RawMaterialResource>;
    handleRawMaterialDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <div>
            {rawMaterialResponse?.data.map(rawMaterial => (
                <AnimateIn
                    to="opacity-100 translate-y-0 translate-x-0 mt-3"
                    key={rawMaterial.id}
                    from="opacity-0 -translate-y-4"
                    duration={300}
                >
                    <div
                        // key={permission.id}
                        className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2"
                    >
                        <div className="flex w-full justify-between items-scenter">
                            <h4 className="font-bold text-base">{rawMaterial.material_code}</h4>
                            <h5 className="font-bold text-base items-center ">Unit : {rawMaterial.unit}</h5>
                        </div>
                        {/* <h4 className="font-bold text-xl">{permission.group}</h4> */}
                        {/* <h4 className="font-bold text-xl">50349259</h4> */}
                        {/* <h4 className="text-md">{permission.name}</h4> */}
                        <h4 className="text-sm w-[80%]">{rawMaterial.description}</h4>
                        <div className="flex items-center justify-end w-full">
                            <Link
                                href={route(`${ROUTES.RAW_MATERIALS}.edit`, rawMaterial.id)}
                                className={buttonVariants({ variant: 'link' })}
                            >
                                {t('action.edit')}
                            </Link>
                            {rawMaterial.can_be_deleted && (
                                <Button variant="link" onClick={() => handleRawMaterialDeletion(rawMaterial.id)}>
                                    {t('action.delete')}
                                </Button>
                            )}
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </div>
    );
}
