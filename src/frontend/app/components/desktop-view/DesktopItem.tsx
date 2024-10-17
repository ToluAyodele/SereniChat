'use client';

import React, { FC } from "react";

import clsx from "clsx";
import Link from 'next/link';

interface DesktopItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const DesktopItem: FC<DesktopItemProps> = ({ 
    label,
    icon: Icon,
    href,
    onClick,
    active
 }) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <li onClick={handleClick}>
            <Link 
                href={href}
                className={clsx(`
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-3
                    text-sm
                    leading-6
                    font-semibold
                    text-black
                    hover:text-black
                    hover:bg-teal-400
                `, active && 'bg-gray-100  text-black'
                )}
            >
                <Icon className="h-10 w-10 shrink-0" />
                <span className="sr-only">{ label }</span>
            </Link>
        </li>
    );
}

export default DesktopItem;