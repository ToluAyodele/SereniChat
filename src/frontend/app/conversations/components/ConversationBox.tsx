'use client';

import React, { useCallback, useMemo, FC } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { FullConversationType } from '../../types';

interface ConversationBoxProps {
    data: FullConversationType,
}

const ConversationBox: FC<ConversationBoxProps> = ({
    data,
}) => {
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    const firstMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[0];
    }, [data.messages]);


    const firstMessageText = useMemo(() => {
        if (firstMessage?.body) {
            return firstMessage.body.slice(0, 20) + '...';
        }

        return 'Started a conversation';
    }, [firstMessage]);

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
            onClick={ handleClick }
        >
            <div className="min-w-0 justify-between flex flex-1 my-3">
                <p className={clsx(`
                    truncate
                    text-md
                `, 'text-black font-medium'
                )}>
                    { firstMessageText }
                </p>
            </div>
        </div>
    );
}

export default ConversationBox;