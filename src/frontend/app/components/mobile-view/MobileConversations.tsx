'use client';

import React from "react";
import EmptyState from "../EmptyState";
import clsx from "clsx";
import { HiOutlinePlusCircle } from "react-icons/hi2";

const MobileConversations = () => {
  return ( 
    <div className={clsx(
      `h-full`,
      `xs:block lg:hidden`
    )}>
      <div className="h-full flex flex-col">
          <EmptyState />
          <button
        className="
          flex
          items-center
          justify-between
          text-3xl 
          text-black 
          bg-white 
          rounded-lg 
          text-center
          px-5
          ml-4
          mb-12
          mt-8
          cursor-pointer"
        style={{ width: "319px" }}
      >
        <div className="py-3 ml-4">
          <HiOutlinePlusCircle size={40} />
        </div>
        <span className="mr-8">New Chat</span>
      </button>
      </div>
    </div>
  );
}

export default MobileConversations;