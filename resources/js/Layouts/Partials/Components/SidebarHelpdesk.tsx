import { RiQuestionLine } from '@remixicon/react';
import { buttonVariants } from '@/Components/UI/button';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { STYLING } from '@/Support/Constants/styling';
import { useEffect } from 'react';
import { withLoading } from '@/Utils/withLoading';
import { helpdeskContactService } from '@/Services/helpdeskContactService';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/UI/dialog';
import { Input } from '@/Components/UI/input';
import { Label } from '@/Components/UI/label';
import { Textarea } from '@/Components/UI/textarea';
import { useForm, usePage } from '@inertiajs/react';
import { useSuccessToast } from '@/Hooks/useToast';
import { RoleEnum } from '@/Support/Enums/roleEnum';
import { useHelpdesk } from '@/Contexts/HelpdeskContext';

export default function () {
    const { t } = useLaravelReactI18n();
    const { props } = usePage();
    const linkClass = `${buttonVariants({ variant: 'sidebar' })} w-full pr-52 md:mr-0 `;
    const { helpdeskContactResponse, syncHelpdeskContacts } = useHelpdesk();

    const { data: editData, setData: setEditData } = useForm({
        email: '',
        phone_number: '',
        notice: '',
    });

    const { data: createData, setData: setCreateData } = useForm({
        email: '',
        phone_number: '',
        notice: '',
    });

    const isSuperAdmin = props.auth.user.role === RoleEnum.SUPER_ADMIN;

    const handleEditSubmit = withLoading(async e => {
        e.preventDefault();

        if (!helpdeskContactResponse) return;

        await helpdeskContactService.update(helpdeskContactResponse.id, editData);
        await syncHelpdeskContacts();

        void useSuccessToast(t('components.sidebar_helpdesk.messages.updated'));
    }, true);

    const handleCreateSubmit = withLoading(async e => {
        e.preventDefault();
        await helpdeskContactService.create(createData);
        await syncHelpdeskContacts();
        void useSuccessToast(t('components.sidebar_helpdesk.messages.created'));
    }, true);

    useEffect(() => {
        if (!helpdeskContactResponse) return;

        setEditData({
            email: helpdeskContactResponse.email,
            phone_number: helpdeskContactResponse.phone_number,
            notice: helpdeskContactResponse.notice,
        });
    }, [helpdeskContactResponse]);

    return (
        <div className="md:px-4">
            <Dialog>
                <DialogTrigger className="w-full md:w-fit">
                    <div className="md:block">
                        <div className={linkClass}>
                            <RiQuestionLine size={STYLING.ICON.SIZE.SMALL} />
                            <span className="sidebar-item-text ml-2 md:mr-0">
                                {t('components.sidebar.links.helpdesk')}
                            </span>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                    <DialogHeader className="space-y-3">
                        <DialogTitle>{t('components.sidebar_helpdesk.dialogs.title')}</DialogTitle>
                        <DialogDescription></DialogDescription>

                        {helpdeskContactResponse ? (
                            <>
                                <p>
                                    {helpdeskContactResponse?.notice ??
                                        t('components.sidebar_helpdesk.dialogs.messages.no_notice')}
                                </p>

                                <div className="flex flex-col gap-3">
                                    <p className="font-bold text-md">
                                        {t('components.sidebar_helpdesk.dialogs.headers.contact')}
                                    </p>

                                    <div className="flex gap-2">
                                        <p className="font-bold">
                                            {t('components.sidebar_helpdesk.dialogs.headers.email')}
                                        </p>
                                        <p>
                                            {helpdeskContactResponse?.email ??
                                                t('components.sidebar_helpdesk.dialogs.messages.no_email')}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="font-bold">
                                            {t('components.sidebar_helpdesk.dialogs.headers.phone_number')}
                                        </p>
                                        <p>
                                            {helpdeskContactResponse?.phone_number ??
                                                t('components.sidebar_helpdesk.dialogs.messages.no_phone')}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Dialog>
                                <DialogTrigger asChild>
                                    {isSuperAdmin ? (
                                        <button className={buttonVariants()}>
                                            {t(
                                                'components.sidebar_helpdesk.dialogs.buttons.create_first_helpdesk_contact',
                                            )}
                                        </button>
                                    ) : (
                                        <p>{t('components.sidebar_helpdesk.dialogs.messages.no_helpdesk_contact')}</p>
                                    )}
                                </DialogTrigger>
                                <DialogContent className="max-w-xl">
                                    <DialogHeader>
                                        <DialogTitle>{t('components.sidebar_helpdesk.dialogs.edit_title')}</DialogTitle>
                                        <DialogDescription></DialogDescription>
                                        <form onSubmit={handleCreateSubmit}>
                                            <div className="flex flex-col gap-3 mt-5">
                                                <Label htmlFor="email">
                                                    {t('components.sidebar_helpdesk.dialogs.fields.email')}
                                                </Label>
                                                <Input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={createData.email}
                                                    onChange={e => setCreateData('email', e.target.value)}
                                                    className="input"
                                                />
                                                <Label className="font-bold text-md" htmlFor="phone_number">
                                                    {t('components.sidebar_helpdesk.dialogs.fields.phone_number')}
                                                </Label>
                                                <Input
                                                    type="text"
                                                    id="phone_number"
                                                    name="phone_number"
                                                    value={createData.phone_number}
                                                    onChange={e => setCreateData('phone_number', e.target.value)}
                                                    className="input"
                                                />
                                                <Label className="font-bold text-md" htmlFor="notice">
                                                    {t('components.sidebar_helpdesk.dialogs.fields.notice')}
                                                </Label>
                                                <Textarea
                                                    name="notice"
                                                    id="notice"
                                                    value={createData.notice}
                                                    onChange={e => setCreateData('notice', e.target.value)}
                                                    className="input"
                                                />
                                                <button type="submit" className={buttonVariants()}>
                                                    {t('action.save')}
                                                </button>
                                            </div>
                                        </form>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose>{t('action.cancel')}</DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </DialogHeader>
                    <DialogFooter>
                        <Dialog>
                            <DialogTrigger asChild>
                                {isSuperAdmin && <button className={buttonVariants()}>{t('action.edit')}</button>}
                            </DialogTrigger>
                            <DialogContent className="max-w-xl">
                                <DialogHeader>
                                    <DialogTitle>{t('components.sidebar_helpdesk.dialogs.edit_title')}</DialogTitle>
                                    <DialogDescription></DialogDescription>
                                    <form onSubmit={handleEditSubmit}>
                                        <div className="flex flex-col gap-3 mt-5">
                                            <Label htmlFor="email">
                                                {t('components.sidebar_helpdesk.dialogs.fields.email')}
                                            </Label>
                                            <Input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={editData.email}
                                                onChange={e => setEditData('email', e.target.value)}
                                                className="input"
                                            />
                                            <Label className="font-bold text-md" htmlFor="phone_number">
                                                {t('components.sidebar_helpdesk.dialogs.fields.phone_number')}
                                            </Label>
                                            <Input
                                                type="text"
                                                id="phone_number"
                                                name="phone_number"
                                                value={editData.phone_number}
                                                onChange={e => setEditData('phone_number', e.target.value)}
                                                className="input"
                                            />
                                            <Label className="font-bold text-md" htmlFor="notice">
                                                {t('components.sidebar_helpdesk.dialogs.fields.notice')}
                                            </Label>
                                            <Textarea
                                                name="notice"
                                                id="notice"
                                                value={editData.notice}
                                                onChange={e => setEditData('notice', e.target.value)}
                                                className="input"
                                            />
                                            <button type="submit" className={buttonVariants()}>
                                                {t('action.save')}
                                            </button>
                                        </div>
                                    </form>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose>{t('action.cancel')}</DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <DialogClose className={buttonVariants({ variant: 'ghost' })}>{t('action.close')}</DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
