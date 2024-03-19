'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import React, { FC, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const MessageInput: FC<MessageInputProps> = ({
    placeholder,
    id,
    type,
    required,
    register,
    errors
}) => {
    const [height, setHeight] = useState('auto');
    const router = useRouter();


    const handleTextChange = (e) => {
        const textarea = e.target;
        textarea.style.height = '16px';
        
        const scHeight = textarea.scrollHeight;
        textarea.style.height = `${scHeight}px`;
        setHeight(`${scHeight}px`);
    };

    // const handleSubmit = () => {
    //     if (!user || !user.id) {
    //         console.log('no user!');
    //         return;
    //     }

    //     axios.post('/api/conversations', {
    //         userId: user.id
    //     }).then((resp) => {
    //         router.push(`/conversation/${resp.data.id}`);
    //     });
    // };

    return (
        <div className="relative flex w-1/2 px-16">
            <textarea
                id={id}
                autoComplete={id}
                { ...register(id, { required: true, minLength: 4 } )}
                placeholder={ placeholder }
                onChange={ handleTextChange }
                className="
                    text-black
                    placeholder-black
                    text-lg
                    bg-neutral-300
                    w-full
                    rounded-lg
                    focus:outline-none
                    p-4
                    max-h-64
                    h-16
                    overflow-y-hidden
                    resize-none
                    mx-16
                "
            />
            <button
                // onClick={ handleSubmit }
                type="submit"
                className="
                    pr-3
                    pt-3
                    cursor-pointer
                    transition
                    absolute
                    h-12
                    w-12
                    top-0
                    bottom-0
                    right-0"
                style={{ marginRight: '135px' }}
            >
                    <HiArrowUp 
                        size={36}
                        className="
                            text-black 
                            rounded-lg 
                            bg-white 
                            border-2 
                            border-black
                            p-1
                            mr-2
                        " 
                    />
                </button>
        </div>
    );
}

export default MessageInput;
