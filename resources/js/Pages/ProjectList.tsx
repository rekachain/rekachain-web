import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ProjectList() {
    return (
        <AuthenticatedLayout>
            <Head title="List Proyek" />
            <div className="py-12">
                <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                    <h1 className="text-2xl font-bold">List Proyek</h1>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
