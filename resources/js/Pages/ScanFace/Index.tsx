// resources/js/Pages/ScanFace/Index.tsx
import { useLaravelReactI18n } from 'laravel-react-i18n'; // Untuk i18n jika diperlukan
import React from 'react';

interface Step {
    id: number;
    name: string;
    process: string;
}

interface User {
    id: number;
    nip : string;
    name: string;
    email: string;
    step: Step;
    role_name: string;
}

interface ScanFace {
    user_id: number;
    image_path: string;
    kpm: string;
    panel: string;
    status: string;
    user: User;
}

interface Props {
    data: ScanFace[];
}

const Index: React.FC<Props> = ({ data }) => {
    const { t } = useLaravelReactI18n(); // Untuk terjemahan jika diperlukan

    return (
        <div className='p-4'>
            <h1 className='mb-4 text-xl font-bold'>Scan Face Data</h1>

            <table className='w-full table-auto border-collapse'>
                <thead>
                    <tr>
                        <th className='px-4 py-2'>Nama</th>
                        <th className='px-4 py-2'>NIP</th>
                        <th className='px-4 py-2'>Divisi</th>
                        <th className='px-4 py-2'>Image</th>
                        <th className='px-4 py-2'>KPM</th>
                        <th className='px-4 py-2'>Panel</th>
                        <th className='px-4 py-2'>Step</th>
                        <th className='px-4 py-2'>Status Terdeteksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((scan) => (
                        <tr key={scan.user_id}>
                            <td className='px-4 py-2'>{scan.user.name}</td>
                            <td className='px-4 py-2'>{scan.user.nip}</td>
                            <td className='px-4 py-2'>{scan.user.role_name}</td>
                            <td className='px-4 py-2'>
                                <img
                                    src={`/storage/result_scan_faces/${scan.image_path}`}
                                    alt={`Image of user ${scan.user_id}`}
                                    width='100'
                                    className='object-cover'
                                />
                            </td>
                            <td className='px-4 py-2'>{scan.kpm}</td>
                            <td className='px-4 py-2'>{scan.panel}</td>
                            <td className='px-4 py-2'>{scan.user.step.name}</td>
                            <td className='px-4 py-2'>{scan.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
