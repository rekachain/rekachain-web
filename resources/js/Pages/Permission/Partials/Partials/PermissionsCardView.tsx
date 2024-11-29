import AnimateIn from '@/Lib/AnimateIn';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import { PermissionResource } from '@/Support/Interfaces/Resources';

export default function PermissionsCardView({
    permissionResponse,
    handlePermissionDeletion,
}: {
    permissionResponse: PaginateResponse<PermissionResource>;
    handlePermissionDeletion: (id: number) => void;
}) {
    return (
        <>
            {permissionResponse?.data.map((permission) => (
                <AnimateIn
                    to='opacity-100 translate-y-0 translate-x-0 mt-3'
                    key={permission.id}
                    from='opacity-0 -translate-y-4'
                    duration={300}
                >
                    <div className='flex flex-col gap-2 rounded-md border-2 border-black p-2 dark:border-white'>
                        <div className='flex w-full items-center justify-between'>
                            <div className='text-center'>
                                {/* <h5 className="font-bold text-xs items-center "> {division.role?.name}</h5> */}
                            </div>
                        </div>
                        <h4 className='text-xl font-bold'>{permission.group}</h4>
                        <h4 className='text-md'>{permission.name}</h4>
                        <div className='flex w-full items-center justify-end'>
                            {/* <Link
                                href=""
                                // className={buttonVariants({ variant: 'link' })}
                                // href={route(`${ROUTES.DIVISIONS}.edit`, division.id)}
                            >
                                Edit
                            </Link>
                            <Button variant="link">Delete</Button> */}
                        </div>
                    </div>
                </AnimateIn>
            ))}
        </>
    );
}
