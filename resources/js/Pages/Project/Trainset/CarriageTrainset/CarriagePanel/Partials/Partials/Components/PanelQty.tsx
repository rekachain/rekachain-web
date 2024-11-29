import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { useSuccessToast } from '@/Hooks/useToast';
import { carriagePanelService } from '@/Services/carriagePanelService';
import { STYLING } from '@/Support/Constants/styling';
import { CarriagePanelResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PencilLine } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function ({
    carriage_panel,
    handleSyncCarriagePanel,
}: {
    carriage_panel: CarriagePanelResource;
    handleSyncCarriagePanel: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData } = useForm({
        panelQty: carriage_panel.qty,
    });
    const { loading } = useLoading();
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleEditCarriageQty = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await carriagePanelService.update(carriage_panel.id, {
            qty: data.panelQty,
        });
        await handleSyncCarriagePanel();
        setIsEditing(false);
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.partials.partials.components.panel_qty.messages.updated',
            ),
        );
    });

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleEditCarriageQty} className='flex gap-4'>
                    <Input
                        type='number'
                        onChange={(e) => setData('panelQty', +e.target.value)}
                        min={1}
                        defaultValue={data.panelQty}
                        className='w-fit'
                    />
                    <Button type='submit' disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.project.trainset.carriage_trainset.carriage_panel.partials.partials.components.panel_qty.buttons.update_qty',
                              )}
                    </Button>
                    <Button type='button' onClick={toggleEditMode}>
                        {t('action.cancel')}
                    </Button>
                </form>
            ) : (
                <div className='flex items-center gap-4'>
                    <div>{carriage_panel.qty}</div>
                    <Button
                        variant='ghost'
                        onClick={toggleEditMode}
                        className='h-fit whitespace-normal rounded-full p-2'
                    >
                        <PencilLine size={STYLING.ICON.SIZE.SMALL} />
                    </Button>
                </div>
            )}
        </>
    );
}
