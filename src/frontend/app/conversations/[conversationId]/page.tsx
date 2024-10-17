import getConversationById from "../../../app/actions/getConversationById";
import getMessages from "../../../app/actions/getMessages";

import Body from "../../../app/conversations/[conversationId]/components/Body";
import Form from "../../../app/conversations/[conversationId]/components/Form";

import EmptyState from "../../../app/components/EmptyState";

import React from "react";

interface IParams {
    conversationId: string;
};

const conversationId = async ({ params }: { params: IParams }) => {
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <EmptyState />
            </div>
        </div>
        );
    }
    
    return (
        <div className="lg:pl-96 h-full">
            <div className="flex flex-col">
                <Body initialMessages={ messages } />
                <Form />
            </div>
        </div>
    )
}

export default conversationId;