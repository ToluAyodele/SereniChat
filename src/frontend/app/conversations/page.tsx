'use client';

import React from 'react';
import clsx from 'clsx';

import useConversation from '../hooks/useConversation';
import EmptyState from '../components/EmptyState';

import Header from "./[conversationId]/components/Header";
import Body from "./[conversationId]/components/Body";
import Form from "./[conversationId]/components/Form";

import EmptyBody from "../../app/conversations/[conversationId]/components/EmptyBody";

const Home = () => {
    const { isOpen } = useConversation();

    return (
        <div className={clsx(
            'lg:pl-80 h-full lg:block',
            isOpen ? 'hidden lg:block' : 'hidden'
        )}>
            <div className="lg:pl-20 h-full">
                <div className="h-full flex flex-col">
                    <Header />
                    <EmptyBody />
                    <Form />
                </div>
            </div>
        </div>
    )
}

export default Home;