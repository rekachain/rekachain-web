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
    RiLockUnlockLine,
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
import { ROUTES } from '@/support/constants/routes';
import { SidebarContext } from '@/contexts/SidebarContext';
import { SIDEBAR_GROUP_ENUM } from '@/support/enums/sidebarGroupEnum';
import { PERMISSION_ENUM } from '@/support/enums/permissionEnum';
import { checkPermission } from '@/helpers/sidebarHelper';

export default function Sidebar() {
    const [sidebarCollapse, setSidebarCollapse] = useLocalStorage('sidebarCollapse', false);
    const [selectedMenu, setSelectedMenu] = useLocalStorage('selectedMenu', '');
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
        <SidebarContext.Provider value={{ selectedMenu, setSelectedMenu }}>
            <aside ref={sidebarRef} className="sidebar w-72 h-screen border-border border-r-2 transition-all">
                <nav className="flex flex-col space-y-1">
                    <div className="sidebar-header flex justify-between px-4 py-3 border-b-2 h-16">
                        <img
                            src="/assets/images/Logo REKA.svg"
                            alt="logo"
                            // className=" "
                            // className="sidebar-header-logo h-full object-contain"
                            className="sidebar-header-logo h-12 "
                            height={200}
                            // height={500}
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            className="sidebar-collapse-toggle h-10 w-10"
                            onClick={handleSidebarCollapse}
                        >
                            {sidebarCollapse ? (
                                <RiContractRightLine size={STYLING.ICON.SIZE.SMALL} />
                            ) : (
                                <RiContractLeftLine size={STYLING.ICON.SIZE.SMALL} />
                            )}
                        </Button>
                    </div>
                    <SidebarMenu title="GENERAL">
                        <SidebarLink
                            routeName="dashboard"
                            title="Dashboard"
                            icon={<RiHome8Line size={STYLING.ICON.SIZE.SMALL} />}
                        />
                        <SidebarLinkCollapsible
                            group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                            title="Manajemen Staff"
                            icon={<RiUser2Line size={STYLING.ICON.SIZE.SMALL} />}
                        >
                            {checkPermission(PERMISSION_ENUM.DIVISION_READ) && (
                                <SidebarLinkCollapsibleItem
                                    group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                    routeName={`${ROUTES.DIVISIONS}.index`}
                                    title="Divisi"
                                    icon={<RiDivideLine size={STYLING.ICON.SIZE.SMALL} />}
                                />
                            )}

                            {checkPermission(PERMISSION_ENUM.WORKSHOP_READ) && (
                                <SidebarLinkCollapsibleItem
                                    group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                    routeName={`${ROUTES.WORKSHOPS}.index`}
                                    title="Workshop"
                                    icon={<RiHome2Line size={STYLING.ICON.SIZE.SMALL} />}
                                />
                            )}

                            {checkPermission(PERMISSION_ENUM.WORKSTATION_READ) && (
                                <SidebarLinkCollapsibleItem
                                    group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                    routeName={`${ROUTES.WORKSTATIONS}.index`}
                                    title="Workstation"
                                    icon={<RiToolsFill size={STYLING.ICON.SIZE.SMALL} />}
                                />
                            )}

                            {checkPermission(PERMISSION_ENUM.USER_READ) && (
                                <SidebarLinkCollapsibleItem
                                    group={SIDEBAR_GROUP_ENUM.STAFF_MANAGEMENT}
                                    routeName={`${ROUTES.USERS}.index`}
                                    title="Staff"
                                    icon={<RiUserLine size={STYLING.ICON.SIZE.SMALL} />}
                                />
                            )}
                        </SidebarLinkCollapsible>

                        <SidebarLinkCollapsible
                            group={SIDEBAR_GROUP_ENUM.ACCESS_CONTROL}
                            title="Hak Akses"
                            icon={<RiBox3Line size={STYLING.ICON.SIZE.SMALL} />}
                        >
                            {checkPermission(PERMISSION_ENUM.PERMISSION_READ) && (
                                <SidebarLinkCollapsibleItem
                                    group={SIDEBAR_GROUP_ENUM.ACCESS_CONTROL}
                                    routeName={`${ROUTES.PERMISSIONS}.index`}
                                    title="Permissions"
                                    icon={<RiLockUnlockLine size={STYLING.ICON.SIZE.SMALL} />}
                                />
                            )}

                            {checkPermission(PERMISSION_ENUM.ROLE_READ) && (
                                <SidebarLinkCollapsibleItem
                                    group={SIDEBAR_GROUP_ENUM.ACCESS_CONTROL}
                                    routeName={`${ROUTES.ROLES}.index`}
                                    title="Roles"
                                    icon={<RiShieldLine size={STYLING.ICON.SIZE.SMALL} />}
                                />
                            )}
                        </SidebarLinkCollapsible>
                    </SidebarMenu>
                    <SidebarMenu title="MANUFAKTUR" bordered>
                        {checkPermission(PERMISSION_ENUM.RAW_MATERIAL_READ) && (
                            <SidebarLink
                                routeName={`${ROUTES.RAW_MATERIALS}.index`}
                                title="List Bahan Baku"
                                icon={<RiInstanceLine size={STYLING.ICON.SIZE.SMALL} />}
                            />
                        )}

                        {checkPermission(PERMISSION_ENUM.PANEL_READ) && (
                            <SidebarLink
                                routeName={`${ROUTES.PANELS}.index`}
                                title="List Panel"
                                icon={<RiArtboard2Fill size={STYLING.ICON.SIZE.SMALL} />}
                            />
                        )}
                        {checkPermission(PERMISSION_ENUM.PROJECT_READ) && (
                            <SidebarLink
                                routeName={`${ROUTES.PROJECTS}.index`}
                                title="List Proyek"
                                icon={<RiBox3Line size={STYLING.ICON.SIZE.SMALL} />}
                            />
                        )}
                        <SidebarLink
                            routeName={`${ROUTES.PROFILE}.edit`}
                            title="Track Lot"
                            icon={<ListOrdered size={STYLING.ICON.SIZE.SMALL} />}
                        />
                        {/* <SidebarLink
                        routeName="project"
                        title="Buat Proyek"
                        icon={<ListOrdered size={STYLING.ICON.SIZE.SMALL} />}
                    /> */}

                        <SidebarLinkCollapsible
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
                        </SidebarLinkCollapsible>
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
                    <SidebarMenu title="SUPPORT" bordered>
                        <SidebarLink
                            routeName={`${ROUTES.PROFILE}.edit`}
                            title="Pengaturan"
                            icon={<RiSettings3Line size={STYLING.ICON.SIZE.SMALL} />}
                        />
                        <SidebarLink
                            routeName={`${ROUTES.PROFILE}.edit`}
                            title="Helpdesk"
                            icon={<RiQuestionLine size={STYLING.ICON.SIZE.SMALL} />}
                        />
                        <SidebarLogout />
                    </SidebarMenu>
                </nav>
            </aside>
        </SidebarContext.Provider>
    );
}
