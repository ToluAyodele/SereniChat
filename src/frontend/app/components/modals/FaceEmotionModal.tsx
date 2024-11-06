// import { User } from '@prisma/client';
// import React, { FC, useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';
// import clsx from 'clsx';

// import Modal from './Modal';

// interface FaceEmotionModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     currentUser?: User;
// }

// const FaceEmotionModal: FC<FaceEmotionModalProps> = ({ isOpen, onClose }) => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);

//     const [emotion, setEmotion] = useState<string | null>('');
//     const [emotionColor, setEmotionColor] = useState<string>('bg-white');
//     const [emotionValue, setEmotionValue] = useState<number>(0);
//     const [emotionDetectionCount, setEmotionDetectionCount] = useState<number>(0);
//     const [emotionPercentage, setEmotionPercentage] = useState<string>('50%');
//     const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);

//     // Function to clear stored emotion and close the modal
//     const handleClose = () => {
//         sessionStorage.removeItem('detectedEmotion'); // Clear stored emotion on close
//         onClose();  // Call the original onClose function to actually close the modal
//     };

//     const loadModels = async () => {
//         try {
//             await Promise.all([
//                 faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//                 faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//                 faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//                 faceapi.nets.faceExpressionNet.loadFromUri('/models')
//             ]);
//         } catch (err) {
//             console.error("Failed to load models", err);
//         }
//     };

//     const setUpCamera = async () => {
//         if (navigator.mediaDevices.getUserMedia) {
//             const stream = await navigator.mediaDevices.getUserMedia({
//                 video: true, 
//                 audio: false 
//             });
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//             }
//         }
//     }

//     const getKeyOfMaxValue = (obj) => {
//         let maxKey: string | null = null;
//         let maxValue = Number.NEGATIVE_INFINITY;
    
//         for (const [key, value] of Object.entries(obj)) {
//             if (typeof value === 'number' && value > maxValue) {
//                 maxKey = key;
//                 maxValue = value;
//             }
//         }

//         setEmotion(maxKey);
//         setEmotionColor(getColor(maxKey));
//         setEmotionValue(maxValue);
//         setEmotionDetectionCount(emotionDetectionCount + 1);
//         setEmotionPercentage(`${((emotionValue / emotionDetectionCount) * 100) % 100}%`);

//         // Save the first detected emotion other than neutral
//         if (maxKey !== 'neutral' && !sessionStorage.getItem('detectedEmotion')) {
//             sessionStorage.setItem('detectedEmotion', maxKey);
//         }
//     };

//     const getColor = (emotion: string | null) => {
//         switch (emotion) {
//             case 'neutral':
//                 return 'bg-gray-500';
//             case 'happy':
//                 return 'bg-green-500';
//             case 'sad':
//                 return 'bg-blue-500';
//             case 'angry':
//                 return 'bg-red-500';
//             case 'fearful':
//                 return 'bg-yellow-500';
//             case 'disgusted':
//                 return 'bg-purple-500';
//             case 'surprised':
//                 return 'bg-indigo-500';
//             default:
//                 return 'bg-white';
//         }
//     };

//     useEffect(() => {
//         if (isOpen && !modelsLoaded) {
//             loadModels();
//             setUpCamera();
//             setModelsLoaded(true);
//         }

//         if (!isOpen) {
//             setModelsLoaded(false);
//         }

//     }, [isOpen, modelsLoaded]);

//     useEffect(() => {
//         const startFaceDetection = async () => {
//             const canvas = canvasRef.current;
//             if (!canvas) {
//                 return;
//             }
            
//             setInterval(async () => {
//                 if (videoRef.current && canvasRef.current) {
//                     const detections = await faceapi.detectAllFaces(videoRef.current,
//                         new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                    
//                     if (detections.length === 0 || !detections[0].expressions) {
//                         return;
//                     }

//                     faceapi.matchDimensions(canvas, {
//                         width: canvas.width,
//                         height: canvas.height
//                     });
    
//                     const resized = faceapi.resizeResults(detections, {
//                         width: canvas.width,
//                         height: canvas.height
//                     });

//                     // console.log(detections)
    
//                     faceapi.draw.drawDetections(canvas, resized);
//                     faceapi.draw.drawFaceLandmarks(canvas, resized);
//                     faceapi.draw.drawFaceExpressions(canvas, resized);

//                     //This outputs the max value of each time a facial emotion is detected
//                     getKeyOfMaxValue(detections[0].expressions);
//                 }
//             }, 1000);
//         };
        
