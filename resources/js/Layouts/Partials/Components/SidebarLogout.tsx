import { Link } from '@inertiajs/react';
import { RiLogoutBoxRLine } from '@remixicon/react';
import { buttonVariants } from '@/Components/ui/button';
import { ROUTES } from '@/support/constants/routes';

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
    const linkClass = `${buttonVariants({ variant: 'sidebar' })} w-full`;
    return (
        <div className="sidebar-item px-4">
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
                <AlertDialogTrigger>
                    <div className={linkClass}>
                        <RiLogoutBoxRLine size="20" />
                        <span className="sidebar-item-text ml-2">Logout</span>
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
