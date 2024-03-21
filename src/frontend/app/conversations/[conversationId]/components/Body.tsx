'use client';

import { FullMessageType } from "../../../../app/types";
import React, { FC, useEffect, useState, useRef } from "react";
// import { find } from 'lodash';

// import useConversation from "../../../../app/hooks/useConversation";
import MessageBox from "./MessageBox";


interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    // const { conversationId } = useConversation();

    // useEffect(() => {
    //     bottomRef?.current?.scrollIntoView();

    //     const messageHandler = (message: FullMessageType) => {
    //         setMessages((prevMessages) => {
    //             if (find(prevMessages, { id: message.id })) {
    //                 return prevMessages;
    //             }
    //             return [...prevMessages, message];
    //         });

    //         bottomRef?.current?.scrollIntoView();  
    //     };


    //     const updateMessageHandler = (newMessage: FullMessageType) => {
    //         setMessages((current) =>
    //             current.map((currentMessages) => {
    //                 if(currentMessages.id === newMessage.id) {
    //                     return newMessage;
    //                 }
    //             return currentMessages;
    //         }));
    //     };
    // }, [conversationId]);

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