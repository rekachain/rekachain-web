import {RiMoonClearLine, RiNotification4Line, RiSearchLine} from "@remixicon/react";
import {Input} from "@/Components/ui/input";
import {Separator} from "@/Components/ui/separator";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar";
import {Link, usePage} from "@inertiajs/react";
import {useEffect} from "react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/Components/ui/sheet";
import {Button} from "@/Components/ui/button";
import {useLocalStorage} from "@uidotdev/usehooks";
import {Sun} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import {STYLING} from "@/support/constants/styling";
import {ROUTES} from "@/support/constants/routes";

export default function Navbar() {
    const {auth} = usePage().props;

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                document.getElementById("search")?.focus();
            }
        });

        return () => {
            document.removeEventListener("keydown", () => {
            });
        };
    }, []);

    const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

    const changeHtmlClass = () => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }

    useEffect(() => {
        changeHtmlClass();
    }, [darkMode]);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        changeHtmlClass();
    }
    return (
        <nav className="flex  h-16 border-b-2 justify-between items-center px-4 py-3">
            <div className="w-64 h-full flex items-center rounded border-2 px-2">
                <label
                    htmlFor="search"
                    children={<RiSearchLine className="w-5 h-5"/>}
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
                <Button variant="ghost" size="icon" onClick={handleDarkMode}>
                    {darkMode ? <Sun size={STYLING.ICON.SIZE.SMALL}/> :
                        <RiMoonClearLine size={STYLING.ICON.SIZE.SMALL}/>}
                </Button>
                <Sheet>
                    <SheetTrigger>
                        <Button variant="ghost" size="icon">
                            <RiNotification4Line size={STYLING.ICON.SIZE.SMALL}/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Notifications</SheetTitle>
                            <SheetDescription>You have no notifications, enjoy your day</SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <Separator orientation="vertical" className="w-[2px]"/>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex justify-start gap-2">
                            <Avatar>
                                <AvatarImage/>
                                <AvatarFallback>{auth?.user.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start">
                            <span className="text-navbar-primary-foreground text-sm">
                                {auth?.user.name}
                            </span>
                            <span className="text-navbar-secondary-foreground text-sm">
                                Supervisor
                            </span>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <Link href={route(`${ROUTES.PROFILE}.edit`)}>
                                Profile
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </nav>
    );
}
