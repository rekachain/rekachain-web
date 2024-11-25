import { RiBook2Line, RiDownload2Line, RiMoonClearLine, RiNotification4Line, RiSearchLine } from '@remixicon/react';
import { Input } from '@/Components/UI/input';
import { Separator } from '@/Components/UI/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/UI/avatar';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/UI/sheet';
import { Button, buttonVariants } from '@/Components/UI/button';
import { Sun } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/UI/dropdown-menu';
import { STYLING } from '@/Support/Constants/styling';
import { ROUTES } from '@/Support/Constants/routes';
import { useMediaQuery } from 'react-responsive';
import AddFeedback from '@/Components/AddFeedback';
import { SetLocalization } from '@/Layouts/Partials/Partials/SetLocalization';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import useDarkMode from '@/Hooks/useDarkMode';
import axios from 'axios';
import { SearchResults } from '@/Components/SearchResult';

export default function Navbar() {
    const { t } = useLaravelReactI18n();
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

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchQuery.length >= 2) {
            axios.get(`/search?q=${searchQuery}`)
                .then(response => {
                    console.log('Search results:', response.data);
                    setSearchResults(response.data);
                });
        }
    }, [searchQuery]);


    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        changeHtmlClass();
    };
    return (
        <nav className='flex h-16 items-center justify-between border-b-2 px-4 py-3'>
            <div className='flex h-full w-28 items-center rounded border-2 px-2 relative sm:w-64'>
                <label htmlFor='search'>
                    <RiSearchLine className='md:5 h-3 w-3 md:h-5' />
                </label>
                <Input
                    id="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={t('action.search')}
                />
                {searchQuery.length >=2 && <SearchResults query={searchQuery} results={searchResults} />}
                <label htmlFor='search'>
                    {isDesktopOrLaptop && (
                        <p className="text-xs text-navbar-secondary-foreground text-nowrap">CTRL + K</p>
                    )}
                </label>
            </div>
            <div className="w-fit flex h-full items-center gap-1 md:gap-2">
                <ViewManualBook />

                <DownloadApp />

                <ToggleDarkMode />

                <Sheet>
                    <SheetTrigger className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
                        <RiNotification4Line size={STYLING.ICON.SIZE.SMALL} />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{t('components.navbar.notification.title')}</SheetTitle>
                            <SheetDescription>{t('components.navbar.notification.empty')}</SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                <SetLocalization />

                <AddFeedback />

                <Separator orientation="vertical" className="w-[2px]" />

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex justify-start gap-1 md:gap-2">
                            <Avatar>
                                <AvatarImage src={auth?.user.image} className="object-cover" />
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
                                {t('components.navbar.profile.menus.profile')}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <Link
                                className="h-full w-full text-left px-2 py-1.5"
                                method="post"
                                href={route(ROUTES.LOGOUT)}
                                as="button"
                            >
                                {t('components.navbar.profile.menus.logout')}
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}

const ToggleDarkMode = () => {
    const { t } = useLaravelReactI18n();
    const { darkMode, toggleDarkMode } = useDarkMode();
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            title={t('components.navbar.toggle_dark_mode.title')}
        >
            {darkMode ? <Sun size={STYLING.ICON.SIZE.SMALL} /> : <RiMoonClearLine size={STYLING.ICON.SIZE.SMALL} />}
        </Button>
    );
};

const ViewManualBook = () => {
    const { t } = useLaravelReactI18n();
    return (
        <Link
            href="/"
            className={buttonVariants({ size: 'icon', variant: 'ghost' })}
            title={t('components.navbar.view_manual_book.title')}
        >
            <RiBook2Line />
        </Link>
    );
};

const DownloadApp = () => {
    const { t } = useLaravelReactI18n();
    return (
        <Link
            href="/"
            className={buttonVariants({ size: 'icon', variant: 'ghost' })}
            title={t('components.navbar.download_app.title')}
        >
            <RiDownload2Line />
        </Link>
    );
};
