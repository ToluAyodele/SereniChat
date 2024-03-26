'use client';

import { FullMessageType } from "../../../../app/types";
import React, { FC, useState } from "react";
import MessageBox from "./MessageBox";

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);

    return (
        <div className="flex justify-center items-center h-full">
            <div className="text-center items-center flex flex-col w-1/2">
                <div className="flex-1 mt-8">
                    { messages.map((message, i) => (
                        <MessageBox
                            key={message.id}
                            data={message}
                        />
                    ))}
                    {/* <div ref={bottomRef} className="pt-24" /> */}
                </div>
            </div>
        </div>
    );
}

export default Body;