//         startFaceDetection();
//     });

//     return (
//         <>  
//             <Modal isOpen={isOpen} onClose={handleClose} modalHeight={"1150px"}>
//                 <div className='camera flex justify-center items-center'>
//                     <canvas ref={canvasRef} className="absolute z-10" style={{ marginTop : '580px'}} height={510} width={700} />
//                     <video 
//                         ref={videoRef} 
//                         id='video' 
//                         width="720"
//                         autoPlay={true}
//                         style={{ 'height' : '550px'}}
//                         className='absolute top-12 z-0'>
//                     </video>
//                 </div>
//                 <div className="text-white" style={{ marginTop: '585px', fontSize: '32px'}}>
//                     { emotion }
//                 </div>
//                 <div
//                     className={clsx(`
//                         ${emotionColor} 
//                         h-12 
//                         transition-all 
//                         ease-in-out 
//                         duration-100
//                     `)}
//                     style={{ width: emotionPercentage }}>
//                 </div>
//             </Modal>
//         </>
//     );
// }

// export default FaceEmotionModal;

import { User } from '@prisma/client';
import React, { FC, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import clsx from 'clsx';

// import Modal from './Modal';

// interface FaceEmotionModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     currentUser?: User;
// }

// const FaceEmotionModal: FC<FaceEmotionModalProps> = ({ isOpen, onClose }) => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);

//     const [emotion, setEmotion] = useState<string | null>('');
//     const [emotionColor, setEmotionColor] = useState<string>('bg-white');
//     const [emotionValue, setEmotionValue] = useState<number>(0);
//     const [emotionDetectionCount, setEmotionDetectionCount] = useState<number>(0);
//     const [emotionPercentage, setEmotionPercentage] = useState<string>('50%');
//     const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);

//     // Function to clear stored emotion and close the modal
//     const handleClose = () => {
//         sessionStorage.removeItem('detectedEmotion'); // Clear stored emotion on close
//         onClose();  // Call the original onClose function to actually close the modal
//     };

//     const loadModels = async () => {
//         try {
//             await Promise.all([
//                 faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//                 faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//                 faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//                 faceapi.nets.faceExpressionNet.loadFromUri('/models')
//             ]);
//         } catch (err) {
//             console.error("Failed to load models", err);
//         }
//     };

//     const setUpCamera = async () => {
//         if (navigator.mediaDevices.getUserMedia) {
//             const stream = await navigator.mediaDevices.getUserMedia({
//                 video: true, 
//                 audio: false 
//             });
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//             }
//         }
//     }

//     const getKeyOfMaxValue = (obj) => {
//         let maxKey: string | null = null;
//         let maxValue = Number.NEGATIVE_INFINITY;
    
//         for (const [key, value] of Object.entries(obj)) {
//             if (typeof value === 'number' && value > maxValue) {
//                 maxKey = key;
//                 maxValue = value;
//             }
//         }

//         setEmotion(maxKey);
//         setEmotionColor(getColor(maxKey));
//         setEmotionValue(maxValue);
//         setEmotionDetectionCount(emotionDetectionCount + 1);
//         setEmotionPercentage(`${((emotionValue / emotionDetectionCount) * 100) % 100}%`);

//         // Save the first detected emotion other than neutral
//         if (maxKey !== 'neutral' && !sessionStorage.getItem('detectedEmotion')) {
//             sessionStorage.setItem('detectedEmotion', maxKey);
//         }
//     };

//     const getColor = (emotion: string | null) => {
//         switch (emotion) {
//             case 'neutral':
//                 return 'bg-gray-500';
//             case 'happy':
//                 return 'bg-green-500';
//             case 'sad':
//                 return 'bg-blue-500';
//             case 'angry':
//                 return 'bg-red-500';
//             case 'fearful':
//                 return 'bg-yellow-500';
//             case 'disgusted':
//                 return 'bg-purple-500';
//             case 'surprised':
//                 return 'bg-indigo-500';
//             default:
//                 return 'bg-white';
//         }
//     };

//     useEffect(() => {
//         if (isOpen && !modelsLoaded) {
//             loadModels();
//             setUpCamera();
//             setModelsLoaded(true);
//         }

//         if (!isOpen) {
//             setModelsLoaded(false);
//         }

//     }, [isOpen, modelsLoaded]);

//     useEffect(() => {
//         const startFaceDetection = async () => {
//             const canvas = canvasRef.current;
//             if (!canvas) {
//                 return;
//             }
            
//             setInterval(async () => {
//                 if (videoRef.current && canvasRef.current) {
//                     const detections = await faceapi.detectAllFaces(videoRef.current,
//                         new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                    
//                     if (detections.length === 0 || !detections[0].expressions) {
//                         return;
//                     }

//                     faceapi.matchDimensions(canvas, {
//                         width: canvas.width,
//                         height: canvas.height
//                     });
    
//                     const resized = faceapi.resizeResults(detections, {
//                         width: canvas.width,
//                         height: canvas.height
//                     });

//                     // console.log(detections)
    
//                     faceapi.draw.drawDetections(canvas, resized);
//                     faceapi.draw.drawFaceLandmarks(canvas, resized);
//                     faceapi.draw.drawFaceExpressions(canvas, resized);

//                     //This outputs the max value of each time a facial emotion is detected
//                     getKeyOfMaxValue(detections[0].expressions);
//                 }
//             }, 1000);
//         };
        
//         startFaceDetection();
//     });

//     return (
//         <>  
//             <Modal isOpen={isOpen} onClose={handleClose} modalHeight={"1150px"}>
//                 <div className='camera flex justify-center items-center'>
//                     <canvas ref={canvasRef} className="absolute z-10" style={{ marginTop : '580px'}} height={510} width={700} />
//                     <video 
//                         ref={videoRef} 
//                         id='video' 
//                         width="720"
//                         autoPlay={true}
//                         style={{ 'height' : '550px'}}
//                         className='absolute top-12 z-0'>
//                     </video>
//                 </div>
//                 <div className="text-white" style={{ marginTop: '585px', fontSize: '32px'}}>
//                     { emotion }
//                 </div>
//                 <div
//                     className={clsx(`
//                         ${emotionColor} 
//                         h-12 
//                         transition-all 
//                         ease-in-out 
//                         duration-100
//                     `)}
//                     style={{ width: emotionPercentage }}>
//                 </div>
//             </Modal>
//         </>
//     );
// }

// export default FaceEmotionModal;

// import React, { useState, useRef, useEffect } from 'react';
// import * as faceapi from 'face-api.js';

const FaceEmotionModal = () => {
    const [detectedEmotion, setDetectedEmotion] = useState('neutral');
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load the face-api models
    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceExpressionNet.loadFromUri('/models');
                console.log("Models loaded successfully");
            } catch (error) {
                console.error("Error loading models:", error);
            }
        };

        loadModels();
    }, []);

    // Start the webcam when the modal opens
    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing webcam:", error);
        }
    };

    // Detect emotions from the webcam feed
    const detectEmotion = async () => {
        if (videoRef.current) {
            const detections = await faceapi
                .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();

            if (detections.length > 0) {
                const expressions = detections[0].expressions;

                console.log("Detected expressions:", expressions);

                // Get the emotion with the highest probability
                const emotion = Object.keys(expressions).reduce((a, b) => (expressions[a] > expressions[b] ? a : b));

                // Always update the detected emotion display
                setDetectedEmotion(emotion);

                // Only save the first non-neutral emotion if `sessionStorage` has no stored emotion
                const storedEmotion = sessionStorage.getItem('detectedEmotion');
                if (emotion !== 'neutral' && !storedEmotion) {
                    sessionStorage.setItem('detectedEmotion', emotion);
                }
            } else {
                setDetectedEmotion('neutral');
            }
        }
    };

    // Open modal and reset for a new session
    const openModal = () => {
        setIsModalOpen(true);
        sessionStorage.removeItem('detectedEmotion'); // Clear previous emotion in sessionStorage
        startVideo();
    };

    useEffect(() => {
        if (isModalOpen) {
            // Set an interval to continuously detect emotions while the modal is open
            const emotionDetectionInterval = setInterval(detectEmotion, 1000); // Detect every 1 second

            // Clear the interval when the modal is closed
            return () => clearInterval(emotionDetectionInterval);
        }
    }, [isModalOpen]);

    return (
        <>
            <button 
                onClick={openModal} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Open Face Emotion Detection
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-xl font-bold mb-4">Face Emotion Detection</h2>
                        <div className="relative">
                            <video 
                                ref={videoRef} 
                                autoPlay 
                                muted 
                                className="w-full h-auto mb-4 rounded-md border border-gray-300" 
                            />
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
                            <p className="text-lg font-semibold">Detected Emotion: <span className="text-blue-600">{detectedEmotion}</span></p>
                        </div>

                        <div className="flex justify-end">
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FaceEmotionModal;