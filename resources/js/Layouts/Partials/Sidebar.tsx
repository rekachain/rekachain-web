import {
    RiBox3Line,
    RiContractLeftLine,
    RiFlickrLine,
    RiHome2Line,
    RiHome8Line,
    RiLogoutBoxRLine,
    RiQuestionLine,
    RiSettings3Line,
    RiUserLine,
} from "@remixicon/react";
import { Button, buttonVariants } from "../../Components/ui/button";
import SidebarLink from "./Components/SidebarLink";
import SidebarMenu from "./Components/SidebarMenu";
import { ListOrdered } from "lucide-react";
import {
    SidebarLinkCollapsible,
    SidebarLinkCollapsibleItem,
} from "./Components/SidebarLinkCollapsible";
import { Link } from "@inertiajs/react";
import SidebarLogout from "./Components/SidebarLogout";

export default function Sidebar() {
    return (
        <aside className="w-72 h-screen border-muted border-r-2">
            <nav className="flex flex-col space-y-1">
                <div className="flex px-4 py-3 justify-between border-b-2">
                    <img
                        src="/assets/images/logo.png"
                        alt="logo"
                        className="w-36 object-contain"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        className="text-zinc-400"
                    >
                        <RiContractLeftLine />
                    </Button>
                </div>
                <SidebarMenu title="GENERAL">
                    <SidebarLink
                        routeName="profile.edit"
                        title="Staff"
                        icon={<RiUserLine size="20" />}
                    />
                    <SidebarLink
                        routeName="dashboard"
                        title="Dashboard"
                        icon={<RiHome8Line size="20" />}
                    />
                </SidebarMenu>
                <SidebarMenu title="MANUFAKTUR" bordered>
                    <SidebarLink
                        routeName="profile.edit"
                        title="Track Lot"
                        icon={<ListOrdered size="20" />}
                    />
                    <SidebarLinkCollapsible
                        title="Batch"
                        icon={<RiBox3Line size="20" />}
                    >
                        <SidebarLinkCollapsibleItem
                            routeName="profile.edit"
                            title="Order Batch"
                            icon={<RiBox3Line size="20" />}
                        />
                        <SidebarLinkCollapsibleItem
                            routeName="profile.edit"
                            title="Track Batch"
                            icon={<RiFlickrLine size="20" />}
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
                        icon={<RiSettings3Line size="20" />}
                    />
                    <SidebarLink
                        routeName="profile.edit"
                        title="Helpdesk"
                        icon={<RiQuestionLine size="20" />}
                    />
                    <SidebarLogout />
                </SidebarMenu>
            </nav>
        </aside>
    );
}
