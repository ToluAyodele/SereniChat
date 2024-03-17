'use client';

import clsx from 'clsx';
import { format } from 'date-fns/format';
import React, { FC } from 'react';
import { FullMessageType } from '../../../../app/types';
import { useSession } from 'next-auth/react';

import Avatar from '../../../../app/components/desktop-view/Avatar';

interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

const MessageBox: FC<MessageBoxProps> = ({
    data,
    isLast
}) => {
    const session = useSession();

    const isOwn = session?.data?.user?.email === data?.sender?.email;

    const container = clsx(
        "flex gap-3 p-4",
        isOwn && "justify-end"
    );

    const avatar = clsx(isOwn && "order-2");

    const body = clsx("flex flex-col gap-2",
    isOwn && "items-end");

    const message = clsx(
        'text-sm w-fit overflow-hidden', 
        isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
        'rounded-full py-2 px-3');

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={ data.sender } />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        { data.sender.name }
                    </div>
                    <div className="text-xs text-gray-400">
                        { format(new Date(data.createdAt), 'p') }
                    </div>
                </div>
                <div className={message}>
                    <div>
                        { data.body }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageBox;