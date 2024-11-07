

'use client';
import MessageInput from "./MessageInput";
import { sereniChatPrompt } from '../prompt';
import useConversation from "../../../../app/hooks/useConversation";
import axios from "axios"; import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import VoiceButton from '../../../components/voicebutton/VoiceButton';


const Form = () => {    
    const { conversationId } = useConversation();    
    const [isPreloaded, setIsPreloaded] = useState(false);    
    const [lastMessage, setLastMessage] = useState('This is the first message of the conversation.');    
    const [isLoading, setIsLoading] = useState(false);  
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

    const handleMessageSubmit = async (text: string) => {
        setIsLoading(true);

        try {
            // Get detected emotion from sessionStorage
            const detectedEmotion = sessionStorage.getItem('detectedEmotion');

            // Send user message and emotion to the backend
            const response = await axios.post('/api/sereni-chat', {
                user: text,
                system: sereniChatPrompt,
                assistant: lastMessage,
                emotion: detectedEmotion
            });

            console.log('Response from backend:', response.data);

            // Save the response in the UI or use another method for displaying it
            // Example logic for display:
            setLastMessage(response.data);

            // Save user and assistant messages in the backend
            await axios.post('/api/messages', {
                message: text,
                conversationId,
                isUser: true
            });
            await axios.post('/api/messages', {
                message: response.data,
                conversationId,
                isUser: false
            });

        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        handleMessageSubmit(data.message);
        setValue('message', '', { shouldValidate: true });
    };
                    

    
                           
                           
                            return (        
                                <div className="border-none items-center gap-2 lg:gap-4">            
                                    <form                
                                        action="POST"                
                                        onSubmit={handleSubmit(onSubmit)}                
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
                                       
                                       <VoiceButton onTranscription={handleMessageSubmit} />

                                    </form>        
                                    

                                </div>    
                               
                            );
                        }
                       
                        export default Form;








































































// 'use client';
// import MessageInput from "./MessageInput";
// import { sereniChatPrompt } from '../prompt';
// import useConversation from "../../../../app/hooks/useConversation";
// import axios from "axios"; import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
// import React, { useEffect, useState } from "react";
// import VoiceButton from '../../../components/voicebutton/VoiceButton';


// const Form = () => {    
//     const { conversationId } = useConversation();    
//     const [isPreloaded, setIsPreloaded] = useState(false);    
//     const [lastMessage, setLastMessage] = useState('This is the first message of the conversation.');    
//     const [isLoading, setIsLoading] = useState(false);  
//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: {
//             errors,
//         }
//     } = useForm<FieldValues>({
//         defaultValues: {
//             message: ''        
//         }    
//     });    

//     const handleTranscription = async (text: string) => {
//         console.log('Transcription:', text);
//         setIsLoading(true);
    
//         try {
//             // Sending the transcription to the backend explicitly
//             const detectedEmotion = sessionStorage.getItem('detectedEmotion'); // Get emotion if stored
    
//             const response = await axios.post('/api/sereni-chat', {
//                 transcription: text, // Send transcription explicitly
//                 system: sereniChatPrompt,
//                 assistant: lastMessage, // Replace with the last assistant message as needed
//                 emotion: detectedEmotion // Include detected emotion if available
//             });
    
//             console.log('Response from backend:', response.data);
    
//             // Update chat UI with the response
//             // You can call your existing function to display the response
//             // Example: displayChatResponse(response.data);
    
//         } catch (error) {
//             console.error('Error sending transcription:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };
    
    
    
//     // Hugging Face API needs to be preloaded to avoid a cold start with the inference API    
//      // This is a workaround to avoid the cold start    
//       // useEffect(() => {     //     if (!isPreloaded) {    
//         //         const preloadSentimentApi = async () => {    
//             //             try {    
//                 //                 await axios.post('/api/sentiment-analysis', { inputs: 'sadness' });    
//                 //                 setIsPreloaded(true);    
//                 //             } catch (error) {    
//                     //                 console.error('ERROR: ', error);    
//                     //             }    
//                     //         };    
//                     //         preloadSentimentApi();    
//                      //     }    
//                      // })    
//                      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//                         try {
//                             setValue('message', '', { shouldValidate: true });
                            
//                             // Get detected emotion from sessionStorage
//                             const detectedEmotion = sessionStorage.getItem('detectedEmotion');
                            
//                             // Send the emotion along with the user message and assistant's last response
//                             const sereniChatResponse = await axios.post('/api/sereni-chat', {
//                                 system: `${sereniChatPrompt}\n}`,
//                                 user: data.message,
//                                 assistant: lastMessage,
//                                 emotion: detectedEmotion // Add the emotion here
//                             });
                    
//                             // Save the user's message
//                             await axios.post('/api/messages', {
//                                 ...data,
//                                 conversationId,
//                                 isUser: true,
//                             });
                    
//                             // Save the response from SereniChat
//                             await axios.post('/api/messages', {
//                                 message: sereniChatResponse.data,
//                                 conversationId,
//                                 isUser: false
//                             });
                    
//                             setLastMessage(sereniChatResponse.data);
                    
//                         } catch (error) {
//                             console.error('ERROR: ', error);
//                         }
//                     };
                    

    
                           
                           
//                             return (        
//                                 <div className="border-none items-center gap-2 lg:gap-4">            
//                                     <form                
//                                         action="POST"                
//                                         onSubmit={ handleSubmit(onSubmit) }                
//                                         className="                    
//                                             flex                    
//                                             items-center                    
//                                             gap-2                    
//                                             lg:gap-4                    
//                                             w-full                    
//                                             justify-center"            
//                                     >                
                                   
//                                         <MessageInput                    
//                                             id='message'                    
//                                             register={register}                    
//                                             errors={errors}                    
//                                             required                    
//                                             placeholder="Message Serenity..."                
//                                         />                              
                                       
//                                        <VoiceButton onTranscription={handleTranscription} />

//                                     </form>        
                                    

//                                 </div>    
                               
//                             );
//                         }
                       
//                         export default Form;