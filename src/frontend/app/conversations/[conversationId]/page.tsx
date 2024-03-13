import getConversationById from "../../../app/actions/getConversationById";
import getMessages from "../../../app/actions/getMessages";
import getSession from "../../../app/actions/getSession";

import Header from "../../../app/conversations/[conversationId]/components/Header";
import Body from "../../../app/conversations/[conversationId]/components/Body";
import Form from "../../../app/conversations/[conversationId]/components/Form";


import React from "react";

interface IParams {
    conversationId: string;
};

const conversationId = async ({ params }: { params: IParams }) => {
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    const session = await getSession();
    
    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header />
                <Body />
                <Form />
            </div>
        </div>
    )
}

export default conversationId;