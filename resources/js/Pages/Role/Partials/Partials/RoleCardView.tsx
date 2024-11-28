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
            {roleResponse?.data.map((role) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0'
                    key={role.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='mt-5 flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='flex w-full items-center justify-between'>
                            <h4 className='text-lg font-bold'>{role.name}</h4>
                            <div className='text-center'>
                                <h5 className='items-center text-base font-bold'>
                                    {t('pages.role.partials.partials.role_card.headers.division', {
                                        division: role?.division?.name ?? '',
                                    })}
                                </h5>
                            </div>
                        </div>
                        <h4 className='text-base'>
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
                        <div className='flex w-full items-center justify-end'>
                            <Link
                                href={route(`${ROUTES.ROLES}.edit`, role.id)}
                                className={buttonVariants({ variant: 'link' })}
                            >
                                {t('action.edit')}
                            </Link>
                            <Button variant='link' onClick={() => handleRoleDeletion(role.id)}>
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
