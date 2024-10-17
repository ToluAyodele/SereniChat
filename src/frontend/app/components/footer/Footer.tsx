'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import MentalHealthButton from './MentalHealthButton';

const Footer = () => {
    const router = useRouter();

    return (
        <footer 
            className="flex-col justify-center text-center w-full bg-teal-500 overflow-hidden border-t-2 border-black border-solid"
            style={{ height: '80vh'}}
        >
            <div className="text-2xl py-12">
                <p> 
                    Find Supportive Organizations Near You
                    <br />
                    <br />
                    👇
                </p>
                <MentalHealthButton 
                    onClick={() => router.push('/mental-organization')}
                />
            </div>
        </footer>
    );
}

export default Footer;