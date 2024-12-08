import { Button } from '@/Components/UI/button';
import { SidebarProvider } from '@/Contexts/SidebarContext';
import { checkPermission } from '@/Helpers/sidebarHelper';
import SidebarHelpdesk from '@/Layouts/Partials/Components/SidebarHelpdesk';
import { ROUTES } from '@/Support/Constants/routes';
import { STYLING } from '@/Support/Constants/styling';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { SIDEBAR_GROUP_ENUM } from '@/Support/Enums/sidebarGroupEnum';
import {
    RiArtboard2Fill,
    RiBox3Line,
    RiCalendar2Line,
    RiCaravanLine,
    RiContractLeftLine,
    RiContractRightLine,
    RiDivideLine,
    RiExpandRightLine,
    RiFeedbackLine,
    RiHome2Line,
    RiHome8Line,
    RiInstanceLine,
    RiLockUnlockLine,
    RiSettings3Line,
    RiShieldLine,
    RiStackLine,
    RiToolsFill,
    RiUser2Line,
    RiUserLine,
} from '@remixicon/react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useRef } from 'react';
import SidebarLink from './Components/SidebarLink';
import {
    SidebarLinkCollapsible,
    SidebarLinkCollapsibleItem,
} from './Components/SidebarLinkCollapsible';
import SidebarLogout from './Components/SidebarLogout';
import SidebarMenu from './Components/SidebarMenu';

