import {
    RiBox3Line,
    RiContractLeftLine,
    RiContractRightLine,
    RiFlickrLine,
    RiHome8Line,
    RiQuestionLine,
    RiSettings3Line,
    RiUserLine,
} from "@remixicon/react";
import {Button} from "@/Components/ui/button";
import SidebarLink from "./Components/SidebarLink";
import SidebarMenu from "./Components/SidebarMenu";
import {ListOrdered} from "lucide-react";
import {
    SidebarLinkCollapsible,
    SidebarLinkCollapsibleItem,
} from "./Components/SidebarLinkCollapsible";
import SidebarLogout from "./Components/SidebarLogout";
import {useLocalStorage} from "@uidotdev/usehooks";
import {useEffect, useRef} from "react";

export default function Sidebar() {
    const [sidebarCollapse, setSidebarCollapse] = useLocalStorage(
        "sidebarCollapse",
        false
    );

    const handleSidebarCollapse = () => {
        setSidebarCollapse(!sidebarCollapse);
    };

    const sidebarRef = useRef<HTMLDivElement>(null);

    const applySidebarCollapse = () => {
        if (sidebarCollapse) {
            sidebarRef.current?.classList.add("sidebar-collapse");
        } else {
            sidebarRef.current?.classList.remove("sidebar-collapse");
        }
    };

    useEffect(applySidebarCollapse, [sidebarCollapse]);

    return (
        <aside
            ref={sidebarRef}
            className="sidebar w-72 h-screen border-border border-r-2 transition-all"
        >
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
                            <RiContractRightLine/>
                        ) : (
                            <RiContractLeftLine/>
                        )}
                    </Button>
                </div>
                <SidebarMenu title="GENERAL">
                    <SidebarLink
                        routeName="dashboard"
                        title="Dashboard"
                        icon={<RiHome8Line size="20"/>}
                    />
                    <SidebarLink
                        routeName="users.index"
                        title="Staff"
                        icon={<RiUserLine size="20"/>}
                    />
                </SidebarMenu>
                <SidebarMenu title="MANUFAKTUR" bordered>
                    <SidebarLink
                        routeName="profile.edit"
                        title="Track Lot"
                        icon={<ListOrdered size="20"/>}
                    />
                    <SidebarLinkCollapsible
                        title="Batch"
                        icon={<RiBox3Line size="20"/>}
                    >
                        <SidebarLinkCollapsibleItem
                            routeName="profile.edit"
                            title="Order"
                            icon={<RiBox3Line size="20"/>}
                        />
                        <SidebarLinkCollapsibleItem
                            routeName="profile.edit"
                            title="Track"
                            icon={<RiFlickrLine size="20"/>}
                        />
                    </SidebarLinkCollapsible>
                    {/* <SidebarLink
                        route="profile.edit"
                        children="Order Batch"
                        icon={<RiBox3Line size="20" />}
                    />
                    <SidebarLink
                        route="profile.edit"
                        children="Input Dokumen Pendukung"
                        icon={<RiUserLine size="20" />}
                    /> */}
                </SidebarMenu>
                <SidebarMenu title="SUPPORT" bordered>
                    <SidebarLink
                        routeName="profile.edit"
                        title="Pengaturan"
                        icon={<RiSettings3Line size="20"/>}
                    />
                    <SidebarLink
                        routeName="profile.edit"
                        title="Helpdesk"
                        icon={<RiQuestionLine size="20"/>}
                    />
                    <SidebarLogout/>
                </SidebarMenu>
            </nav>
        </aside>
    );
}
