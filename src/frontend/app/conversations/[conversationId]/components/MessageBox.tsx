'use client';

import clsx from 'clsx';
import React, { FC } from 'react';
import { FullMessageType } from '../../../../app/types';

import Avatar from '../../../../app/components/desktop-view/Avatar';

interface MessageBoxProps {
    data: FullMessageType;
}

const MessageBox: FC<MessageBoxProps> = ({
    data,
}) => {

    const container = clsx("flex gap-5 p-6 justify-center");
    const body = clsx("flex flex-col gap-2 w-3/5");

    return (
        <>
            { data.sender ? (
            <>
                <div className={container}>
                    <Avatar user={ data.sender } />
                    <div className={body}>
                        <div className="flex items-center gap-1">
                            <div className="text-md text-black font-bold">
                                { data.sender.name }
                            </div>
                        </div>
                        <div className="text-xl text-left">
                            { data.body }
                        </div>
                    </div>
                </div>
            </>
            ) : (
            <>
                <div className={container}>
                    <Avatar />
                    <div className={body}>
                        <div className="flex items-center gap-1">
                            <div className="text-md text-black font-bold">
                                SereniChat
                            </div>
                        </div> 
                        <div className="text-xl text-left">
                            { data.body }
                        </div>
                    </div>
                </div>
            </>
            )}
        </>
    );
}

export default MessageBox;