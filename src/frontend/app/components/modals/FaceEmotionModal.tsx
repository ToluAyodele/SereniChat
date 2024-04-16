'use client';

import { User } from '@prisma/client';
import React, { FC, useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

import Modal from './Modal';

interface FaceEmotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser?: User;
}

const FaceEmotionModal: FC<FaceEmotionModalProps> = ({ isOpen, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const startVideo = async () => {
        // load facial recognition models models
        try {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
            await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        } catch (err) {
            console.error("Failed to load models", err);
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true, audio: false
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Failed to detect face", err);
        }
    }

    useEffect(() => {
        startVideo();
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} modalHeight={"650px"}>
            <div className='camera'>
                <video 
                    ref={videoRef} 
                    id='video' 
                    width="720" 
                    autoPlay={true}
                    className='absolute top-12'>
                </video>
                <canvas id='overlay'></canvas>
            </div>
        </Modal>
    );
}

export default FaceEmotionModal;