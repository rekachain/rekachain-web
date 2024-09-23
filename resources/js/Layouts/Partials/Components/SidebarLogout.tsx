import { Link } from '@inertiajs/react';
import { RiLogoutBoxRLine } from '@remixicon/react';
import { buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/Support/constants/routes';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';

export default function () {
    const linkClass = `${buttonVariants({ variant: 'sidebar' })} w-full pr-52 md:mr-0 `;
    return (
        <div className=" md:px-4 ">
            {/* <Dialog>
                <DialogTrigger>

                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Apakah anda yakin untuk Logout ?</DialogTitle>
                        <DialogDescription>
                            Dengan menekan tombol ini anda akan keluar dari website dan harus login kembali.
                        </DialogDescription>
                    </DialogHeader>
                    <Button>Logout</Button>
                </DialogContent>
            </Dialog> */}
            <AlertDialog>
                <AlertDialogTrigger className=" w-full  md:w-fit">
                    {/* <div className={linkClass}>
                        <RiLogoutBoxRLine size="30" className="block md:hidden" />
                        <RiLogoutBoxRLine size="20" className="hidden md:block" />
                        <span className="sidebar-item-text ml-2  md:mr-0">Logout</span>
                    </div> */}
                    <div className="hidden md:block">
                        <div className={linkClass}>
                            <RiLogoutBoxRLine size="20" className="" />
                            <span className="sidebar-item-text ml-2  md:mr-0">Logout</span>
                        </div>
                    </div>
                    <div className=" md:hidden flex  items-center">
                        <RiLogoutBoxRLine size="32" className="" />
                        <span className="text-base ml-3  md:mr-0">Logout</span>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah anda yakin untuk Logout ? </AlertDialogTitle>
                        <AlertDialogDescription>
                            Dengan menekan tombol ini anda akan keluar dari website dan harus login kembali.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Kembali</AlertDialogCancel>

                        <Link method="post" href={route(ROUTES.LOGOUT)} as="button">
                            <AlertDialogAction>Logout</AlertDialogAction>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
