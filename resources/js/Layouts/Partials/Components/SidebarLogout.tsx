import { buttonVariants } from '@/Components/UI/button';
import { ROUTES } from '@/Support/Constants/routes';
import { Link } from '@inertiajs/react';
import { RiLogoutBoxRLine } from '@remixicon/react';

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
} from '@/Components/UI/alert-dialog';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function () {
    const { t } = useLaravelReactI18n();
    const linkClass = `${buttonVariants({ variant: 'sidebar' })} w-full pr-52 md:mr-0 `;
    return (
        <div className='md:px-4'>
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
                <AlertDialogTrigger className='w-full md:w-fit'>
                    {/* <div className={linkClass}>
                        <RiLogoutBoxRLine size="30" className="block md:hidden" />
                        <RiLogoutBoxRLine size="20" className="hidden md:block" />
                        <span className="sidebar-item-text ml-2  md:mr-0">Logout</span>
                    </div> */}
                    <div className='hidden md:block'>
                        <div className={linkClass}>
                            <RiLogoutBoxRLine size='20' className='' />
                            <span className='sidebar-item-text ml-2 md:mr-0'>
                                {t('components.sidebar_logout.buttons.logout')}
                            </span>
                        </div>
                    </div>
                    <div className='flex items-center md:hidden'>
                        <RiLogoutBoxRLine size='32' className='' />
                        <span className='ml-3 text-base md:mr-0'>
                            {t('components.sidebar_logout.buttons.logout')}
                        </span>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('components.sidebar_logout.title')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('components.sidebar_logout.description')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            {t('components.sidebar_logout.buttons.back')}
                        </AlertDialogCancel>

                        <Link method='post' href={route(ROUTES.LOGOUT)} as='button'>
                            <AlertDialogAction>
                                {t('components.sidebar_logout.buttons.logout')}
                            </AlertDialogAction>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
