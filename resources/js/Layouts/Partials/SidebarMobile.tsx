import {
    RiArtboard2Fill,
    RiBox3Line,
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
import { SidebarLinkCollapsible, SidebarLinkCollapsibleItem } from './Components/SidebarLinkCollapsible';
import SidebarLogout from './Components/SidebarLogout';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect, useRef } from 'react';
import { STYLING } from '@/Support/Constants/styling';
import { Link } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/UI/sheet';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/UI/accordion';
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
        <aside ref={sidebarRef} className="sidebar w-20 border-border border-r-2 transition-all z">
            <nav className="flex flex-col space-y-1">
                <div className="header flex px-4 py-3 border-b-2 h-16 ">
                    <Sheet>
                        <SheetTrigger>
                            <Button
                                variant="default"
                                size="icon"
                                className="sidebar-collapse-toggle-mobile w-full h-10  bg-transparent hover:bg-transparent"
                                onClick={handleSidebarCollapse}
                            >
                                <img src="/assets/images/icon.png" alt="logo" width={50} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={'left'} className="w-[250px] sm:w-[540px] h-screen ">
                            <ScrollArea className="h-full w-[220px] ">
                                {' '}
                                <SheetHeader>
                                    <SheetTitle className="mx-auto">
                                        <img src="/assets/images/icon.png" alt="logo" width={50} />
                                    </SheetTitle>
                                    <SheetDescription className="items-start w-full  flex flex-col gap-7 dark:text-white text-black">
                                        <Link href={'dashboard'} className="mt-5">
                                            <div className="flex items-center gap-2">
                                                <RiHome8Line size={35} />
                                                <p className="text-base">Dashboard</p>
                                            </div>
                                        </Link>
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger>
                                                    <div className="flex items-center gap-2">
                                                        <RiUser2Line size={35} />
                                                        <p className="text-base">Manajemen Staff</p>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="items-start pl-10 flex flex-col gap-7">
                                                    {checkPermission(PERMISSION_ENUM.DIVISION_READ) && (
                                                        <Link
                                                            className="flex items-center gap-2"
                                                            href={route(`${ROUTES.DIVISIONS}.index`)}
                                                        >
                                                            <RiDivideLine size={STYLING.ICON.SIZE.SMALL} />
                                                            <p className="text-base">Divisi</p>
                                                        </Link>
                                                    )}

                                                    {checkPermission(PERMISSION_ENUM.WORKSHOP_READ) && (
                                                        <Link
                                                            className="flex items-center gap-2"
                                                            href={route(`${ROUTES.WORKSHOPS}.index`)}
                                                        >
                                                            <RiHome2Line size={STYLING.ICON.SIZE.SMALL} />
                                                            <p className="text-base">Workshop</p>
                                                        </Link>
                                                    )}

                                                    {checkPermission(PERMISSION_ENUM.WORKSTATION_READ) && (
                                                        <Link
                                                            className="flex items-center gap-2"
                                                            href={route(`${ROUTES.WORKSTATIONS}.index`)}
                                                        >
                                                            <RiToolsFill size={STYLING.ICON.SIZE.SMALL} />
                                                            <p className="text-base">Workstation</p>
                                                        </Link>
                                                    )}

                                                    {checkPermission(PERMISSION_ENUM.USER_READ) && (
                                                        <Link
                                                            className="flex items-center gap-2"
                                                            href={route(`${ROUTES.USERS}.index`)}
                                                        >
                                                            <RiUserLine size={STYLING.ICON.SIZE.SMALL} />
                                                            <p className="text-base">Staff</p>
                                                        </Link>
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger>
                                                    <div className="flex items-center gap-2">
                                                        <RiBox3Line size={35} />
                                                        <p className="text-base">Hak Akses</p>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="items-start pl-10 flex flex-col gap-7">
                                                    <Link
                                                        className="flex items-center gap-2"
                                                        href={route(`${ROUTES.PERMISSIONS}.index`)}
                                                    >
                                                        <RiLockUnlockFill size={25} />
                                                        <p className="text-base">Permissions</p>
                                                    </Link>
                                                    <Link
                                                        className="flex items-center gap-2"
                                                        href={route(`${ROUTES.ROLES}.index`)}
                                                    >
                                                        <RiShieldLine className="mt-2" size={25} />
                                                        <p className="text-base">Roles</p>
                                                    </Link>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        <hr className="border-gray-700 border-2 w-full" />

                                        {checkPermission(PERMISSION_ENUM.STEP_READ) && (
                                            <Link
                                                className="flex items-center gap-2"
                                                href={route(`${ROUTES.STEPS}.index`)}
                                            >
                                                <RiExpandRightLine size={35} />
                                                <p className="text-base">List Step</p>
                                            </Link>
                                        )}

                                        {checkPermission(PERMISSION_ENUM.RAW_MATERIAL_READ) && (
                                            <Link
                                                className="flex items-center gap-2"
                                                href={route(`${ROUTES.RAW_MATERIALS}.index`)}
                                            >
                                                <RiInstanceLine size={35} />
                                                <p className="text-base">List Material</p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.COMPONENT_READ) && (
                                            <Link
                                                className="flex items-center gap-2"
                                                href={route(`${ROUTES.COMPONENTS}.index`)}
                                            >
                                                <RiStackLine size={35} />
                                                <p className="text-base">List Component</p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.PANEL_READ) && (
                                            <Link
                                                className="flex items-center gap-2"
                                                href={route(`${ROUTES.PANELS}.index`)}
                                            >
                                                <RiArtboard2Fill size={35} />
                                                <p className="text-base">List Panel</p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.PROJECT_READ) && (
                                            <Link
                                                className="flex items-center gap-2"
                                                href={route(`${ROUTES.PROJECTS}.index`)}
                                            >
                                                <RiBox3Line size={35} />
                                                <p className="text-base">List Proyek</p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.CARRIAGE_READ) && (
                                            <Link
                                                className="flex items-center gap-2"
                                                href={route(`${ROUTES.CARRIAGES}.index`)}
                                            >
                                                <RiCaravanLine size={35} />
                                                <p className="text-base">List Gerbong</p>
                                            </Link>
                                        )}

                                        <div className="flex flex-col h-44 justify-end gap-y-6 ">
                                            <Link
                                                className="flex items-center gap-2 m "
                                                href={route(`${ROUTES.PROFILE}.edit`)}
                                            >
                                                <RiSettings3Line size={35} />
                                                <p className="text-base">Pengaturan</p>
                                            </Link>
                                            <Link
                                                className="flex items-center gap-2"
                                                href={route(`${ROUTES.PROFILE}.edit`)}
                                            >
                                                <RiQuestionLine size={35} />
                                                <p className="text-base">Help Desk</p>
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
