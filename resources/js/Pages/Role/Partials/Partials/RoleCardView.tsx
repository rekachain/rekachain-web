import { Button, buttonVariants } from '@/Components/UI/button';
import AnimateIn from '@/Lib/AnimateIn';
import { ROUTES } from '@/Support/Constants/routes';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { RoleResource } from '@/Support/Interfaces/Resources';
import { Link } from '@inertiajs/react';
import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function RoleCardView({
    roleResponse,
    handleRoleDeletion,
}: {
    roleResponse: PaginateResponse<RoleResource>;
    handleRoleDeletion: (id: number) => void;
}) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            {roleResponse?.data.map(role => (
                <AnimateIn
                    from="opacity-0 -translate-y-4"
                    to="opacity-100 translate-y-0 translate-x-0"
                    duration={300}
                    key={role.id}
                >
                    <div className="border-black dark:border-white border-2 rounded-md p-2 flex flex-col gap-2 mt-5">
                        <div className="flex w-full justify-between items-center">
                            <h4 className="font-bold text-lg">{role.name}</h4>
                            <div className="text-center">
                                <h5
                                    className="font-bold text-base
                                 items-center "
                                >
                                    {t('pages.role.partials.partials.role_card.headers.division', {
                                        division: role?.division?.name ?? '',
                                    })}
                                </h5>
                            </div>
                        </div>
                        <h4 className="text-base">
                            {t('pages.role.partials.partials.role_card.headers.level', {
                                level: role?.level ?? '',
                            })}
                        </h4>
                        <p>
                            {t('pages.role.partials.partials.role_card.headers.users_count', {
                                users_count: role?.users_count ?? 0,
                            })}
                        </p>
                        <p>
                            {t('pages.role.partials.partials.role_card.headers.permissions_count', {
                                permissions_count: role?.permissions_count ?? 0,
                            })}
                        </p>
                        <div className="flex items-center justify-end w-full">
                            <Link
                                className={buttonVariants({ variant: 'link' })}
                                href={route(`${ROUTES.ROLES}.edit`, role.id)}
                            >
                                {t('action.edit')}
                            </Link>
                            <Button variant="link" onClick={() => handleRoleDeletion(role.id)}>
                                {t('action.delete')}
                            </Button>
                        </div>
                    </div>
                    {/* </div> */}
                </AnimateIn>
            ))}
        </>
    );
}
