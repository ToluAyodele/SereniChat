'use client';
import MessageInput from "./MessageInput";
import { sereniChatPrompt } from '../prompt';
import useConversation from "../../../../app/hooks/useConversation";
import axios from "axios"; import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

const Form = () => {    
    const { conversationId } = useConversation();    
    const [isPreloaded, setIsPreloaded] = useState(false);    
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
      // useEffect(() => {     //     if (!isPreloaded) {    
        //         const preloadSentimentApi = async () => {    
            //             try {    
                //                 await axios.post('/api/sentiment-analysis', { inputs: 'sadness' });    
                //                 setIsPreloaded(true);    
                //             } catch (error) {    
                    //                 console.error('ERROR: ', error);    
                    //             }    
                    //         };    
                    //         preloadSentimentApi();    
                     //     }    
                     // })    
                     const onSubmit: SubmitHandler<FieldValues> = async (data) => {
                        try {
                            setValue('message', '', { shouldValidate: true });
                            
                            // Get detected emotion from sessionStorage
                            const detectedEmotion = sessionStorage.getItem('detectedEmotion');
                            
                            // Send the emotion along with the user message and assistant's last response
                            const sereniChatResponse = await axios.post('/api/sereni-chat', {
                                system: `${sereniChatPrompt}\n}`,
                                user: data.message,
                                assistant: lastMessage,
                                emotion: detectedEmotion // Add the emotion here
                            });
                    
                            // Save the user's message
                            await axios.post('/api/messages', {
                                ...data,
                                conversationId,
                                isUser: true,
                            });
                    
                            // Save the response from SereniChat
                            await axios.post('/api/messages', {
                                message: sereniChatResponse.data,
                                conversationId,
                                isUser: false
                            });
                    
                            setLastMessage(sereniChatResponse.data);
                    
                        } catch (error) {
                            console.error('ERROR: ', error);
                        }
                    };
                    

    
                           
                           
                            return (        
                                <div className="border-none items-center gap-2 lg:gap-4">            
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