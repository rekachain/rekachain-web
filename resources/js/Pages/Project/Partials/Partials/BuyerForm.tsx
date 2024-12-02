import GenericDataSelector from '@/Components/GenericDataSelector';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { useSuccessToast } from '@/Hooks/useToast';
import { userService } from '@/Services/userService';
import { PaginateResponse, ServiceFilterOptions } from '@/Support/Interfaces/Others';
import { UserResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useDebounce } from '@uidotdev/usehooks';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { RefreshCcw } from 'lucide-react';
import { FormEvent, useCallback, useEffect, useState } from 'react';

export default function ({ setBuyerId }: { setBuyerId: (buyer_id: number) => void }) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        buyer_id: null as number | null,
        user_name: '',
        user_email: '',
        user_phone_number: '',
        user_password: '',
    });

    const [userResponse, setUserResponse] = useState<PaginateResponse<UserResource>>();
    const [searchUser, setSearchUser] = useState<string>('');
    const debouncedSearchUser = useDebounce(searchUser, 300);

    const fetchUsers = useCallback(async (filters: ServiceFilterOptions) => {
        const res = await userService.getAll(filters);
        setUserResponse(res);
        return res.data;
    }, []);

    useEffect(() => {
        void fetchUsers({ search: debouncedSearchUser });
    }, [debouncedSearchUser, fetchUsers]);

    useEffect(() => {
        const selectedUser = userResponse?.data.find((user) => user.id === data.buyer_id);
        if (selectedUser) {
            setBuyerId(selectedUser.id);
            setData((previousData) => ({
                ...previousData,
                user_name: selectedUser.name,
                user_email: selectedUser.email,
                user_phone_number: selectedUser.phone_number,
            }));
        } else {
            setData((previousData) => ({
                ...previousData,
                user_name: '',
                user_email: '',
                user_phone_number: '',
            }));
        }
    }, [data.buyer_id, userResponse]);

    const refreshUser = withLoading(async (res: UserResource) => {
        setSearchUser(res.name);
        setData({
            buyer_id: res.id,
            user_name: res.name,
            user_email: res.email,
            user_phone_number: res.phone_number,
            user_password: '',
        });
    });

    const handleAddUser = withLoading(async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();

        const formData = new FormData();
        data.user_name && formData.append('name', data.user_name);
        data.user_email && formData.append('email', data.user_email);
        data.user_phone_number && formData.append('phone_number', data.user_phone_number);
        data.user_password && formData.append('password', data.user_password);
        const res = await userService.create(formData);
        void refreshUser(res);
        void useSuccessToast('Sukses');
    }, true);

    return (
        <form onSubmit={handleAddUser}>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <Label htmlFor='user'>{'Pembeli: '}</Label>
                    <div className='flex items-center'>
                        <GenericDataSelector
                            setSelectedData={(id) => setData('buyer_id', id)}
                            selectedDataId={data.buyer_id ?? null}
                            renderItem={(item: UserResource) => item.name}
                            placeholder={
                                data.buyer_id !== null ? data.user_name : 'Pilih Pembeli...'
                            }
                            onSearchChange={setSearchUser}
                            nullable
                            id='user'
                            fetchData={fetchUsers}
                            data={userResponse?.data}
                        />
                        <Button
                            variant='ghost'
                            type='button'
                            onClick={() => setData('buyer_id', null)}
                        >
                            <RefreshCcw />
                        </Button>
                    </div>
                    <Label htmlFor='email'>{'Email: '}</Label>
                    <Input
                        value={data.user_email || ''}
                        type='email'
                        placeholder={data.user_email !== '' ? '-' : 'Masukkan Email...'}
                        onChange={(e) => setData('user_email', e.target.value)}
                        id='email'
                        disabled={data.buyer_id !== null}
                    />
                    <Label htmlFor='name'>{'Nama: '}</Label>
                    <Input
                        value={data.user_name}
                        placeholder={'Masukkan Nama...'}
                        onChange={(e) => setData('user_name', e.target.value)}
                        id='name'
                        disabled={data.buyer_id !== null}
                    />
                    <Label htmlFor='phone_number'>{'Nomor Telepon: '}</Label>
                    <Input
                        value={data.user_phone_number || ''}
                        placeholder={
                            data.user_phone_number !== '' ? '-' : 'Masukkan Nomor Telepon...'
                        }
                        onChange={(e) => setData('user_phone_number', e.target.value)}
                        id='phone_number'
                        disabled={data.buyer_id !== null}
                    />
                    {!data.buyer_id && (
                        <>
                            <Label htmlFor='password'>{'Password: '}</Label>
                            <Input
                                value={data.user_password}
                                type='password'
                                placeholder={'Masukkan Password...'}
                                onChange={(e) => setData('user_password', e.target.value)}
                                id='password'
                                disabled={data.buyer_id !== null}
                            />
                        </>
                    )}
                </div>
                {!data.buyer_id && (
                    <div className='mr-auto flex gap-4'>
                        <Button type='submit'>{t('action.save')}</Button>
                    </div>
                )}
            </div>
        </form>
    );
}
