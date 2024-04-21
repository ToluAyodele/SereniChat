import { User } from '@prisma/client';
import React, { FC, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

import Modal from './Modal';

interface FaceEmotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser?: User;
}

const FaceEmotionModal: FC<FaceEmotionModalProps> = ({ isOpen, onClose }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
                await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
                await faceapi.nets.faceExpressionNet.loadFromUri('/models');
            } catch (err) {
                console.error("Failed to load models", err);
            }
        }

        const setUpCamera = async () => {
            if (navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true, 
                    audio: false 
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    console.log("Video stream set up")
                }
            }
        }

        const startFaceDetection = async () => {
            const canvas = canvasRef.current;
            if (!canvas) {
                return;
            }
    
            const context = canvas.getContext('2d');
            if (!context) {
                return;
            }
            
            setInterval(async () => {
                if (videoRef.current && canvasRef.current) {
                    const detections = await faceapi.detectAllFaces(videoRef.current,
                        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    
                    canvasRef.current.replaceWith(canvas);
                
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

                }
            }, 100);
        };
        

        loadModels();
        setUpCamera();
        startFaceDetection();
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} modalHeight={"650px"}>
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
        </Modal>
    );
}

export default FaceEmotionModal;
