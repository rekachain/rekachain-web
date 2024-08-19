import { PropsWithChildren, useState } from 'react';
import Sidebar from './Partials/Sidebar';
import Navbar from './Partials/Navbar';
import { useMediaQuery } from 'react-responsive';
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
        <div className="min-h-screen bg-background">
            <div className="flex">
                {isTabletOrMobile && (
                    // <div className="flex">
                    <SidebarMobile></SidebarMobile>
                    // </div>
                )}
                {isDesktopOrLaptop && <Sidebar />}
                <div className="flex-1 flex-col">
                    <Navbar />
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}
