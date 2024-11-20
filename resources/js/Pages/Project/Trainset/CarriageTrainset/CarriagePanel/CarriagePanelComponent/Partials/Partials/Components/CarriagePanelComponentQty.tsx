import { CarriagePanelComponentResource } from '@/Support/Interfaces/Resources';
import { useForm } from '@inertiajs/react';
import { Input } from '@/Components/UI/input';
import { Button } from '@/Components/UI/button';
import { PencilLine } from 'lucide-react';
import { STYLING } from '@/Support/Constants/styling';
import { useLoading } from '@/Contexts/LoadingContext';
import { FormEvent, useState } from 'react';
import { useSuccessToast } from '@/Hooks/useToast';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { carriagePanelComponentService } from '@/Services/carriagePanelComponentService';

export default function ({
    carriagePanelComponent,
    handleSyncCarriagePanel,
}: {
    carriagePanelComponent: CarriagePanelComponentResource;
    handleSyncCarriagePanel: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData } = useForm({
        panelComponentQty: carriagePanelComponent.qty,
    });
    const { loading } = useLoading();
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleEditCarriageQty = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await carriagePanelComponentService.update(carriagePanelComponent.id, {
            qty: data.panelComponentQty,
        });
        await handleSyncCarriagePanel();
        setIsEditing(false);
        void useSuccessToast('Carriage panel component quantity has been updated.');
    });

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleEditCarriageQty} className="flex gap-4">
                    <Input
                        type="number"
                        min={1}
                        className="w-fit"
                        defaultValue={data.panelComponentQty}
                        onChange={e => setData('panelComponentQty', +e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.project.trainset.carriage_trainset.panel.partials.components.panel_qty.buttons.update_qty',
                              )}
                    </Button>
                    <Button type="button" onClick={toggleEditMode}>
                        {t('action.cancel')}
                    </Button>
                </form>
            ) : (
                <div className="flex items-center gap-4">
                    <div>{carriagePanelComponent.qty}</div>
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
