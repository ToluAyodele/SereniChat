'use client';

import { sereniChatPrompt } from '../prompt';
import useConversation from "../../../../app/hooks/useConversation";
import MessageInput from "./MessageInput";

import axios from "axios";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";

const Form = () => {
    const [lastMessage, setLastMessage] = useState('This is the first message of the conversation.');
    const { conversationId } = useConversation();
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
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setValue('message', '', { shouldValidate: true });

            const sentimentAnalysisResponse = await axios.post('/api/sentiment-analysis', { inputs: data.message })
            const sentiment = sentimentAnalysisResponse.data;

            console.log(sentiment);
            const synonyms = await axios.post('http://127.0.0.1:8000/synonyms/', { sentiment });

            const sereniChatResponse = await axios.post('/api/sereni-chat', {
                system: `${sereniChatPrompt}\n${synonyms.data.join(' ')}`,
                user: data.message,
                assistant: lastMessage
            });

            console.log(lastMessage);

            await Promise.all([
                axios.post('/api/messages', {
                    ...data,
                    sentiment,
                    conversationId,
                    isUser: true,
                }),
                setTimeout(() => {
                    axios.post('/api/messages', {
                        message: sereniChatResponse.data,
                        conversationId,
                        isUser: false
                    });
                }, 2500),

                
            ]);
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