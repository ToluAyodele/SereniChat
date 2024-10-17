import React, { ReactNode } from "react";

import DesktopSidebar from "./desktop-view/DesktopSidebar";
import MobileFooter from "./mobile-view/MobileFooter";
import getCurrentUser from "../actions/getCurrentUser";

async function Sidebar({ children }: { children: ReactNode }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return null;
    }

    return (
        <div className="h-full">
            <MobileFooter />
            <main className="lg:pl-20 h-full">
             { children }
            </main>
        </div>
    );
}

export default Sidebar;
