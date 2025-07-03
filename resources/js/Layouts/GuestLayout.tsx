import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className='flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0'>
            <div>
                <Link href='/'>
                    <img
                        src='/assets/images/Logo REKA.svg'
                        className='align-content-lg-start h-16 object-contain'
                        alt='logo'
                    />
                    {/* <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" /> */}
                </Link>
            </div>

            <div className='mt-6 w-full overflow-hidden bg-background-2 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg'>
                {children}
            </div>
        </div>
    );
}
