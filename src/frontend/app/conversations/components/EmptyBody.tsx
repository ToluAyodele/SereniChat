'use client';

import React, { } from "react";

import EmptyState from '../../components/EmptyState';

const EmptyBody = () => {
    return (
        <div className="flex-1 h-full justify-center overflow-y-auto">
            <EmptyState />
        </div>
    );
}

export default EmptyBody;