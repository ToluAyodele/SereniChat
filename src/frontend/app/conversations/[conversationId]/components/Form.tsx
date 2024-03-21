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
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
            try {
                setValue('message', '', { shouldValidate: true });

                axios.post('/api/messages', {
                    ...data,
                    conversationId,
                    isUser: true
                });

                const sereniChatResponse = 'Hello! I am SereniChat, your virtual therapist.'

                setTimeout(async () => {
                    axios.post('/api/messages', {
                        message: sereniChatResponse,
                        conversationId,
                        isUser: false
                    })
                }, 2000);

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