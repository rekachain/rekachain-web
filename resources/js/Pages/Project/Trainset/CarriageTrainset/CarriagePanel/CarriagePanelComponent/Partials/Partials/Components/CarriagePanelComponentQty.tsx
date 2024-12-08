import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { checkPermission } from '@/Helpers/sidebarHelper';
import { useSuccessToast } from '@/Hooks/useToast';
import { carriagePanelComponentService } from '@/Services/carriagePanelComponentService';
import { STYLING } from '@/Support/Constants/styling';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { CarriagePanelComponentResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PencilLine } from 'lucide-react';
import { FormEvent, useState } from 'react';

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
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.carriage_panel_component_qty.messages.updated',
            ),
        );
    });

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleEditCarriageQty} className='flex gap-4'>
                    <Input
                        type='number'
                        onChange={(e) => setData('panelComponentQty', +e.target.value)}
                        min={1}
                        defaultValue={data.panelComponentQty}
                        className='w-fit'
                    />
                    <Button type='submit' disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.partials.partials.components.carriage_panel_component_qty.buttons.update_qty',
                              )}
                    </Button>
                    <Button type='button' onClick={toggleEditMode}>
                        {t('action.cancel')}
                    </Button>
                </form>
            ) : (
                <div className='flex items-center gap-4'>
                    <div>{carriagePanelComponent.qty}</div>
                    {checkPermission(PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_UPDATE) && (
                    <Button
                        variant='ghost'
                        onClick={toggleEditMode}
                        className='h-fit whitespace-normal rounded-full p-2'
                    >
                        <PencilLine size={STYLING.ICON.SIZE.SMALL} />
                    </Button>
                    )}
                </div>
            )}
        </>
    );
}
