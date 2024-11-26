import { ComponentMaterialResource } from '@/Support/Interfaces/Resources';
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
import { componentMaterialService } from '@/Services/componentMaterialService';

export default function ({
    componentMaterial,
    handleSyncCarriagePanel,
}: {
    componentMaterial: ComponentMaterialResource;
    handleSyncCarriagePanel: () => Promise<void>;
}) {
    const { t } = useLaravelReactI18n();
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData } = useForm({
        componentMaterialQty: componentMaterial.qty,
    });
    const { loading } = useLoading();
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleEditCarriageQty = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await componentMaterialService.update(componentMaterial.id, {
            qty: data.componentMaterialQty,
        });
        await handleSyncCarriagePanel();
        setIsEditing(false);
        void useSuccessToast(
            t(
                'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.partials.components.component_material_qty.messages.updated',
            ),
        );
    });

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleEditCarriageQty} className="flex gap-4">
                    <Input
                        type="number"
                        onChange={e => setData('componentMaterialQty', +e.target.value)}
                        min={1}
                        defaultValue={data.componentMaterialQty}
                        className="w-fit"
                    />
                    <Button type="submit" disabled={loading}>
                        {loading
                            ? t('action.loading')
                            : t(
                                  'pages.project.trainset.carriage_trainset.carriage_panel.carriage_panel_component.component_material.partials.partials.components.component_material_qty.buttons.update_qty',
                              )}
                    </Button>
                    <Button type="button" onClick={toggleEditMode}>
                        {t('action.cancel')}
                    </Button>
                </form>
            ) : (
                <div className="flex items-center gap-4">
                    <div>{componentMaterial.qty}</div>
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
