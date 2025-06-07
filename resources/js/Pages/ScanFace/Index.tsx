// resources/js/Pages/ScanFace/Index.tsx
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekday from 'dayjs/plugin/weekday';
import { useLaravelReactI18n } from 'laravel-react-i18n'; // Untuk i18n jika diperlukan
import React, { useState } from 'react';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);
dayjs.extend(isoWeek);

interface Step {
    id: number;
    name: string;
    process: string;
}

interface User {
    id: number;
    nip: string;
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
    created_at: string;
}

interface Props {
    data: ScanFace[];
}

type FilterType = 'all' | 'day' | 'week' | 'month';

const Index: React.FC<Props> = ({ data }) => {
    const { t } = useLaravelReactI18n(); // Untuk terjemahan jika diperlukan
    const [filter, setFilter] = useState<FilterType>('all');

    const now = dayjs();

    const filteredData = data.filter((scan) => {
        const created = dayjs(scan.created_at);
        if (filter === 'day') {
            return created.isSame(now, 'day');
        }
        if (filter === 'week') {
            return created.isSame(now, 'week');
        }
        if (filter === 'month') {
            return created.isSame(now, 'month');
        }
        return true; // 'all'
    });

    return (
        <div className='p-4'>
            <h1 className='mb-4 text-center text-xl font-bold'>
                Data Hasil Recognition Wajah Karyawan
            </h1>

            <div className='mb-4 flex justify-center gap-2'>
                {/* ... tombol filter tetap ... */}
            </div>

            {filteredData.length === 0 ? (
                <div className='flex items-center justify-center'>
                    <div className='rounded-lg bg-white px-8 py-10 text-center text-lg text-gray-500 shadow-md'>
                        Data masih kosong
                    </div>
                </div>
            ) : (
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
                            <th className='px-4 py-2'>Waktu Terdeteksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((scan) => (
                            <tr key={scan.user_id + scan.created_at}>
                                <td className='px-4 py-2'>{scan.user.name}</td>
                                <td className='px-4 py-2'>{scan.user.nip}</td>
                                <td className='px-4 py-2'>{scan.user.role_name}</td>
                                <td className='px-4 py-2'>
                                    <img
                                        src={`/result_scan_faces/${scan.image_path}`}
                                        alt={`Image of user ${scan.user_id}`}
                                        width='100'
                                        className='object-cover'
                                    />
                                </td>
                                <td className='px-4 py-2'>{scan.kpm}</td>
                                <td className='px-4 py-2'>{scan.panel}</td>
                                <td className='px-4 py-2'>{scan.user.step.name}</td>
                                <td className='px-4 py-2'>{scan.status}</td>
                                <td className='px-4 py-2'>
                                    {dayjs(scan.created_at).format('DD-MM-YYYY HH:mm:ss')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Index;
