import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { ROUTES } from '@/Support/Constants/routes';
import { Input } from '@/Components/UI/input';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import { Label } from '@/Components/UI/label';
import { DivisionResource, WorkshopResource } from '@/Support/Interfaces/Resources';
import { workstationService } from '@/Services/workstationService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({
    workshops,
    divisions,
}: {
    workshops: WorkshopResource[];
    divisions: DivisionResource[];
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData } = useForm({
        name: '',
        location: '',
        workshop_id: '',
        division_id: '',
    });

    const { loading } = useLoading();

    const submit: FormEventHandler = withLoading(async (e) => {
        e.preventDefault();

        await workstationService.create(data);
        router.visit(route(`${ROUTES.WORKSTATIONS}.index`));
        void useSuccessToast(t('pages.workstation.create.messages.created'));
    });

    return (
        <>
            <Head title={t('pages.workstation.create.title')} />
            <AuthenticatedLayout>
                <div className='p-4'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-page-header my-4'>
                            {t('pages.workstation.create.title')}
                        </h1>
                    </div>

                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className='mt-4'>
                            <InputLabel
                                value={t('pages.workstation.create.fields.name')}
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
                                value={t('pages.workstation.create.fields.location')}
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
                                {t('pages.workstation.create.fields.workshop')}
                            </h2>
                            <RadioGroup onValueChange={(v) => setData('workshop_id', v)}>
                                {workshops?.map((workshop) => (
                                    <div key={workshop.id} className='flex items-center space-x-2'>
                                        <RadioGroupItem
                                            value={workshop.id.toString()}
                                            id={`workshop.${workshop.id.toString()}`}
                                        />
                                        <Label htmlFor={`workshop.${workshop.id.toString()}`}>
                                            {workshop.name}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className='mt-4 space-y-2 rounded bg-background-2 p-4'>
                            <h2 className='text-lg font-semibold'>
                                {t('pages.workstation.create.fields.division')}
                            </h2>
                            <RadioGroup onValueChange={(v) => setData('division_id', v)}>
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
                            {t('pages.workstation.create.buttons.submit')}
                        </Button>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
