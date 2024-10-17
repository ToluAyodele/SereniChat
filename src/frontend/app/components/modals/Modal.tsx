"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
  modalHeight?: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, modalHeight }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="
                  relative 
                  transform 
                  overflow-hidden 
                  rounded-lg 
                  bg-black
                  px-4 
                  pb-4
                  pt-5 
                  text-left 
                  shadow-xl 
                  transition-all
                  w-full
                  sm:my-8 
                  sm:w-full 
                  sm:max-w-3xl
                  sm:p-6"
                  style={{height: modalHeight}}
              >
                <div className="absolute right-0 top-0 pr-4 pt-4 sm:block z-10">
                  <button
                    className="
                            rounded-md 
                            bg-white 
                            text-gray-400 
                            hover:text-gray-500 
                            focus:outline-none 
                            focus:ring-2 
                            focus:sky-ring-500 
                            focus:ring-offset-2
                        "
                    onClick={onClose}
                  >
                    <span className="sr-only">Close Panel</span>
                    <IoClose className="h-6 w-6" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
