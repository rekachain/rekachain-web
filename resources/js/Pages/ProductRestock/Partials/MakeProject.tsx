import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/UI/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Input } from '@/Components/UI/input';
import { Textarea } from '@/Components/UI/textarea';
import { useLoading } from '@/Contexts/LoadingContext';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEvent } from 'react';

export default function ({
    handleInitiateProject,
}: {
    handleInitiateProject: (data: any) => void;
}) {
    const { t } = useLaravelReactI18n();

    const { data, setData } = useForm<{
        project_name: string;
        project_description: string | null;
        project_initial_date: string;
    }>({
        project_name: '',
        project_description: '',
        project_initial_date: '',
    });

    const { loading } = useLoading();

    const handleSendData = withLoading(async (event: FormEvent<HTMLFormElement>) => {
        console.log('data', data);
        event.preventDefault();
        await handleInitiateProject(data);
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='tertiary'>
                    {t('pages.product_restock.partials.make_project.dialogs.buttons.trigger')}
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>
                        {t('pages.product_restock.partials.make_project.dialogs.title')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('pages.product_restock.partials.make_project.dialogs.description')}
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSendData}
                    id='project-restock-form'
                    encType='multipart/form-data'
                    className='hidden'
                ></form>
                <div>
                    <InputLabel
                        value={t(
                            'pages.product_restock.partials.make_project.dialogs.fields.project_name',
                        )}
                        htmlFor='project_name'
                    />
                    <Input
                        value={data.project_name}
                        type='text'
                        required
                        onChange={(e) => setData('project_name', e.target.value)}
                        name='project_name'
                        id='project_name'
                        className='mt-1'
                        autoComplete='project_name'
                    />
                </div>

                <div>
                    <InputLabel
                        value={t(
                            'pages.product_restock.partials.make_project.dialogs.fields.project_description',
                        )}
                        htmlFor='project_description'
                    />
                    <Textarea
                        value={data.project_description || ''}
                        onChange={(e) => setData('project_description', e.target.value)}
                        name='project_description'
                        id='project_description'
                        className='mt-1'
                        autoComplete='project_description'
                    />
                </div>
                <div>
                    <InputLabel
                        value={t(
                            'pages.product_restock.partials.make_project.dialogs.fields.project_initial_date',
                        )}
                        htmlFor='project_initial_date'
                    />
                    <Input
                        value={data.project_initial_date}
                        type='date'
                        required
                        onChange={(e) => setData('project_initial_date', e.target.value)}
                        name='project_initial_date'
                        id='project_initial_date'
                        className='mt-1'
                        autoComplete='project_initial_date'
                    />
                </div>
                <DialogFooter>
                    <Button type='submit' form='project-restock-form' disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.product_restock.partials.make_project.dialogs.buttons.submit',
                              )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
