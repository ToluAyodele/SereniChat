'use client';

import { FullMessageType } from "../../../../app/types";
import { pusherClient } from '../../../../app/modules/pusher';
import useConversation from "../../../../app/hooks/useConversation";
import React, { FC, useEffect, useState, useRef } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { find } from 'lodash';

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { conversationId } = useConversation();

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView();
    
        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/update`);
    
            setMessages((prevMessages) => {
                if (!prevMessages.find((msg) => msg.id === message.id)) {
                    // Append the new message to the previous messages
                    return [...prevMessages, message];
                }
                // Return the previous messages if the new message already exists
                return prevMessages;
            });
    
            bottomRef?.current?.scrollIntoView();
        };
    
        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((currentMessages) =>
                currentMessages.map((msg) =>
                    msg.id === newMessage.id ? newMessage : msg
                )
            );
        };
    
        pusherClient.bind('messages:new', messageHandler);
        pusherClient.bind('message:update', updateMessageHandler);
    
        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
            pusherClient.unbind('message:update', updateMessageHandler);
        };
    }, [conversationId]);

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
                    <div ref={bottomRef} className="pt-24" />
                </div>
            </div>
        </div>
    );
}

export default Body;