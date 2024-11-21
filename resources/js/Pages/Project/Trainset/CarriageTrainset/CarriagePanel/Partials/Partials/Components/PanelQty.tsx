import { CarriagePanelResource } from '@/Support/Interfaces/Resources';
import { useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { Button } from '@/Components/UI/button';
import { PencilLine } from 'lucide-react';
import { STYLING } from '@/Support/Constants/styling';
import { carriagePanelService } from '@/Services/carriagePanelService';
import { useLoading } from '@/Contexts/LoadingContext';
import { FormEvent, useState } from 'react';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';

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
                'pages.project.trainset.carriage_trainset.carriage_panel.partials.components.panel_qty.messages.qty_updated',
            ),
        );
    });

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleEditCarriageQty} className="flex gap-4">
                    <Input
                        type="number"
                        min={1}
                        className="w-fit"
                        defaultValue={data.panelQty}
                        onChange={e => setData('panelQty', +e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.project.trainset.carriage_trainset.carriage_panel.partials.components.panel_qty.buttons.update_qty',
                              )}
                    </Button>
                    <Button type="button" onClick={toggleEditMode}>
                        {t('action.cancel')}
                    </Button>
                </form>
            ) : (
                <div className="flex items-center gap-4">
                    <div>{carriage_panel.qty}</div>
                    <Button
                        variant="ghost"
                        onClick={toggleEditMode}
                        className="p-2 whitespace-normal h-fit rounded-full"
                    >
                        <PencilLine size={STYLING.ICON.SIZE.SMALL} />
                    </Button>
                </div>
            )}
        </>
    );
}
