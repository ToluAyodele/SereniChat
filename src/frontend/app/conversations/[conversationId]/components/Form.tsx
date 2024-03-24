'use client';

import useConversation from "../../../../app/hooks/useConversation";
import MessageInput from "./MessageInput";

import axios from "axios";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import React from "react";

const Form = () => {
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

            const sentimentAnalysisResponse = await axios.post('/api/sentiment-analysis', {
                inputs: data.message
            })

            const sentiment = sentimentAnalysisResponse.data;

            /* - send the system message, user message, prev gpt response as a request to the api
                - the prev gpt response will be optional just incase it is a new conversation
            */

            // Temporary response to simulate SereniChat's response
            await Promise.all([
                axios.post('/api/messages', {
                    ...data,
                    sentiment,
                    conversationId,
                    isUser: true,
                }),
                setTimeout(() => {
                    axios.post('/api/messages', {
                        message: 'Hello! I am SereniChat, your virtual therapist.',
                        conversationId,
                        isUser: false
                    })
                }, 3000)
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