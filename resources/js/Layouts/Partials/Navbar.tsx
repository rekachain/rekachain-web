import AddFeedback from '@/Components/AddFeedback';
import { SearchResults } from '@/Components/SearchResult';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/UI/avatar';
import { Button, buttonVariants } from '@/Components/UI/button';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Menu, Sun } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/UI/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/UI/select';

import { STYLING } from '@/Support/Constants/styling';
import { ROUTES } from '@/Support/Constants/routes';
import { useMediaQuery } from 'react-responsive';
import AddFeedback from '@/Components/AddFeedback';
import { SetLocalization } from '@/Layouts/Partials/Partials/SetLocalization';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import useDarkMode from '@/Hooks/useDarkMode';
import axios from 'axios';
import { SearchResults } from '@/Components/SearchResult';
// import { useLocalStorage } from '@uidotdev/usehooks';
import { Input } from '@/Components/UI/input';
import { Separator } from '@/Components/UI/separator';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/UI/sheet';
import useDarkMode from '@/Hooks/useDarkMode';
import { SetLocalization } from '@/Layouts/Partials/Partials/SetLocalization';
import { ROUTES } from '@/Support/Constants/routes';
import { STYLING } from '@/Support/Constants/styling';
import { Link, usePage } from '@inertiajs/react';
import {
    RiBook2Line,
    RiDownload2Line,
    RiMoonClearLine,
    RiNotification4Line,
    RiSearchLine,
} from '@remixicon/react';
import { useLocalStorage } from '@uidotdev/usehooks';
import axios from 'axios';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function Navbar() {
    const { t } = useLaravelReactI18n();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 900px)',
    });
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });

    const { auth } = usePage().props;
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
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
            axios.get(`/search?q=${searchQuery}`).then((response) => {
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
        <nav className="flex h-16 border-b-2 justify-between items-center px-4 py-3  w-full">
            <div className="w-28 sm:w-64 h-full flex items-center rounded border-2 px-2">
                <label htmlFor="search" children={<RiSearchLine className="w-3 h-3 md:5 md:h-5" />} />
                <Input
                    value={searchQuery}
                    placeholder={t('action.search')}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id='search'
                    className='h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                />
                {searchQuery.length >= 2 && (
                    <SearchResults results={searchResults} query={searchQuery} />
                )}
                <label htmlFor='search'>
                    {isDesktopOrLaptop && (
                        <p className='text-nowrap text-xs text-navbar-secondary-foreground'>
                            CTRL + K
                        </p>
                    )}
                </label>
            </div>

            <div className="w-fit flex h-full items-center gap-1 md:gap-2">
                <div className="hidden md:flex">
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
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className='flex justify-start gap-1 md:gap-2'>
                            <Avatar>
                                <AvatarImage src={auth?.user.image} className='object-cover' />
                                <AvatarFallback>{auth?.user.initials}</AvatarFallback>
                            </Avatar>
                            {isTabletOrMobile && <span></span>}
                            {isDesktopOrLaptop && (
                                <div className='flex flex-col items-start'>
                                    <span className='text-navbar-primary-foreground text-sm'>
                                        {auth?.user.name}
                                    </span>
                                    <span className='text-sm text-navbar-secondary-foreground'>
                                        {auth?.user.role}
                                    </span>
                                </div>
                            )}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='p-0'>
                            <Link
                                href={route(`${ROUTES.PROFILE}.edit`)}
                                className='h-full w-full px-2 py-1.5 text-left'
                                as='button'
                            >
                                {t('components.navbar.profile.menus.profile')}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='p-0'>
                            <Link
                                method='post'
                                href={route(ROUTES.LOGOUT)}
                                className='h-full w-full px-2 py-1.5 text-left'
                                as='button'
                            >
                                {t('components.navbar.profile.menus.logout')}
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation="vertical" className="w-[2px] md:hidden" />
                <Select>
                    <SelectTrigger className="w-fit border-none md:hidden">
                        <Menu size={STYLING.ICON.SIZE.SMALL}></Menu>
                    </SelectTrigger>
                    <SelectContent className="w-fit">
                        <div className="">
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
                        </div>
                    </SelectContent>
                </Select>
            </div>
        </nav>
    );
}

export const ToggleDarkMode = () => {
    const { t } = useLaravelReactI18n();
    const { darkMode, toggleDarkMode } = useDarkMode();
    return (
        <Button
            variant='ghost'
            title={t('components.navbar.toggle_dark_mode.title')}
            size='icon'
            onClick={toggleDarkMode}
        >
            {darkMode ? (
                <Sun size={STYLING.ICON.SIZE.SMALL} />
            ) : (
                <RiMoonClearLine size={STYLING.ICON.SIZE.SMALL} />
            )}
        </Button>
    );
};

export const ViewManualBook = () => {
    const { t } = useLaravelReactI18n();
    return (
        <Link
            title={t('components.navbar.view_manual_book.title')}
            href='/'
            className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
            <RiBook2Line />
        </Link>
    );
};

export const DownloadApp = () => {
    const { t } = useLaravelReactI18n();
    return (
        <Link
            title={t('components.navbar.download_app.title')}
            href='/'
            className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
            <RiDownload2Line />
        </Link>
    );
};
