import {
    RiArtboard2Fill,
    RiBox3Line,
    RiCalendar2Line,
    RiCaravanLine,
    RiContractLeftLine,
    RiContractRightLine,
    RiDivideLine,
    RiExpandRightLine,
    RiFlickrLine,
    RiHome2Line,
    RiHome8Line,
    RiInstanceLine,
    RiLockLine,
    RiLockUnlockFill,
    RiQuestionLine,
    RiSettings3Line,
    RiShieldLine,
    RiStackLine,
    RiToolsFill,
    RiUser2Line,
    RiUserLine,
} from '@remixicon/react';
import { Button } from '@/Components/UI/button';
import SidebarLink from './Components/SidebarLink';
import SidebarMenu from './Components/SidebarMenu';
import { ListOrdered } from 'lucide-react';
import {
    SidebarLinkCollapsible,
    SidebarLinkCollapsibleItem,
} from './Components/SidebarLinkCollapsible';
import SidebarLogout from './Components/SidebarLogout';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect, useRef } from 'react';
import { STYLING } from '@/Support/Constants/styling';
import { Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/UI/sheet';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/UI/accordion';
import { checkPermission } from '@/Helpers/sidebarHelper';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { SIDEBAR_GROUP_ENUM } from '@/Support/Enums/sidebarGroupEnum';
import { ScrollArea } from '@/Components/UI/scroll-area';

export default function SidebarMobile() {
    const [sidebarCollapse, setSidebarCollapse] = useLocalStorage('sidebarCollapse', true);

    const handleSidebarCollapse = () => {
        setSidebarCollapse(!sidebarCollapse);
    };

    const sidebarRef = useRef<HTMLDivElement>(null);

    const applySidebarCollapse = () => {
        if (sidebarCollapse) {
            sidebarRef.current?.classList.add('sidebar-collapse');
        } else {
            sidebarRef.current?.classList.remove('sidebar-collapse');
        }
    };

    useEffect(applySidebarCollapse, [sidebarCollapse]);

    return (
        <aside ref={sidebarRef} className='sidebar z w-20 border-r-2 border-border transition-all'>
            <nav className='flex flex-col space-y-1'>
                <div className='header flex h-16 border-b-2 px-4 py-3'>
                    <Sheet>
                        <SheetTrigger>
                            <Button
                                variant='default'
                                size='icon'
                                onClick={handleSidebarCollapse}
                                className='sidebar-collapse-toggle-mobile h-10 w-full bg-transparent hover:bg-transparent'
                            >
                                <img width={50} src='/assets/images/icon.png' alt='logo' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={'left'} className='h-screen w-[250px] sm:w-[540px]'>
                            <ScrollArea className='h-full w-[220px]'>
                                {' '}
                                <SheetHeader>
                                    <SheetTitle className='mx-auto'>
                                        <img width={50} src='/assets/images/icon.png' alt='logo' />
                                    </SheetTitle>
                                    <SheetDescription className='flex w-full flex-col items-start gap-7 text-black dark:text-white'>
                                        <Link href={'dashboard'} className='mt-5'>
                                            <div className='flex items-center gap-2'>
                                                <RiHome8Line size={35} />
                                                <p className='text-base'>Dashboard</p>
                                            </div>
                                        </Link>
                                        <Link
                                            href={route(`${ROUTES.WORK_DAYS}.index`)}
                                            className='mt-5'
                                        >
                                            <div className='flex items-center gap-2'>
                                                <RiCalendar2Line size={35} />
                                                <p className='text-base'>Hari Kerja</p>
                                            </div>
                                        </Link>
                                        <Accordion type='single' collapsible>
                                            <AccordionItem value='item-1'>
                                                <AccordionTrigger>
                                                    <div className='flex items-center gap-2'>
                                                        <RiUser2Line size={35} />
                                                        <p className='text-base'>Manajemen Staff</p>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className='flex flex-col items-start gap-7 pl-10'>
                                                    {checkPermission(
                                                        PERMISSION_ENUM.DIVISION_READ,
                                                    ) && (
                                                        <Link
                                                            href={route(
                                                                `${ROUTES.DIVISIONS}.index`,
                                                            )}
                                                            className='flex items-center gap-2'
                                                        >
                                                            <RiDivideLine
                                                                size={STYLING.ICON.SIZE.SMALL}
                                                            />
                                                            <p className='text-base'>Divisi</p>
                                                        </Link>
                                                    )}

                                                    {checkPermission(
                                                        PERMISSION_ENUM.WORKSHOP_READ,
                                                    ) && (
                                                        <Link
                                                            href={route(
                                                                `${ROUTES.WORKSHOPS}.index`,
                                                            )}
                                                            className='flex items-center gap-2'
                                                        >
                                                            <RiHome2Line
                                                                size={STYLING.ICON.SIZE.SMALL}
                                                            />
                                                            <p className='text-base'>Workshop</p>
                                                        </Link>
                                                    )}

                                                    {checkPermission(
                                                        PERMISSION_ENUM.WORKSTATION_READ,
                                                    ) && (
                                                        <Link
                                                            href={route(
                                                                `${ROUTES.WORKSTATIONS}.index`,
                                                            )}
                                                            className='flex items-center gap-2'
                                                        >
                                                            <RiToolsFill
                                                                size={STYLING.ICON.SIZE.SMALL}
                                                            />
                                                            <p className='text-base'>Workstation</p>
                                                        </Link>
                                                    )}

                                                    {checkPermission(PERMISSION_ENUM.USER_READ) && (
                                                        <Link
                                                            href={route(`${ROUTES.USERS}.index`)}
                                                            className='flex items-center gap-2'
                                                        >
                                                            <RiUserLine
                                                                size={STYLING.ICON.SIZE.SMALL}
                                                            />
                                                            <p className='text-base'>Staff</p>
                                                        </Link>
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        <Accordion type='single' collapsible>
                                            <AccordionItem value='item-1'>
                                                <AccordionTrigger>
                                                    <div className='flex items-center gap-2'>
                                                        <RiBox3Line size={35} />
                                                        <p className='text-base'>Hak Akses</p>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className='flex flex-col items-start gap-7 pl-10'>
                                                    <Link
                                                        href={route(`${ROUTES.PERMISSIONS}.index`)}
                                                        className='flex items-center gap-2'
                                                    >
                                                        <RiLockUnlockFill size={25} />
                                                        <p className='text-base'>Permissions</p>
                                                    </Link>
                                                    <Link
                                                        href={route(`${ROUTES.ROLES}.index`)}
                                                        className='flex items-center gap-2'
                                                    >
                                                        <RiShieldLine size={25} className='mt-2' />
                                                        <p className='text-base'>Roles</p>
                                                    </Link>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        <hr className='w-full border-2 border-gray-700' />

                                        {checkPermission(PERMISSION_ENUM.STEP_READ) && (
                                            <Link
                                                href={route(`${ROUTES.STEPS}.index`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiExpandRightLine size={35} />
                                                <p className='text-base'>List Step</p>
                                            </Link>
                                        )}

                                        {checkPermission(PERMISSION_ENUM.RAW_MATERIAL_READ) && (
                                            <Link
                                                href={route(`${ROUTES.RAW_MATERIALS}.index`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiInstanceLine size={35} />
                                                <p className='text-base'>List Material</p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.COMPONENT_READ) && (
                                            <Link
                                                href={route(`${ROUTES.COMPONENTS}.index`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiStackLine size={35} />
                                                <p className='text-base'>List Component</p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.PANEL_READ) && (
                                            <Link
                                                href={route(`${ROUTES.PANELS}.index`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiArtboard2Fill size={35} />
                                                <p className='text-base'>List Panel</p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.PROJECT_READ) && (
                                            <Link
                                                href={route(`${ROUTES.PROJECTS}.index`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiBox3Line size={35} />
                                                <p className='text-base'>List Proyek</p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.CARRIAGE_READ) && (
                                            <Link
                                                href={route(`${ROUTES.CARRIAGES}.index`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiCaravanLine size={35} />
                                                <p className='text-base'>List Gerbong</p>
                                            </Link>
                                        )}

                                        <div className='flex h-44 flex-col justify-end gap-y-6'>
                                            <Link
                                                href={route(`${ROUTES.PROFILE}.edit`)}
                                                className='m flex items-center gap-2'
                                            >
                                                <RiSettings3Line size={35} />
                                                <p className='text-base'>Pengaturan</p>
                                            </Link>
                                            <Link
                                                href={route(`${ROUTES.PROFILE}.edit`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiQuestionLine size={35} />
                                                <p className='text-base'>Help Desk</p>
                                            </Link>
                                            <SidebarLogout />
                                        </div>
                                    </SheetDescription>
                                </SheetHeader>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </aside>
    );
}
