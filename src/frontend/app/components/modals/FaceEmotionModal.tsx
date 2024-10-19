import { User } from '@prisma/client';
import React, { FC, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import clsx from 'clsx';

import Modal from './Modal';

interface FaceEmotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser?: User;
}

const FaceEmotionModal: FC<FaceEmotionModalProps> = ({ isOpen, onClose }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [emotion, setEmotion] = useState<string | null>('');
    const [emotionColor, setEmotionColor] = useState<string>('bg-white');
    const [emotionValue, setEmotionValue] = useState<number>(0);
    const [emotionDetectionCount, setEmotionDetectionCount] = useState<number>(0);
    const [emotionPercentage, setEmotionPercentage] = useState<string>('50%');
    const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);

    // Function to clear stored emotion and close the modal
    const handleClose = () => {
        sessionStorage.removeItem('detectedEmotion'); // Clear stored emotion on close
        onClose();  // Call the original onClose function to actually close the modal
    };

    const loadModels = async () => {
        try {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models')
            ]);
        } catch (err) {
            console.error("Failed to load models", err);
        }
    };

    const setUpCamera = async () => {
        if (navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true, 
                audio: false 
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        }
    }

    const getKeyOfMaxValue = (obj) => {
        let maxKey: string | null = null;
        let maxValue = Number.NEGATIVE_INFINITY;
    
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'number' && value > maxValue) {
                maxKey = key;
                maxValue = value;
            }
        }

        setEmotion(maxKey);
        setEmotionColor(getColor(maxKey));
        setEmotionValue(maxValue);
        setEmotionDetectionCount(emotionDetectionCount + 1);
        setEmotionPercentage(`${((emotionValue / emotionDetectionCount) * 100) % 100}%`);

        // Save the first detected emotion other than neutral
        if (maxKey !== 'neutral' && !sessionStorage.getItem('detectedEmotion')) {
            sessionStorage.setItem('detectedEmotion', maxKey);
        }
    };

    const getColor = (emotion: string | null) => {
        switch (emotion) {
            case 'neutral':
                return 'bg-gray-500';
            case 'happy':
                return 'bg-green-500';
            case 'sad':
                return 'bg-blue-500';
            case 'angry':
                return 'bg-red-500';
            case 'fearful':
                return 'bg-yellow-500';
            case 'disgusted':
                return 'bg-purple-500';
            case 'surprised':
                return 'bg-indigo-500';
            default:
                return 'bg-white';
        }
    };

    useEffect(() => {
        if (isOpen && !modelsLoaded) {
            loadModels();
            setUpCamera();
            setModelsLoaded(true);
        }

        if (!isOpen) {
            setModelsLoaded(false);
        }

    }, [isOpen, modelsLoaded]);

    useEffect(() => {
        const startFaceDetection = async () => {
            const canvas = canvasRef.current;
            if (!canvas) {
                return;
            }
            
            setInterval(async () => {
                if (videoRef.current && canvasRef.current) {
                    const detections = await faceapi.detectAllFaces(videoRef.current,
                        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                    
                    if (detections.length === 0 || !detections[0].expressions) {
                        return;
                    }

                    faceapi.matchDimensions(canvas, {
                        width: canvas.width,
                        height: canvas.height
                    });
    
                    const resized = faceapi.resizeResults(detections, {
                        width: canvas.width,
                        height: canvas.height
                    });

                    // console.log(detections)
    
                    faceapi.draw.drawDetections(canvas, resized);
                    faceapi.draw.drawFaceLandmarks(canvas, resized);
                    faceapi.draw.drawFaceExpressions(canvas, resized);

                    //This outputs the max value of each time a facial emotion is detected
                    getKeyOfMaxValue(detections[0].expressions);
                }
            }, 1000);
        };
        
        startFaceDetection();
    });

    return (
        <>  
            <Modal isOpen={isOpen} onClose={handleClose} modalHeight={"1150px"}>
                <div className='camera flex justify-center items-center'>
                    <canvas ref={canvasRef} className="absolute z-10" style={{ marginTop : '580px'}} height={510} width={700} />
                    <video 
                        ref={videoRef} 
                        id='video' 
                        width="720"
                        autoPlay={true}
                        style={{ 'height' : '550px'}}
                        className='absolute top-12 z-0'>
                    </video>
                </div>
                <div className="text-white" style={{ marginTop: '585px', fontSize: '32px'}}>
                    { emotion }
                </div>
                <div
                    className={clsx(`
                        ${emotionColor} 
                        h-12 
                        transition-all 
                        ease-in-out 
                        duration-100
                    `)}
                    style={{ width: emotionPercentage }}>
                </div>
            </Modal>
        </>
    );
}

export default FaceEmotionModal;
