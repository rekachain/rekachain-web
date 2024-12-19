import { Dialog, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren } from 'react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
}: PropsWithChildren<{
    show: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    closeable?: boolean;
    onClose: CallableFunction;
}>) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Transition show={show} leave='duration-200' as={Fragment}>
            <Dialog
                onClose={close}
                id='modal'
                className='fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0'
                as='div'
            >
                <Transition.Child
                    leaveTo='opacity-0'
                    leaveFrom='opacity-100'
                    leave='ease-in duration-200'
                    enterTo='opacity-100'
                    enterFrom='opacity-0'
                    enter='ease-out duration-300'
                    as={Fragment}
                >
                    <div className='absolute inset-0 bg-gray-500/75 dark:bg-gray-900/75' />
                </Transition.Child>

                <Transition.Child
                    leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leave='ease-in duration-200'
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enter='ease-out duration-300'
                    as={Fragment}
                >
                    <Dialog.Panel
                        className={`mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all dark:bg-gray-800 sm:mx-auto sm:w-full ${maxWidthClass}`}
                    >
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
