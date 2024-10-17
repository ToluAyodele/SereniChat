"use client";

import React, { FC, useState } from "react";

import clsx from "clsx";
import axios from "axios";
import toast from 'react-hot-toast';

import { User } from "@prisma/client";
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { HiMiniTrash } from "react-icons/hi2";
import { HiArrowLeftOnRectangle, HiEllipsisHorizontal, HiOutlinePlusCircle } from "react-icons/hi2";

import ConversationBox from "./ConversationBox";
import { FullConversationType } from "../../types";
import Avatar from "../../components/desktop-view/Avatar";
import SettingsModal from "../../components/modals/SettingsModal";
import DesktopItem from "../../components/desktop-view/DesktopItem";
import MobileConversations from "../../components/mobile-view/MobileConversations";

interface ConversationListProps {
  initialItems: FullConversationType[];
  user?: User;
}

const ConversationList: FC<ConversationListProps> = ({
  initialItems,
  user,
}) => {
  const [items, setItems] = useState(initialItems);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const router = useRouter();

  const handleNewChat = () => {
    axios.post('/api/conversations', {
    }).then((resp) => {
      router.push(`/conversations/${resp.data.id}`);

      setItems((current) => {
        return [resp.data, ...current];
      })
    })
  }

  const deleteConversation = (conversationId: string) => {
    axios.delete(`/api/conversations/${conversationId}`, {
        data: {
            conversationId: conversationId
        }
    })
    .then(() => {
        router.push('/conversations');
        toast.success('Conversation deleted successfully!');

        setItems((current) => {
          return current.filter((item) => 
            item.id !== conversationId)
        })
    })
    .catch(() => toast.error('Something went wrong!'))
}

  return (
    <>
      <SettingsModal
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentUser={user}
      />
      <MobileConversations />
      <aside
        className={clsx(
          `
            fixed
            inset-y-0
            pb-20
            lg:pb-0
            lg:w-96
            lg:block
            overflow-y-auto
            border-none
            bg-teal-600
            w-full
            left-0
            hidden
          `,
          `sm:hidden`
        )}
      >
        <div className="flex flex-col justify-between min-h-screen">
          <div className="px-5">
            <div className="flex justify-between mb-4 pt-4">
              <nav className="mt-4 px-4 cursor-pointer hover:opacity-75 transition">
                <Avatar 
                  user={ user }
                  logo={ '/images/default-logo.png' }
                />
              </nav>
              <div className="py-5">
                <HiEllipsisHorizontal
                  size={38}
                  onClick={() => setDrawerOpen(true)}
                  className="text-black hover:text-teal-200 transition cursor-pointer"
                />
              </div>
            </div>
            <button
              onClick={ handleNewChat }
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
            { items.map((item) => (
              <div key={item.id} className="flex items-center text-xl">
                <ConversationBox
                  data={item}
                />
                <HiMiniTrash
                  size={28}
                  className="text-black hover:text-teal-200 transition cursor-pointer"
                  onClick={ () => deleteConversation(item.id) }
                />
              </div>
          ))}

          </div>
          <div className="mt-auto">
            <div className="text-2xl font-bold list-none">
              <DesktopItem
                label={'Logout'}
                icon={HiArrowLeftOnRectangle}
                href={'/'}
                onClick={ () => signOut() }
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
