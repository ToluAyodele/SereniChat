'use client';

import Input from '../../../app/components/inputs/Input';
import Button from '../../../app/components/inputs/Button';
import AuthSocialButton from './AuthSocialButton';
import axios from 'axios';

import React, { useCallback, useState, useEffect } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { BsGoogle } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/conversations');
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const { register, handleSubmit, formState: { errors, } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        const headers = {
            key: 'Access-Control-Allow-Origin',
        };

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false,
                headers
            }).then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials');
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                }
            }).finally(() => setIsLoading(false));
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
        signIn(action, { redirect: false })
        .then((callback) => {
            if (callback?.error) {
                toast.error('Invalid Crednetials');
            }

            if (!callback?.ok && !callback?.error) {
                toast.success('Logged in!');
            }
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <div 
            className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            style={{ marginBottom: '8%'}}
            >
            <div 
                className="bg-neutral-900 px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form
                    method="POST"
                    className="space-y-6" 
                    onSubmit={ handleSubmit(onSubmit) }>
                        {variant === 'REGISTER' && (
                            <Input
                                id="name"
                                label="Name" 
                                register={register}
                                errors={errors}
                                disabled={isLoading}
                                color={'text-gray-200'}
                            />
                        )}
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                        color={'text-gray-200'}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                        color={'text-gray-200'}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type='submit'
                        >
                            {variant === 'LOGIN' ? 'Sign In' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className='mt-6'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-200' />
                        </div>
                        <div className='relative flex justify-center text-md'>
                            <span className="bg-neutral-900 px-2 text-gray-200">
                                Or Continue With
                            </span>
                        </div>
                    </div>
                    <div className='mt-6 flex gap-2'>
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>
                <div className='flex gap-2 justify-center text-md mt-6 px-2'>
                    <div className="text-gray-200">
                        {variant === 'LOGIN' ? 'New To SereniChat?' : 'Already Have An Account?'}
                    </div>
                    <div 
                        onClick={toggleVariant}
                        className='underline cursor-pointer text-teal-500'
                    >
                        {variant === 'LOGIN' ? 'Create An Account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;