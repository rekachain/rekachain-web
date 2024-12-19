import { HelpdeskProvider } from '@/Contexts/HelpdeskContext';
import { PropsWithChildren, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navbar from './Partials/Navbar';
import Sidebar from './Partials/Sidebar';
import SidebarMobile from './Partials/SidebarMobile';

export default function Authenticated({ children }: PropsWithChildren) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 900px)',
    });
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });
    // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

    return (
        <HelpdeskProvider>
            <div className='min-h-screen bg-background'>
                {isTabletOrMobile && (
                    <div className=''>
                        <div className='flex'>
                            <SidebarMobile></SidebarMobile>
                            <Navbar />
                        </div>

                        <main>{children}</main>
                    </div>
                )}
                {isDesktopOrLaptop && (
                    <div className='flex'>
                        <Sidebar />
                        <div className='flex-1 flex-col'>
                            <Navbar />
                            <main>{children}</main>
                        </div>
                    </div>
                )}
            </div>
        </HelpdeskProvider>
    );
}
