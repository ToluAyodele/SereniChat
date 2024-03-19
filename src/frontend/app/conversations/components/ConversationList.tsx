"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
import { find } from "lodash";
import { FullConversationType } from "../../types";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import useConversation from "../../hooks/useConversation";
import { useSession } from "next-auth/react";

import ConversationBox from "./ConversationBox";
import { User } from "@prisma/client";

// new imports added
import Avatar from "../../components/desktop-view/Avatar";
import DesktopItem from "../../components/desktop-view/DesktopItem";
import { HiOutlinePlusCircle, HiEllipsisHorizontal, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
// import ProfileDrawer from '../[conversationId]/components/ProfileDrawer'; // for the ellipsis menu

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const router = useRouter();

  const { isOpen, conversationId } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const handleNewChat = () => {
    router.push(`/conversations`);
  }

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });

      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

  }, [pusherKey]);

  return (
    <>
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
                `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="flex flex-col justify-between min-h-screen">
          <div className="px-5">
            <div className="flex justify-between mb-4 pt-4">
              <nav className="mt-4 px-4 cursor-pointer hover:opacity-75 transition">
                <Avatar />
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
            {items.map((item) => (
              <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              />
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
