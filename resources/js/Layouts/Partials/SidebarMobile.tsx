import {
    RiBox3Line,
    RiContractLeftLine,
    RiContractRightLine,
    RiFlickrLine,
    RiHome8Line,
    RiLockLine,
    RiLockUnlockFill,
    RiQuestionLine,
    RiSettings3Line,
    RiShieldLine,
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
import { ROUTES } from '@/support/constants/routes';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';

export default function SidebarMobile() {
    const [sidebarCollapse, setSidebarCollapse] = useLocalStorage('sidebarCollapse', true);

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
        <aside ref={sidebarRef} className="sidebar w-20 border-border border-r-2 transition-all">
            <nav className="flex flex-col space-y-1">
                <div className="header flex px-4 py-3 border-b-2 h-16 ">
                    <Sheet>
                        <SheetTrigger>
                            <Button
                                variant="default"
                                size="icon"
                                className="sidebar-collapse-toggle-mobile w-full h-10  bg-transparent hover:bg-transparent"
                                onClick={handleSidebarCollapse}
                            >
                                <img
                                    src="/assets/images/icon.png"
                                    alt="logo"
                                    // className=" "
                                    // className="sidebar-header-logo h-full object-contain"
                                    // className="sidebar-header-logo h-full "
                                    width={50}
                                    // height={500}
                                />
                                {/* {sidebarCollapse ? (
                            <RiContractRightLine size={STYLING.ICON.SIZE.SMALL} />
                        ) : (
                            <RiContractLeftLine size={STYLING.ICON.SIZE.SMALL} />
                        )} */}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={'left'} className="w-[120px] sm:w-[540px]">
                            <SheetHeader>
                                <SheetTitle className="mx-auto">
                                    <img
                                        src="/assets/images/icon.png"
                                        alt="logo"
                                        // className=" "
                                        // className="sidebar-header-logo h-full object-contain"
                                        // className="sidebar-header-logo h-full "
                                        width={50}
                                        // height={500}
                                    />
                                </SheetTitle>
                                <SheetDescription className="items-center w-full  flex flex-col gap-7 text-black">
                                    <Link href={''} className="mt-5">
                                        <RiHome8Line size={STYLING.ICON.SIZE.MEDIUM} />
                                    </Link>
                                    <RiUserLine size={STYLING.ICON.SIZE.MEDIUM} />
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                <div className="pl-4">
                                                    <RiBox3Line size={STYLING.ICON.SIZE.MEDIUM} />
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="items-center flex flex-col gap-7">
                                                <RiShieldLine className="mt-2" size={30} />
                                                <RiLockUnlockFill size={30} />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    <hr className="border-gray-700 border-2 w-full" />

                                    <ListOrdered size={STYLING.ICON.SIZE.MEDIUM} />

                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                <div className="pl-4">
                                                    <RiBox3Line size={STYLING.ICON.SIZE.MEDIUM} />
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="items-center flex flex-col gap-7">
                                                <RiBox3Line size={30} />
                                                <RiBox3Line size={30} />
                                                <RiBox3Line size={30} />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    <RiQuestionLine size={STYLING.ICON.SIZE.MEDIUM} />
                                    <RiSettings3Line size={STYLING.ICON.SIZE.MEDIUM} />
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </aside>
    );
}
