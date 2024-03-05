import React from "react";
import Image from "next/image";
import AuthForm from "./components/authentication/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="Logo"
          height="0"
          width="200"
          className="mx-auto mb-6" 
          src="/images/logo.png"
          priority={true}
        />
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
