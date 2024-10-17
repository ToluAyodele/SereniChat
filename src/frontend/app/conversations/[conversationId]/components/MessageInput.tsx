'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import React, { FC, useState } from "react";
import { HiArrowUp, HiCamera } from "react-icons/hi2";

import FaceEmotionModal from "../../../components/modals/FaceEmotionModal";
import { set } from "lodash";

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
    const [textAreaHeight, setTextAreaHeight] = useState('16px');
    const [drawerOpen, setDrawerOpen] = useState(false);



    const handleTextChange = (e) => {
        const textarea = e.target;
        textarea.style.height = textAreaHeight;
        
        const scHeight = textarea.scrollHeight;
        textarea.style.height = `${scHeight}px`;
        setTextAreaHeight(`${scHeight}px`);

        const dynamicDiv = document.getElementById('dynamic-div') as HTMLElement;
        if (dynamicDiv) {
            dynamicDiv.style.height = `${scHeight + 20}px`;
        }
    };

    return (
        <>
            <FaceEmotionModal 
                isOpen={drawerOpen} 
                onClose={() => setDrawerOpen(false)}
            />
            <div id="dynamic-div" className="h-24 fixed flex w-1/2 lg:w-1/2 xl:w-1/2 bottom-0 justify-center">
                <button
                    onClick={ () => setDrawerOpen(true) }
                    className="
                        cursor-pointer
                        transition
                        bg-white
                    "
                >
                    <HiCamera
                        size={36}
                        className="
                            text-black 
                            rounded-lg 
                            bg-white 
                            border-2 
                            border-black
                            p-1
                            mr-2
                            mb-8
                        " 
                    />
                </button>
                <div className="w-full lg:w-full xl:w-1/2 mr-5 bg-white">
                    <textarea
                        id={id}
                        autoComplete={id}
                        { ...register(id, { required: true, minLength: 1 } )}
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
                            resize-none
                        "
                    />
                </div>
                <button
                    type="submit"
                    className="
                        cursor-pointer
                        transition
                        bg-white
                        "
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
                            mb-8
                        " 
                    />
                </button>
            </div>
        </>
    );
}

export default MessageInput;
