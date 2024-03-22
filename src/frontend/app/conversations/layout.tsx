import React, { ReactNode } from 'react';

import ConversationList from './components/ConversationList';
import getConversations from '../actions/getConversations';
import getCurrentUser from '../actions/getCurrentUser';
import { User } from '@prisma/client';

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