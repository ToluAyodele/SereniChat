'use client';

import React, { useCallback, useMemo, FC } from 'react';
import { useRouter } from 'next/navigation';
import { Conversation, Message, User } from '@prisma/client';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';

import { FullConversationType } from '../../types';
import useOtherUser from '../../hooks/useOtherUser';
import Avatar from '../../components/desktop-view/Avatar';

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1];
    }, [data.messages]);


    const lastMessageText = useMemo(() => {
        if (lastMessage?.images) {
            return 'Sent an image';
        }

        if (lastMessage?.body) {
            return lastMessage.body;
        }

        return 'Started a conversation';
    }, [lastMessage]);

    return (
        <div 
            className={clsx(`
                w-full
                relative
                flex
                items-center
                space-x-3
                hover:bg-teal-400
                rounded-lg
                transition
                cursor-pointer
                px-5
            `, 'bg-teal-600'
            )}
            onClick={handleClick}
        >
            { <Avatar user={otherUser} /> }
            <div className="min-w-0 flex-1 my-3">
                <div className='flex justify-between items-center mb-1'>
                    <p className="text-md font-medium text-black">
                        { data.name || otherUser.name }
                    </p>
                    {lastMessage?.createdAt && (
                        <p className='text-md text-black font-light'>
                            {format(new Date(lastMessage.createdAt), 'p')}
                        </p>
                    )}
                </div>
                <p className={clsx(`
                    truncate
                    text-md
                `, 'text-black font-medium'
                )}>
                    {lastMessageText}
                </p>
            </div>
        </div>
    );
}

export default ConversationBox;