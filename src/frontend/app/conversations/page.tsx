'use client';

import React from 'react';
import EmptyState from "../components/EmptyState";

const Home = () => {
    return (
        <div className='lg:pl-80 h-full lg:block hidden'>
            <div className="lg:pl-20 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState 
                        text={"Select a chat or start a new conversation"}
                        
                    />
                </div>
            </div>
        </div>
    )
}

export default Home;