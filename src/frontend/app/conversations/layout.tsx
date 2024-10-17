import React, { ReactNode } from 'react';

import { User } from '@prisma/client';

import getCurrentUser from '../actions/getCurrentUser';
import getConversations from '../actions/getConversations';
import ConversationList from './components/ConversationList';

export default async function ConversationsLayout({ children }: { children: ReactNode }) {

    const conversations = await getConversations();
    const currentUser = await getCurrentUser();


    return (
        <div className="h-full">
            <ConversationList
                user={currentUser as User}
                initialItems={ conversations }
            />
            { children }
        </div>
    )
};