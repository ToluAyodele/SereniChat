'use client';

import React from 'react';
import EmptyBody from "./components/EmptyBody";

const Home = () => {
    return (
        <div className='lg:pl-80 h-full lg:block hidden'>
            <div className="lg:pl-20 h-full">
                <div className="h-full flex flex-col">
                    <EmptyBody />
                </div>
            </div>
        </div>
    )
}

export default Home;