'use client';

import { FullMessageType } from "../../../../app/types";
import React, { FC, useState, useRef } from "react";
import MessageBox from "./MessageBox";

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    return (
        <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center">
            <div className="text-center items-center flex flex-col w-1/2">
                <div className="flex-1">
                    { messages.map((message, i) => (
                        <MessageBox
                            key={message.id}
                            data={message}
                        />
                    ))}
                    <div ref={bottomRef} className="pt-24" />
                </div>
            </div>
        </div>
    );
}

export default Body;