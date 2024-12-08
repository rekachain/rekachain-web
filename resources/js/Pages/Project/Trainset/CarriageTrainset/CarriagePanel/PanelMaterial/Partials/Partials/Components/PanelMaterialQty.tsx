import { Button } from '@/Components/UI/button';
import { Input } from '@/Components/UI/input';
import { useLoading } from '@/Contexts/LoadingContext';
import { checkPermission } from '@/Helpers/sidebarHelper';
import { useSuccessToast } from '@/Hooks/useToast';
import { panelMaterialService } from '@/Services/panelMaterialService';
import { STYLING } from '@/Support/Constants/styling';
import { PERMISSION_ENUM } from '@/Support/Enums/permissionEnum';
import { PanelMaterialResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PencilLine } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function ({
    panelMaterial,
    handleSyncCarriagePanel,
}: {
    panelMaterial: PanelMaterialResource;
    handleSyncCarriagePanel: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData } = useForm({
        panelMaterialQty: panelMaterial.qty,
    });
    const { loading } = useLoading();
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleEditMaterialQty = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await panelMaterialService.update(panelMaterial.id, {
            qty: data.panelMaterialQty,
        });
        await handleSyncCarriagePanel();
        setIsEditing(false);
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.partials.components.panel_material_qty.messages.updated',
            ),
        );
    });

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleEditMaterialQty} className='flex gap-4'>
                    <Input
                        type='number'
                        onChange={(e) => setData('panelMaterialQty', +e.target.value)}
                        min={1}
                        defaultValue={data.panelMaterialQty}
                        className='w-fit'
                    />
                    <Button type='submit' disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.project.trainset.carriage_trainset.carriage_panel.panel_material.partials.partials.components.panel_material_qty.buttons.update_qty',
                              )}
                    </Button>
                    <Button type='button' onClick={toggleEditMode}>
                        {t('action.cancel')}
                    </Button>
                </form>
            ) : (
                <div className='flex items-center gap-4'>
                    <div>{panelMaterial.qty}</div>
                    {checkPermission(PERMISSION_ENUM.PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_UPDATE) && (
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
