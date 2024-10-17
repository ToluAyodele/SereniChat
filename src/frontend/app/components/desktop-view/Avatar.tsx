'use client';

import React, { FC } from "react";
import type { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarProps {
    user?: User;
    logo?: string;
}

const Avatar: FC<AvatarProps> = ({
    user,
    logo
}) => {
    return (
        <div className="relative">
            <div className="relative inline-block rounded-lg overflow-hidden h-9 w-9 md:h-11 md:w-11">
                <Image 
                    alt="avatar" 
                    src={ user?.image || logo || '/images/default-logo.png' }
                    fill
                />
            </div>
        </div>
    );
}

export default Avatar;

