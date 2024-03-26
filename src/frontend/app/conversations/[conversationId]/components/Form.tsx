'use client';

import MessageInput from "./MessageInput";
import { sereniChatPrompt } from '../prompt';
import useConversation from "../../../../app/hooks/useConversation";


import axios from "axios";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

const Form = () => {
    const { conversationId } = useConversation();
    const [isPreloaded, setIsPreloaded] = useState(false);
    const [sereniResponse, setSereniResponse] = useState('');
    const [lastMessage, setLastMessage] = useState('This is the first message of the conversation.');
    const { 
        register,
        handleSubmit, 
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    // Hugging Face API needs to be preloaded to avoid a cold start with the inference API
    // This is a workaround to avoid the cold start
    useEffect(() => {
        if (!isPreloaded) {
            const preloadSentimentApi = async () => {
                try {
                    await axios.post('/api/sentiment-analysis', { inputs: 'sadness' });
                    setIsPreloaded(true);
                } catch (error) {
                    console.error('ERROR: ', error);
                }
            };
            preloadSentimentApi();
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setValue('message', '', { shouldValidate: true });

            // gets the sentiment of the user message
            const sentimentAnalysisResponse = await axios.post('/api/sentiment-analysis', { inputs: data.message })
            const sentiment = sentimentAnalysisResponse.data;

            // gets the list of synonyms for the sentiment
            const synonyms = await axios.post('http://127.0.0.1:8000/synonyms/', { sentiment });

            // gets the response from sereni chat
            const sereniChatResponse = await axios.post('/api/sereni-chat', {
                system: `${sereniChatPrompt}\n${synonyms.data.join(' ')}`,
                user: data.message,
                assistant: lastMessage
            });

            setSereniResponse(sereniChatResponse.data);
            setLastMessage(sereniResponse as string);
            
            // saves the user message then the sereni chat response
            axios.post('/api/messages', {
                ...data,
                sentiment,
                conversationId,
                isUser: true,
            });

            axios.post('/api/messages', {
                message: sereniChatResponse,
                conversationId,
                isUser: false
            });
        } catch (error) {
            console.error('ERROR: ', error);
        }
    };

    return (
        <div className="mb-12 px-4 ng-white border-none flex items-center gap-2 lg:gap-4 w-full">
            <form 
                action="POST"
                onSubmit={ handleSubmit(onSubmit) }
                className="
                    flex
                    items-center
                    gap-2
                    lg:gap-4
                    w-full
                    justify-center"
            >
                <MessageInput
                    id='message'
                    register={register}
                    errors={errors}
                    required
                    placeholder="Message Serenity..."
                />
                
            </form>
        </div>
    );
}

export default Form;