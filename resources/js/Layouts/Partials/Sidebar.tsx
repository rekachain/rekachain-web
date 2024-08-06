import {
    RiBox3Line,
    RiContractLeftLine,
    RiContractRightLine,
    RiFlickrLine,
    RiHome8Line,
    RiQuestionLine,
    RiSettings3Line,
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

export default function Sidebar() {
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
        <aside ref={sidebarRef} className="sidebar w-72 h-screen border-border border-r-2 transition-all">
            <nav className="flex flex-col space-y-1">
                <div className="sidebar-header flex px-4 py-3 border-b-2 h-16">
                    <img
                        src="/assets/images/sidebar-header.png"
                        alt="logo"
                        className="sidebar-header-logo h-full object-contain"
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
                <Link href={''}>a</Link>
                <SidebarMenu title="GENERAL">
                    <SidebarLink
                        routeName="dashboard"
                        title="Dashboard"
                        icon={<RiHome8Line size={STYLING.ICON.SIZE.SMALL} />}
                    />
                    <SidebarLink
                        routeName="users.index"
                        title="Staff"
                        icon={<RiUserLine size={STYLING.ICON.SIZE.SMALL} />}
                    />
                </SidebarMenu>
                <SidebarMenu title="MANUFAKTUR" bordered>
                    <SidebarLink
                        routeName="profile.edit"
                        title="Track Lot"
                        icon={<ListOrdered size={STYLING.ICON.SIZE.SMALL} />}
                    />
                    {/* <SidebarLink
                        routeName="project"
                        title="Buat Proyek"
                        icon={<ListOrdered size={STYLING.ICON.SIZE.SMALL} />}
                    /> */}
                    <SidebarLinkCollapsible title="Proyek" icon={<RiBox3Line size={STYLING.ICON.SIZE.SMALL} />}>
                        <SidebarLinkCollapsibleItem
                            routeName="proyek"
                            title="List Proyek"
                            icon={<RiBox3Line size={STYLING.ICON.SIZE.SMALL} />}
                        />
                        <SidebarLinkCollapsibleItem
                            routeName="buat-proyek"
                            title="Buat Proyek"
                            icon={<RiFlickrLine size={STYLING.ICON.SIZE.SMALL} />}
                        />
                    </SidebarLinkCollapsible>
                    {/* <SidebarLink
                        route="profile.edit"
                        children="Order Batch"
                        icon={<RiBox3Line  size={STYLING.ICON.SIZE.SMALL} />}
                    />
                    <SidebarLink
                        route="profile.edit"
                        children="Input Dokumen Pendukung"
                        icon={<RiUserLine  size={STYLING.ICON.SIZE.SMALL} />}
                    /> */}
                </SidebarMenu>
                <SidebarMenu title="SUPPORT" bordered>
                    <SidebarLink
                        routeName="profile.edit"
                        title="Pengaturan"
                        icon={<RiSettings3Line size={STYLING.ICON.SIZE.SMALL} />}
                    />
                    <SidebarLink
                        routeName="profile.edit"
                        title="Helpdesk"
                        icon={<RiQuestionLine size={STYLING.ICON.SIZE.SMALL} />}
                    />
                    <SidebarLogout />
                </SidebarMenu>
            </nav>
        </aside>
    );
}
