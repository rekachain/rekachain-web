import {
    RiArtboard2Fill,
    RiBox3Line,
    RiContractLeftLine,
    RiContractRightLine,
    RiDivideLine,
    RiFlickrLine,
    RiHome2Line,
    RiHome8Line,
    RiInstanceLine,
    RiLockLine,
    RiLockUnlockFill,
    RiQuestionLine,
    RiSettings3Line,
    RiShieldLine,
    RiToolsFill,
    RiUser2Line,
    RiUserLine,
} from '@remixicon/react';
import { Button } from '@/Components/ui/button';
import SidebarLink from './Components/SidebarLink';
import SidebarMenu from './Components/SidebarMenu';
import { ListOrdered } from 'lucide-react';
import { SidebarLinkCollapsible, SidebarLinkCollapsibleItem } from './Components/SidebarLinkCollapsible';
import SidebarLogout from './Components/SidebarLogout';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect, useRef } from 'react';
import { STYLING } from '@/support/constants/styling';
import { Link } from '@inertiajs/react';
import { ROUTES } from '@/support/constants/routes';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { checkPermission } from '@/helpers/sidebarHelper';
import { PERMISSION_ENUM } from '@/support/enums/permissionEnum';
import { SIDEBAR_GROUP_ENUM } from '@/support/enums/sidebarGroupEnum';

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
        <aside ref={sidebarRef} className="sidebar w-20 border-border border-r-2 transition-all">
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
                                <img
                                    src="/assets/images/icon.png"
                                    alt="logo"
                                    // className=" "
                                    // className="sidebar-header-logo h-full object-contain"
                                    // className="sidebar-header-logo h-full "
                                    width={50}
                                    // height={500}
                                />
                                {/* {sidebarCollapse ? (
                            <RiContractRightLine size={STYLING.ICON.SIZE.SMALL} />
                        ) : (
                            <RiContractLeftLine size={STYLING.ICON.SIZE.SMALL} />
                        )} */}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={'left'} className="w-[250px] sm:w-[540px]">
                            <SheetHeader>
                                <SheetTitle className="mx-auto">
                                    <img
                                        src="/assets/images/icon.png"
                                        alt="logo"
                                        // className=" "
                                        // className="sidebar-header-logo h-full object-contain"
                                        // className="sidebar-header-logo h-full "
                                        width={50}
                                        // height={500}
                                    />
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
                                                        {/* <RiLockUnlockFill size={25} /> */}
                                                        <p className="text-base">Divisi</p>
                                                    </Link>
                                                    // <SidebarLinkCollapsibleItem
                                                    //     group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                                    //     routeName={`${ROUTES.DIVISIONS}.index`}
                                                    //     title="Divisi"
                                                    //     icon={<RiDivideLine size={STYLING.ICON.SIZE.SMALL} />}
                                                    // />
                                                )}

                                                {checkPermission(PERMISSION_ENUM.WORKSHOP_READ) && (
                                                    <Link
                                                        className="flex items-center gap-2"
                                                        href={route(`${ROUTES.WORKSHOPS}.index`)}
                                                    >
                                                        <RiHome2Line size={STYLING.ICON.SIZE.SMALL} />
                                                        {/* <RiDivideLine size={STYLING.ICON.SIZE.SMALL} /> */}
                                                        {/* <RiLockUnlockFill size={25} /> */}
                                                        <p className="text-base">Workshop</p>
                                                    </Link>
                                                    // <SidebarLinkCollapsibleItem
                                                    //     group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                                    //     routeName={`${ROUTES.WORKSHOPS}.index`}
                                                    //     title="Workshop"
                                                    //     icon={<RiHome2Line size={STYLING.ICON.SIZE.SMALL} />}
                                                    // />
                                                )}

                                                {checkPermission(PERMISSION_ENUM.WORKSTATION_READ) && (
                                                    <Link
                                                        className="flex items-center gap-2"
                                                        href={route(`${ROUTES.WORKSTATIONS}.index`)}
                                                    >
                                                        <RiToolsFill size={STYLING.ICON.SIZE.SMALL} />
                                                        {/* <RiDivideLine size={STYLING.ICON.SIZE.SMALL} /> */}
                                                        <p className="text-base">Workstation</p>
                                                    </Link>
                                                    // <SidebarLinkCollapsibleItem
                                                    //     group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                                    //     routeName={`${ROUTES.WORKSTATIONS}.index`}
                                                    //     title="Workstation"
                                                    //     icon={<RiToolsFill size={STYLING.ICON.SIZE.SMALL} />}
                                                    // />
                                                )}

                                                {checkPermission(PERMISSION_ENUM.USER_READ) && (
                                                    <Link
                                                        className="flex items-center gap-2"
                                                        href={route(`${ROUTES.USERS}.index`)}
                                                    >
                                                        <RiUserLine size={STYLING.ICON.SIZE.SMALL} />
                                                        {/* <RiDivideLine size={STYLING.ICON.SIZE.SMALL} /> */}
                                                        <p className="text-base">Staff</p>
                                                    </Link>
                                                    // <SidebarLinkCollapsibleItem
                                                    //     group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                                    //     routeName={`${ROUTES.USERS}.index`}
                                                    //     title="Staff"
                                                    //     icon={<RiUserLine size={STYLING.ICON.SIZE.SMALL} />}
                                                    // />
                                                )}
                                                {/* <Link
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
                                                </Link> */}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    {/* <Link href={route(`${ROUTES.USERS}.index`)}>
                                        <div className="flex items-center gap-2">
                                            <RiUserLine size={35} />
                                            <p className="text-base">Manajemen Staff</p>
                                        </div>
                                    </Link> */}
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

                                    <Link
                                        className="flex items-center gap-2"
                                        href={route(`${ROUTES.RAW_MATERIALS}.index`)}
                                    >
                                        <RiInstanceLine size={35} />
                                        <p className="text-base">List Bahan Baku</p>
                                    </Link>
                                    <Link className="flex items-center gap-2" href={route(`${ROUTES.PANELS}.index`)}>
                                        <RiArtboard2Fill size={35} />
                                        <p className="text-base">List Panel</p>
                                    </Link>
                                    <Link className="flex items-center gap-2" href={route(`${ROUTES.PROJECTS}.index`)}>
                                        <RiBox3Line size={35} />
                                        <p className="text-base">List Proyek</p>
                                    </Link>

                                    {/* 
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                <div className="flex items-center gap-2">
                                                    <ListOrdered size={35} />
                                                    <p className="text-base">List Proyek</p>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="items-center flex flex-col gap-7">
                                                <Link
                                                    className="flex items-center gap-2"
                                                    href={route(`${ROUTES.PROJECTS}.index`)}
                                                >
                                                    <RiBox3Line size={30} />
                                                    <p className="text-base">List Proyek</p>
                                                </Link>
                                                <Link className="flex items-center gap-2" href={'buat-proyek'}>
                                                    <RiBox3Line size={30} />
                                                    <p className="text-base">Buat Proyek</p>
                                                </Link>
                                                <Link
                                                    className="flex items-center gap-2"
                                                    href={route(`${ROUTES.PROFILE}.edit`)}
                                                >
                                                    <RiBox3Line size={30} />
                                                    <p className="text-base">Buat Proyek</p>
                                                </Link>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion> */}
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
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </aside>
    );
}
