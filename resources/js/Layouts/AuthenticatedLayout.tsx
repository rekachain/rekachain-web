import {PropsWithChildren, useState} from "react";
import Sidebar from "./Partials/Sidebar";
import Navbar from "./Partials/Navbar";

export default function Authenticated({
                                          children,
                                      }: PropsWithChildren) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <Sidebar/>
                <div className="flex-1 flex-col">
                    <Navbar/>
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}
