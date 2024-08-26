import { RiMoonClearLine, RiNotification4Line, RiSearchLine } from '@remixicon/react';
import { Input } from '@/Components/ui/input';
import { Separator } from '@/Components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { Button, buttonVariants } from '@/Components/ui/button';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Sun } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { STYLING } from '@/support/constants/styling';
import { ROUTES } from '@/support/constants/routes';
import { useMediaQuery } from 'react-responsive';

export default function Navbar() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 900px)',
    });
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });

    const { auth } = usePage().props;
    useEffect(() => {
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                document.getElementById('search')?.focus();
            }
        });

        return () => {
            document.removeEventListener('keydown', () => {});
        };
    }, []);

    const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

    const changeHtmlClass = () => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        }
    };

    useEffect(() => {
        changeHtmlClass();
    }, [darkMode]);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        changeHtmlClass();
    };
    return (
        <nav className="flex  h-16 border-b-2 justify-between items-center px-4 py-3">
            <div className="w-28 sm:w-64 h-full flex items-center rounded border-2 px-2">
                <label htmlFor="search" children={<RiSearchLine className="w-3 h-3 md:5 md:h-5" />} />
                <Input
                    id="search"
                    className="h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Search"
                />
                <label htmlFor="search">
                    {isDesktopOrLaptop && (
                        <p className="text-xs text-navbar-secondary-foreground text-nowrap">CTRL + K</p>
                    )}
                </label>
            </div>
            <div className="w-fit flex h-full items-center gap-1 md:gap-2">
                <Button variant="ghost" size="icon" onClick={handleDarkMode}>
                    {darkMode ? (
                        <Sun size={STYLING.ICON.SIZE.SMALL} />
                    ) : (
                        <RiMoonClearLine size={STYLING.ICON.SIZE.SMALL} />
                    )}
                </Button>
                <Sheet>
                    <SheetTrigger className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
                        <RiNotification4Line size={STYLING.ICON.SIZE.SMALL} />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Notifications</SheetTitle>
                            <SheetDescription>You have no notifications, enjoy your day</SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <Separator orientation="vertical" className="w-[2px]" />
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex justify-start gap-1 md:gap-2">
                            <Avatar>
                                <AvatarImage src={auth?.user.image} />
                                <AvatarFallback>{auth?.user.initials}</AvatarFallback>
                            </Avatar>
                            {isTabletOrMobile && <span></span>}
                            {isDesktopOrLaptop && (
                                <div className="flex flex-col items-start">
                                    <span className="text-navbar-primary-foreground text-sm">{auth?.user.name}</span>
                                    <span className="text-navbar-secondary-foreground text-sm">{auth?.user.role}</span>
                                </div>
                            )}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-0">
                            <Link
                                className="h-full w-full text-left px-2 py-1.5"
                                href={route(`${ROUTES.PROFILE}.edit`)}
                                as="button"
                            >
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <Link
                                className="h-full w-full text-left px-2 py-1.5"
                                method="post"
                                href={route(ROUTES.LOGOUT)}
                                as="button"
                            >
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}
