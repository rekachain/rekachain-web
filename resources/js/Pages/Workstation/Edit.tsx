import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { workstationService } from '@/Services/workstationService';
import { ROUTES } from '@/Support/Constants/routes';
import {
    DivisionResource,
    WorkshopResource,
    WorkstationResource,
} from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { Head, router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

export default function ({
    workstation,
    workshops,
    divisions,
}: {
    workstation: WorkstationResource;
    workshops: WorkshopResource[];
    divisions: DivisionResource[];
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        name: workstation.name,
        location: workstation.location,
        workshop_id: workstation.workshop_id.toString(),
        division_id: workstation.division_id.toString(),
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        await workstationService.update(workstation.id, data);
        router.visit(route(`${ROUTES.WORKSTATIONS}.index`));
        void useSuccessToast(t('pages.workstation.edit.messages.updated'));
    });

    return (
        <>
            <Head title={t('pages.workstation.edit.title', { name: workstation.name })} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.workstation.edit.title', { name: workstation.name })}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.workstation.edit.fields.name')}
                                htmlFor='name'
                            />
                            <Input
                                value={data.name}
                                type='text'
                                onChange={(e) => setData('name', e.target.value)}
                                name='name'
                                id='name'
                                className='mt-1'
                                autoComplete='name'
                            />
                        </div>

                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.workstation.edit.fields.location')}
                                htmlFor='location'
                            />
                            <Input
                                value={data.location}
                                type='text'
                                onChange={(e) => setData('location', e.target.value)}
                                name='location'
                                id='location'
                                className='mt-1'
                                autoComplete='location'
                            />
                        </div>

                        <div className='mt-4 space-y-2 rounded bg-background-2 p-4'>
                            <h2 className='text-lg font-semibold'>
                                {t('pages.workstation.edit.fields.workshop')}
                            </h2>
                            <RadioGroup
                                onValueChange={(v) => setData('workshop_id', v)}
                                defaultValue={workstation.workshop_id.toString()}
                            >
                                {workshops?.map((role) => (
                                    <div key={role.id} className='flex items-center space-x-2'>
                                        <RadioGroupItem
                                            value={role.id.toString()}
                                            id={`role.${role.id.toString()}`}
                                        />
                                        <Label htmlFor={`role.${role.id.toString()}`}>
                                            {role.name}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className='mt-4 space-y-2 rounded bg-background-2 p-4'>
                            <h2 className='text-lg font-semibold'>
                                {t('pages.workstation.edit.fields.division')}
                            </h2>
                            <RadioGroup
                                onValueChange={(v) => setData('division_id', v)}
                                defaultValue={workstation.division_id.toString()}
                            >
                                {divisions?.map((division) => (
                                    <div key={division.id} className='flex items-center space-x-2'>
                                        <RadioGroupItem
                                            value={division.id.toString()}
                                            id={`division.${division.id.toString()}`}
                                        />
                                        <Label htmlFor={`division.${division.id.toString()}`}>
                                            {division.name}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <Button disabled={loading} className='mt-4'>
                            {t('pages.workstation.edit.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
