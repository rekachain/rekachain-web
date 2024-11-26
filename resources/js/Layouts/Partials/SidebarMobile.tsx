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
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function SidebarMobile() {
    const { t } = useLaravelReactI18n();
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
                                onClick={handleSidebarCollapse}
                                className="sidebar-collapse-toggle-mobile w-full h-10  bg-transparent hover:bg-transparent"
                            >
                                <img width={50} src="/assets/images/icon.png" alt="logo" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={'left'} className="w-[250px] sm:w-[540px] h-screen ">
                            <ScrollArea className="h-full w-[220px] ">
                                {' '}
                                <SheetHeader>
                                    <SheetTitle className="mx-auto">
                                        <img width={50} src="/assets/images/icon.png" alt="logo" />
                                    </SheetTitle>
                                    <SheetDescription className="items-start w-full  flex flex-col gap-7 dark:text-white text-black">
                                        <Link href={'dashboard'} className="mt-5">
                                            <div className="flex items-center gap-2">
                                                <RiHome8Line size={35} />
                                                <p className="text-base">{t('components.sidebar.links.dashboard')}</p>
                                            </div>
                                        </Link>
                                        <Link href={route(`${ROUTES.WORK_DAYS}.index`)} className="mt-5">
                                            <div className="flex items-center gap-2">
                                                <RiCalendar2Line size={35} />
                                                <p className="text-base">{t('components.sidebar.links.work_days')}</p>
                                            </div>
                                        </Link>
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger>
                                                    <div className="flex items-center gap-2">
                                                        <RiUser2Line size={35} />
                                                        <p className="text-base">
                                                            {t('components.sidebar.links.staff_management')}
                                                        </p>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="items-start pl-10 flex flex-col gap-7">
                                                    {checkPermission(PERMISSION_ENUM.DIVISION_READ) && (
                                                        <Link
                                                            href={route(`${ROUTES.DIVISIONS}.index`)}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <RiDivideLine size={STYLING.ICON.SIZE.SMALL} />
                                                            <p className="text-base">
                                                                {t('components.sidebar.links.divisions')}
                                                            </p>
                                                        </Link>
                                                    )}

                                                    {checkPermission(PERMISSION_ENUM.WORKSHOP_READ) && (
                                                        <Link
                                                            href={route(`${ROUTES.WORKSHOPS}.index`)}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <RiHome2Line size={STYLING.ICON.SIZE.SMALL} />
                                                            <p className="text-base">
                                                                {t('components.sidebar.links.workshops')}
                                                            </p>
                                                        </Link>
                                                    )}

                                                    {checkPermission(PERMISSION_ENUM.WORKSTATION_READ) && (
                                                        <Link
                                                            href={route(`${ROUTES.WORKSTATIONS}.index`)}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <RiToolsFill size={STYLING.ICON.SIZE.SMALL} />
                                                            <p className="text-base">
                                                                {t('components.sidebar.links.workstations')}
                                                            </p>
                                                        </Link>
                                                    )}

                                                    {checkPermission(PERMISSION_ENUM.USER_READ) && (
                                                        <Link
                                                            href={route(`${ROUTES.USERS}.index`)}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <RiUserLine size={STYLING.ICON.SIZE.SMALL} />
                                                            <p className="text-base">
                                                                {t('components.sidebar.links.staff')}
                                                            </p>
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
                                                        <p className="text-base">
                                                            {t('components.sidebar.links.access_control')}
                                                        </p>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="items-start pl-10 flex flex-col gap-7">
                                                    <Link
                                                        href={route(`${ROUTES.PERMISSIONS}.index`)}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <RiLockUnlockFill size={25} />
                                                        <p className="text-base">
                                                            {t('components.sidebar.links.permissions')}
                                                        </p>
                                                    </Link>
                                                    <Link
                                                        href={route(`${ROUTES.ROLES}.index`)}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <RiShieldLine className="mt-2" size={25} />
                                                        <p className="text-base">
                                                            {t('components.sidebar.links.roles')}
                                                        </p>
                                                    </Link>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        <hr className="border-gray-700 border-2 w-full" />

                                        {checkPermission(PERMISSION_ENUM.STEP_READ) && (
                                            <Link
                                                href={route(`${ROUTES.STEPS}.index`)}
                                                className="flex items-center gap-2"
                                            >
                                                <RiExpandRightLine size={35} />
                                                <p className="text-base">List Step</p>
                                            </Link>
                                        )}

                                        {checkPermission(PERMISSION_ENUM.RAW_MATERIAL_READ) && (
                                            <Link
                                                href={route(`${ROUTES.RAW_MATERIALS}.index`)}
                                                className="flex items-center gap-2"
                                            >
                                                <RiInstanceLine size={35} />
                                                <p className="text-base">
                                                    {t('components.sidebar.links.raw_materials')}
                                                </p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.COMPONENT_READ) && (
                                            <Link
                                                href={route(`${ROUTES.COMPONENTS}.index`)}
                                                className="flex items-center gap-2"
                                            >
                                                <RiStackLine size={35} />
                                                <p className="text-base">{t('components.sidebar.links.components')}</p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.PANEL_READ) && (
                                            <Link
                                                href={route(`${ROUTES.PANELS}.index`)}
                                                className="flex items-center gap-2"
                                            >
                                                <RiArtboard2Fill size={35} />
                                                <p className="text-base">{t('components.sidebar.links.panels')}</p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.PROJECT_READ) && (
                                            <Link
                                                href={route(`${ROUTES.PROJECTS}.index`)}
                                                className="flex items-center gap-2"
                                            >
                                                <RiBox3Line size={35} />
                                                <p className="text-base">{t('components.sidebar.links.projects')}</p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.CARRIAGE_READ) && (
                                            <Link
                                                href={route(`${ROUTES.CARRIAGES}.index`)}
                                                className="flex items-center gap-2"
                                            >
                                                <RiCaravanLine size={35} />
                                                <p className="text-base">{t('components.sidebar.links.carriages')}</p>
                                            </Link>
                                        )}

                                        <div className="flex flex-col h-44 justify-end gap-y-6 ">
                                            <Link
                                                href={route(`${ROUTES.PROFILE}.edit`)}
                                                className="flex items-center gap-2 m "
                                            >
                                                <RiSettings3Line size={35} />
                                                <p className="text-base">{t('components.sidebar.links.settings')}</p>
                                            </Link>
                                            <Link
                                                href={route(`${ROUTES.PROFILE}.edit`)}
                                                className="flex items-center gap-2"
                                            >
                                                <RiQuestionLine size={35} />
                                                <p className="text-base">{t('components.sidebar.links.feedback')}</p>
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
