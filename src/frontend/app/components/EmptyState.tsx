import Image from 'next/image';

const EmptyState = () => {
    return (
        <div className="px-4 py-10 sm:px-6 mt-24 pt-24 lg:px-8 h-full flex justify-center items-center w-full">
            <div className="text-center items-center flex flex-col w-full">
                <Image
                    alt="Logo"
                    height="0"
                    width="250"
                    className="mx-auto mb-8 mt-24 pt-4" 
                    src="/images/serenichat-logo.png"
                    priority={true}
                />
                <h3 className="mt-2 text-2xl font-semibold text-black">
                    Select a chat or start a new conversation
                </h3>
            </div>
        </div>
    );
}

export default EmptyState;
