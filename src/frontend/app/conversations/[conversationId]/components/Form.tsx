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
        setValue('message', '', { shouldValidate: true });

        console.log(conversationId, 'convoID');

        axios.post('/api/messages', {
            ...data,
            conversationId
        })
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