import { RiNotification4Line, RiSearchLine } from "@remixicon/react";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Navbar() {
    const { auth } = usePage().props;

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                document.getElementById("search")?.focus();
            }
        });

        return () => {
            document.removeEventListener("keydown", () => {});
        };
    }, []);
    return (
        <nav className="flex  h-16 border-b-2 justify-between items-center px-4 py-3">
            <div className="w-64 h-full flex items-center rounded border-2 px-2">
                <label
                    htmlFor="search"
                    children={<RiSearchLine className="w-5 h-5" />}
                />
                <Input
                    id="search"
                    className="h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Search"
                />
                <label htmlFor="search">
                    <p className="text-xs text-navbar-secondary-foreground text-nowrap">
                        CTRL + K
                    </p>
                </label>
            </div>
            <div className="w-fit flex h-full items-center gap-2">
                <RiNotification4Line className="h-5 w-5 text-navbar-secondary-foreground" />
                <Separator orientation="vertical" className="w-[2px]" />
                <Avatar>
                    <AvatarImage />
                    <AvatarFallback>{auth?.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-navbar-primary-foreground text-sm">
                        {auth?.user.name}
                    </span>
                    <span className="text-navbar-secondary-foreground text-sm">
                        Supervisor
                    </span>
                </div>
            </div>
        </nav>
    );
}
