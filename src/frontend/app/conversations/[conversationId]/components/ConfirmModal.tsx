'use client';

import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import React, { FC, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '../../../components/inputs/Button';
import useConversation from '../../../../app/hooks/useConversation';
import Modal from '../../../components/modals/Modal';
import { FiAlertTriangle } from 'react-icons/fi';


interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

const ConirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);
    const onDelete = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/conversations/${conversationId}`)
            .then(() => {
                onClose();
                router.push('/conversations');
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
    }, [conversationId, router, onClose]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="sm:flex sm:items-start">
                <div
                    className='mx-auto flex h-12 w-12 flex-shrink-0 items-center rounded-full justify-center bg-red-100 sm:mx-0 sm:h-10 sm:w-10'
                >
                    <FiAlertTriangle className='h-6 w-6 text-red-600' />                        
                </div>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <Dialog.Title
                        as='h3'
                        className='
                            text-base
                            font-semibold
                            leading-6
                            text-gray-900
                        '
                    >
                        Delete Conversation
                    </Dialog.Title>
                    <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                            Are you sure you want to delete this conversation? The action cannot be undone.
                        </p>
                    </div>
                </div>
                <div className='mt-5 md:mt-14 sm:flex sm:flex-row-reverse pt-6'>
                    <Button
                        disabled={isLoading}
                        danger
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                    <Button
                        disabled={isLoading}
                        secondary
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ConirmModal;