export default function Sidebar() {
    const { t } = useLaravelReactI18n();
    const [sidebarCollapse, setSidebarCollapse] = useLocalStorage('sidebarCollapse', false);
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
        <SidebarProvider>
            <aside
                ref={sidebarRef}
                className='sidebar h-screen w-72 border-r-2 border-border transition-all'
            >
                <nav className='flex flex-col space-y-1'>
                    <div className='sidebar-header flex h-16 justify-between border-b-2 px-4 py-3'>
                        <img
                            src='/assets/images/Logo REKA.svg'
                            height={200}
                            // className=" "
                            // className="sidebar-header-logo h-full object-contain"
                            className='sidebar-header-logo h-12'
                            alt='logo'
                            // height={500}
                        />
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={handleSidebarCollapse}
                            className='sidebar-collapse-toggle h-10 w-10'
                        >
                            {sidebarCollapse ? (
                                <RiContractRightLine size={STYLING.ICON.SIZE.SMALL} />
                            ) : (
                                <RiContractLeftLine size={STYLING.ICON.SIZE.SMALL} />
                            )}
                        </Button>
                    </div>
                    <SidebarMenu title={t('components.sidebar.menus.general')}>
                        <SidebarLink
                            title={t('components.sidebar.links.dashboard')}
                            routeName='dashboard'
                            icon={<RiHome8Line size={STYLING.ICON.SIZE.SMALL} />}
                        />
                        {checkPermission(PERMISSION_ENUM.WORK_DAY_READ) && (
                            <SidebarLink
                                title={t('components.sidebar.links.work_days')}
                                routeName={`${ROUTES.WORK_DAYS}.index`}
                                icon={<RiCalendar2Line size={STYLING.ICON.SIZE.SMALL} />}
                            />
                        )}
                        <SidebarLinkCollapsible
                            title={t('components.sidebar.links.staff_management')}
                            icon={<RiUser2Line size={STYLING.ICON.SIZE.SMALL} />}
                            group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                        >
                            {checkPermission(PERMISSION_ENUM.DIVISION_READ) && (
                                <SidebarLinkCollapsibleItem
                                    title={t('components.sidebar.links.divisions')}
                                    routeName={`${ROUTES.DIVISIONS}.index`}
                                    icon={<RiDivideLine size={STYLING.ICON.SIZE.SMALL} />}
                                    group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                />
                            )}

                            {checkPermission(PERMISSION_ENUM.WORKSHOP_READ) && (
                                <SidebarLinkCollapsibleItem
                                    title={t('components.sidebar.links.workshops')}
                                    routeName={`${ROUTES.WORKSHOPS}.index`}
                                    icon={<RiHome2Line size={STYLING.ICON.SIZE.SMALL} />}
                                    group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                />
                            )}

                            {checkPermission(PERMISSION_ENUM.WORKSTATION_READ) && (
                                <SidebarLinkCollapsibleItem
                                    title={t('components.sidebar.links.workstations')}
                                    routeName={`${ROUTES.WORKSTATIONS}.index`}
                                    icon={<RiToolsFill size={STYLING.ICON.SIZE.SMALL} />}
                                    group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                />
                            )}

                            {checkPermission(PERMISSION_ENUM.USER_READ) && (
                                <SidebarLinkCollapsibleItem
                                    title={t('components.sidebar.links.staff')}
                                    routeName={`${ROUTES.USERS}.index`}
                                    icon={<RiUserLine size={STYLING.ICON.SIZE.SMALL} />}
                                    group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                />
                            )}
                        </SidebarLinkCollapsible>

                        <SidebarLinkCollapsible
                            title={t('components.sidebar.links.access_control')}
                            icon={<RiBox3Line size={STYLING.ICON.SIZE.SMALL} />}
                            group={SIDEBAR_GROUP_ENUM.ACCESS_CONTROL}
                        >
                            {checkPermission(PERMISSION_ENUM.PERMISSION_READ) && (
                                <SidebarLinkCollapsibleItem
                                    title={t('components.sidebar.links.permissions')}
                                    routeName={`${ROUTES.PERMISSIONS}.index`}
                                    icon={<RiLockUnlockLine size={STYLING.ICON.SIZE.SMALL} />}
                                    group={SIDEBAR_GROUP_ENUM.ACCESS_CONTROL}
                                />
                            )}

                            {checkPermission(PERMISSION_ENUM.ROLE_READ) && (
                                <SidebarLinkCollapsibleItem
                                    title={t('components.sidebar.links.roles')}
                                    routeName={`${ROUTES.ROLES}.index`}
                                    icon={<RiShieldLine size={STYLING.ICON.SIZE.SMALL} />}
                                    group={SIDEBAR_GROUP_ENUM.ACCESS_CONTROL}
                                />
                            )}
                        </SidebarLinkCollapsible>
                    </SidebarMenu>
                    <SidebarMenu title={t('components.sidebar.menus.manufacturing')} bordered>
                        {checkPermission(PERMISSION_ENUM.STEP_READ) && (
                            <SidebarLink
                                title={t('components.sidebar.links.steps')}
                                routeName={`${ROUTES.STEPS}.index`}
                                icon={<RiExpandRightLine size={STYLING.ICON.SIZE.SMALL} />}
                            />
                        )}

                        {checkPermission(PERMISSION_ENUM.RAW_MATERIAL_READ) && (
                            <SidebarLink
                                title={t('components.sidebar.links.raw_materials')}
                                routeName={`${ROUTES.RAW_MATERIALS}.index`}
                                icon={<RiInstanceLine size={STYLING.ICON.SIZE.SMALL} />}
                            />
                        )}

                        {checkPermission(PERMISSION_ENUM.COMPONENT_READ) && (
                            <SidebarLink
                                title={t('components.sidebar.links.components')}
                                routeName={`${ROUTES.COMPONENTS}.index`}
                                icon={<RiStackLine size={STYLING.ICON.SIZE.SMALL} />}
                            />
                        )}

                        {checkPermission(PERMISSION_ENUM.PANEL_READ) && (
                            <SidebarLink
                                title={t('components.sidebar.links.panels')}
                                routeName={`${ROUTES.PANELS}.index`}
                                icon={<RiArtboard2Fill size={STYLING.ICON.SIZE.SMALL} />}
                            />
                        )}

                        {checkPermission(PERMISSION_ENUM.PROJECT_READ) && (
                            <SidebarLink
                                title={t('components.sidebar.links.projects')}
                                routeName={`${ROUTES.PROJECTS}.index`}
                                icon={<RiBox3Line size={STYLING.ICON.SIZE.SMALL} />}
                            />
                        )}

                        {checkPermission(PERMISSION_ENUM.CARRIAGE_READ) && (
                            <SidebarLink
                                title={t('components.sidebar.links.carriages')}
                                routeName={`${ROUTES.CARRIAGES}.index`}
                                icon={<RiCaravanLine size={STYLING.ICON.SIZE.SMALL} />}
                            />
                        )}
                        {/* <SidebarLink
                            routeName={`${ROUTES.PROFILE}.edit`}
                            title="Track Lot"
                            icon={<ListOrdered size={STYLING.ICON.SIZE.SMALL} />}
                        /> */}
                        {/* <SidebarLink
                        routeName="project"
                        title="Buat Proyek"
                        icon={<ListOrdered size={STYLING.ICON.SIZE.SMALL} />}
                    /> */}
                        {/* <SidebarLinkCollapsible
                            group={SIDEBAR_GROUP_ENUM.PROJECT}
                            title="Proyek"
                            icon={<RiBox3Line size={STYLING.ICON.SIZE.SMALL} />}
                        >
                            <SidebarLinkCollapsibleItem
                                group={SIDEBAR_GROUP_ENUM.PROJECT}
                                routeName="proyek"
                                title="List Proyek"
                                icon={<RiBox3Line size={STYLING.ICON.SIZE.SMALL} />}
                            />
                            <SidebarLinkCollapsibleItem
                                group={SIDEBAR_GROUP_ENUM.PROJECT}
                                routeName="buat-proyek"
                                title="Buat Proyek"
                                // routeName={`${ROUTES.PROFILE}.edit`}
                                // title="Order"
                                icon={<RiBox3Line size={STYLING.ICON.SIZE.SMALL} />}
                            />
                            <SidebarLinkCollapsibleItem
                                group={SIDEBAR_GROUP_ENUM.PROJECT}
                                routeName={`${ROUTES.PROFILE}.edit`}
                                title="Track"
                                icon={<RiFlickrLine size={STYLING.ICON.SIZE.SMALL} />}
                            />
                        </SidebarLinkCollapsible> */}
                        {/* <SidebarLink
                        route={`${ROUTES.PROFILE}.edit"
                        children="Order Batch"
                        icon={<RiBox3Line  size={STYLING.ICON.SIZE.SMALL} />}
                    />
                    <SidebarLink
                        route={`${ROUTES.PROFILE}.edit"
                        children="Input Dokumen Pendukung"
                        icon={<RiUserLine  size={STYLING.ICON.SIZE.SMALL} />}
                    /> */}
                    </SidebarMenu>
                    <SidebarMenu title={t('components.sidebar.menus.support')} bordered>
                        <SidebarLink
                            title={t('components.sidebar.links.settings')}
                            routeName={`${ROUTES.PROFILE}.edit`}
                            icon={<RiSettings3Line size={STYLING.ICON.SIZE.SMALL} />}
                        />
                        {checkPermission(PERMISSION_ENUM.FEEDBACK_READ) && (
                        <SidebarLink
                            title={t('components.sidebar.links.feedback')}
                            routeName={`${ROUTES.FEEDBACK}.index`}
                            icon={<RiFeedbackLine size={STYLING.ICON.SIZE.SMALL} />}
                        />
                        )}

                        <SidebarHelpdesk />

                        <SidebarLogout />
                    </SidebarMenu>
                </nav>
            </aside>
        </SidebarProvider>
    );
}
