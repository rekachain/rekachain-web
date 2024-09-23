import { CarriagePanelResource } from '@/support/interfaces/resources';
import { useForm } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { PencilLine } from 'lucide-react';
import { STYLING } from '@/support/constants/styling';
import { carriagePanelService } from '@/services/carriagePanelService';
import { useLoading } from '@/Contexts/LoadingContext';
import { useState } from 'react';
import { useSuccessToast } from '@/hooks/useToast';

export default function ({
    carriage_panel,
    handleSyncCarriage,
}: {
    carriage_panel: CarriagePanelResource;
    handleSyncCarriage: () => Promise<void>;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData, reset } = useForm({
        panelQty: carriage_panel.qty,
    });
    const { setLoading, loading } = useLoading();
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleEditCarriageQty = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await carriagePanelService.update(carriage_panel.id, {
            qty: data.panelQty,
        });
        await handleSyncCarriage();
        setIsEditing(false);
        setLoading(false);
        useSuccessToast('Panel qty updated successfully');
    };

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
                        {loading ? 'Processing' : 'Save'}
                    </Button>
                    <Button type="button" onClick={toggleEditMode}>
                        Cancel
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
