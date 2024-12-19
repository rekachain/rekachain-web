import { Button } from '@/Components/UI/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/UI/sheet';
import { ROUTES } from '@/Support/Constants/routes';
import { STYLING } from '@/Support/Constants/styling';
import { Link } from '@inertiajs/react';
import {
    RiArtboard2Fill,
    RiBox3Line,
    RiCalendar2Line,
    RiCaravanLine,
    RiDivideLine,
    RiExpandRightLine,
    RiHome2Line,
    RiHome8Line,
    RiInstanceLine,
    RiLockUnlockFill,
    RiQuestionLine,
    RiSettings3Line,
    RiShieldLine,
    RiStackLine,
    RiToolsFill,
    RiUser2Line,
    RiUserLine,
} from '@remixicon/react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect, useRef } from 'react';
import SidebarLogout from './Components/SidebarLogout';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/UI/accordion';
import { ScrollArea } from '@/Components/UI/scroll-area';
import { checkPermission } from '@/Helpers/permissionHelper';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
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
        <aside ref={sidebarRef} className='sidebar z w-20 border-r-2 border-border transition-all'>
            <nav className='flex flex-col space-y-1'>
                <div className='header flex h-16 border-b-2 px-4 py-3'>
                    <Sheet>
                        <SheetTrigger asChild>
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
                                    <SheetDescription></SheetDescription>
                                    <div className='flex w-full flex-col items-start gap-7 text-black dark:text-white'>
                                        <hr className='mt-2 w-full border-[0.5px] border-gray-700' />
                                        <Link href={'dashboard'} className='mt-1'>
                                            <div className='flex items-center gap-2'>
                                                <RiHome8Line size={35} />
                                                <p className='text-base'>
                                                    {t('components.sidebar.links.dashboard')}
                                                </p>
                                            </div>
                                        </Link>
                                        <Link
                                            href={route(`${ROUTES.WORK_DAYS}.index`)}
                                            className='mt-5'
                                        >
                                            <div className='flex items-center gap-2'>
                                                <RiCalendar2Line size={35} />
                                                <p className='text-base'>
                                                    {t('components.sidebar.links.work_days')}
                                                </p>
                                            </div>
                                        </Link>
                                        <Accordion type='single' collapsible>
                                            <AccordionItem value='item-1'>
                                                <AccordionTrigger>
                                                    <div className='flex items-center gap-2'>
                                                        <RiUser2Line size={35} />
                                                        <p className='text-base'>
                                                            {t(
                                                                'components.sidebar.links.staff_management',
                                                            )}
                                                        </p>
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
                                                            <p className='text-base'>
                                                                {t(
                                                                    'components.sidebar.links.divisions',
                                                                )}
                                                            </p>
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
                                                            <p className='text-base'>
                                                                {t(
                                                                    'components.sidebar.links.workshops',
                                                                )}
                                                            </p>
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
                                                            <p className='text-base'>
                                                                {t(
                                                                    'components.sidebar.links.workstations',
                                                                )}
                                                            </p>
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
                                                            <p className='text-base'>
                                                                {t(
                                                                    'components.sidebar.links.staff',
                                                                )}
                                                            </p>
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
                                                        <p className='text-base'>
                                                            {t(
                                                                'components.sidebar.links.access_control',
                                                            )}
                                                        </p>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className='flex flex-col items-start gap-7 pl-10'>
                                                    <Link
                                                        href={route(`${ROUTES.PERMISSIONS}.index`)}
                                                        className='flex items-center gap-2'
                                                    >
                                                        <RiLockUnlockFill size={25} />
                                                        <p className='text-base'>
                                                            {t(
                                                                'components.sidebar.links.permissions',
                                                            )}
                                                        </p>
                                                    </Link>
                                                    <Link
                                                        href={route(`${ROUTES.ROLES}.index`)}
                                                        className='flex items-center gap-2'
                                                    >
                                                        <RiShieldLine size={25} className='mt-2' />
                                                        <p className='text-base'>
                                                            {t('components.sidebar.links.roles')}
                                                        </p>
                                                    </Link>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        <hr className='w-full border-[0.5px] border-gray-700' />

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
                                                <p className='text-base'>
                                                    {t('components.sidebar.links.raw_materials')}
                                                </p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.COMPONENT_READ) && (
                                            <Link
                                                href={route(`${ROUTES.COMPONENTS}.index`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiStackLine size={35} />
                                                <p className='text-base'>
                                                    {t('components.sidebar.links.components')}
                                                </p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.PANEL_READ) && (
                                            <Link
                                                href={route(`${ROUTES.PANELS}.index`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiArtboard2Fill size={35} />
                                                <p className='text-base'>
                                                    {t('components.sidebar.links.panels')}
                                                </p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.PROJECT_READ) && (
                                            <Link
                                                href={route(`${ROUTES.PROJECTS}.index`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiBox3Line size={35} />
                                                <p className='text-base'>
                                                    {t('components.sidebar.links.projects')}
                                                </p>
                                            </Link>
                                        )}
                                        {checkPermission(PERMISSION_ENUM.CARRIAGE_READ) && (
                                            <Link
                                                href={route(`${ROUTES.CARRIAGES}.index`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiCaravanLine size={35} />
                                                <p className='text-base'>
                                                    {t('components.sidebar.links.carriages')}
                                                </p>
                                            </Link>
                                        )}
                                        <hr className='w-full border-[0.5px] border-gray-700' />

                                        <div className='flex h-44 flex-col justify-end gap-y-6'>
                                            <Link
                                                href={route(`${ROUTES.PROFILE}.edit`)}
                                                className='m flex items-center gap-2'
                                            >
                                                <RiSettings3Line size={35} />
                                                <p className='text-base'>
                                                    {t('components.sidebar.links.settings')}
                                                </p>
                                            </Link>
                                            <Link
                                                href={route(`${ROUTES.PROFILE}.edit`)}
                                                className='flex items-center gap-2'
                                            >
                                                <RiQuestionLine size={35} />
                                                <p className='text-base'>
                                                    {t('components.sidebar.links.feedback')}
                                                </p>
                                            </Link>
                                            <SidebarLogout />
                                        </div>
                                    </div>
                                </SheetHeader>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </aside>
    );
}
