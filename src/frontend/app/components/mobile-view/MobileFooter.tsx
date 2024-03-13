'use client';

import React from "react";

import useRoutes from "../../../app/hooks/useRoutes";
import useConversation from "../../../app/hooks/useConversation";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
    const routes = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) return null;

    return (
        <div 
            className="
                fixed 
                justify-between 
                w-full 
                z-40 
                flex
                bottom-0
                items-center 
                bg-white 
                border-t-[1px] 
                lg:hidden
            "
        >
            { routes.map((route) => (
                <MobileItem
                    key={route.href}
                    href={route.href}
                    active={route.active}
                    icon={route.icon}
                    onClick={route.onClick}
                />
            ))}
        </div>
    );
}

export default MobileFooter;