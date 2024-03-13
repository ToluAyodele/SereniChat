'use client';

import React, { FC, useMemo, useState } from 'react';
import Link from 'next/link';
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';

import Avatar from '../../../../app/components/desktop-view/Avatar';
import AvatarGroup from '../../../components/desktop-view/AvatarGroup';
import { Conversation, User } from '@prisma/client';
import ProfileDrawer from './ProfileDrawer';
import useOtherUser from '../../../../app/hooks/useOtherUser';
import useActiveList from '../../../../app/hooks/useActiveList';

import getCurrentUser from '../../../../app/actions/getCurrentUser';

// interface HeaderProps {
//     conversation: Conversation & {
//         users: User[]
//     }
// }

const Header = async () => {
    // const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);
    // const {  members } = useActiveList();
    // const currentUser = await getCurrentUser();
    // const isActive = members.indexOf(otherUser.email!) !== -1;

    // const statusText = useMemo(() => {
    //     if (conversation.isGroup) {
    //         return `${conversation.users.length} members`;
    //     }
    //     return isActive ? 'Active' : 'Offline';
    // }, [conversation, isActive]);

    return (
        <>
            {/* <ProfileDrawer
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            /> */}

            <div 
                className="
                    bg-white 
                    w-full 
                    flex 
                    border-none
                    sm:px-4
                    lg:px-6
                    justify-between
                    items-center"
            >
                <div className="flex gap-3 items-center my-2">
                    <Link 
                        href="/conversations"
                        className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer" 
                    >
                        <HiChevronLeft size={32}/>
                    </Link>
                    {/* { conversation.isGroup ? (
                        <AvatarGroup users={conversation.users}/>
                    ) : (
                        <Avatar user={otherUser}/>
                    )} */}
                    {/* <Avatar user={currentUser}/> */}
                    {/* <div className="flex flex-col">
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-sm font-light text-neutral-500">
                            { statusText }
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default Header;