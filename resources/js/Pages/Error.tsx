// resources/js/Pages/Error.tsx

import { buttonVariants } from '@/Components/UI/button';
import useDarkMode from '@/Hooks/useDarkMode';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { OctagonAlert } from 'lucide-react';

interface Props {
    status: number;
    message: string;
}

const Error: React.FC<Props> = ({ status, message }) => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    const { props } = usePage();
    const Layout = props.auth ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout>
            <Head title='Error' />
            <div
                className={`flex flex-col items-center justify-center gap-4 text-xl ${props.auth ? 'h-screen' : ''}`}
            >
                <OctagonAlert className='size-20 text-destructive' />
                <h1 className='text-center text-3xl font-bold'>
                    {status || 'Oops, something went wrong!'}
                </h1>
                <p className='text-center text-lg'>
                    {(status < 500 && message) ||
                        "We're sorry, but an unexpected error has occurred. Please try again later or contact support if the issue persists."}
                </p>
                <div className='mt-4 flex items-center justify-center'>
                    <Link href='/' className={buttonVariants({ variant: 'outline' })}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default Error;
