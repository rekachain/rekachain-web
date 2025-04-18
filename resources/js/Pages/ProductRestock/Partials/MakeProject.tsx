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
import { useSuccessToast } from '@/Hooks/useToast';
import { ROUTES } from '@/Support/Constants/routes';
import { withLoading } from '@/Utils/withLoading';
import { router, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEvent } from 'react';

export default function ({
    handleInitiateProject,
} : {
    handleInitiateProject: (data: any) => void;
}) {
    const { t } = useLaravelReactI18n();

    const { data, setData } = useForm<{
        name: string;
        description: string | null;
        initial_date: string;
    }>({
        name: '',
        description: '',
        initial_date: '',
    });

    const { loading } = useLoading();

    const handleSendData = withLoading(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleInitiateProject(data);
        router.visit(route(`${ROUTES.PRODUCT_RESTOCKS}.index`));
        void useSuccessToast(t('pages.product_restock.partials.make_project.messages.initiated'));
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
                <form onSubmit={handleSendData} id='project-restock-form' encType='multipart/form-data' className='hidden'></form>
                <div>
                    <InputLabel value={t('pages.product_restock.partials.make_project.dialogs.fields.project_name')} htmlFor='name' />
                    <Input
                        value={data.name}
                        type='text'
                        required
                        onChange={(e) => setData('name', e.target.value)}
                        name='name'
                        id='name'
                        className='mt-1'
                        autoComplete='name'
                    />
                </div>

                <div>
                    <InputLabel
                        value={t('pages.product_restock.partials.make_project.dialogs.fields.project_description')}
                        htmlFor='description'
                    />
                    <Textarea
                        value={data.description || ''}
                        onChange={(e) => setData('description', e.target.value)}
                        name='description'
                        id='description'
                        className='mt-1'
                        autoComplete='description'
                    />
                </div>
                <div>
                    <InputLabel
                        value={t('pages.product_restock.partials.make_project.dialogs.fields.project_initial_date')}
                        htmlFor='initial_date'
                    />
                    <Input
                        value={data.initial_date}
                        type='date'
                        required
                        onChange={(e) => setData('initial_date', e.target.value)}
                        name='initial_date'
                        id='initial_date'
                        className='mt-1'
                        autoComplete='initial_date'
                    />
                </div>
                <DialogFooter>
                    <Button type='submit' disabled={loading}>
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
