import { User } from '@prisma/client';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import GaugeChart from 'react-gauge-chart';

import Modal from './Modal';
import { get, set } from 'lodash';

interface FaceEmotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser?: User;
}

const FaceEmotionModal: FC<FaceEmotionModalProps> = ({ isOpen, onClose }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // const [faceEmotionPercentage, setFaceEmotionPercentage] = useState<number>(0.50);
    const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
    // const [gaugeValue, setGaugeValue] = useState<number>(0.50);
    const [emotion, setEmotion] = useState<string | null>('');

    

    // const consumeFaceEmotions = async (emotions) => {
    //     await emotions.forEach((emotion, index) => {
    //         switch(index) {
    //             case 0:
    //             case 1:
    //             case 2:
    //                 const calculateNegativeEmotions = faceEmotionPercentage + emotion;
    //                 if (calculateNegativeEmotions > 100) {
    //                     setFaceEmotionPercentage(100);
    //                 } else {
    //                     setFaceEmotionPercentage(calculateNegativeEmotions);
    //                 }
    //                 break;

    //             case 3:
    //                 if (faceEmotionPercentage < 50) {
    //                     setFaceEmotionPercentage(faceEmotionPercentage + emotion);
    //                 } else if (faceEmotionPercentage > 50) {
    //                     setFaceEmotionPercentage(faceEmotionPercentage - emotion);
    //                 }
    //                 break;

    //             case 4:
    //             case 5:
    //                 const calculatePositiveEmotions = faceEmotionPercentage - emotion;
    //                 if (calculatePositiveEmotions < 0) {
    //                     setFaceEmotionPercentage(0);
    //                 } else {
    //                     setFaceEmotionPercentage(calculatePositiveEmotions);
    //                 }
    //                 break;
                
    //             default:
    //                 break;
    //         }
    //     });
    // };

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
    };


    useEffect(() => {
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
    
                    faceapi.draw.drawDetections(canvas, resized);
                    faceapi.draw.drawFaceLandmarks(canvas, resized);
                    faceapi.draw.drawFaceExpressions(canvas, resized);

                    getKeyOfMaxValue(detections[0].expressions);
                }
            }, 100);
        };
        
        startFaceDetection();
    });


    return (
        <>  
            <Modal isOpen={isOpen} onClose={onClose} modalHeight={"1150px"}>
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
                    <div className="text-white">
                        { emotion }
                    </div>
                </div>
                {/* <GaugeChart
                    id="gauge-chart5"
                    nrOfLevels={10}
                    arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]}
                    colors={['#5BE12C', '#F5CD19', '#EA4228']}
                    percent={Math.round(gaugeValue * 100) / 100}
                    arcPadding={0.02}
                    animate={false}
                    style={{ 'height' : '250px' ,'marginTop' : '650px'}}
                /> */}
            </Modal>
        </>
    );
}

export default FaceEmotionModal;