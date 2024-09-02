import { CarriagePanelResource } from '@/support/interfaces/resources';
import { useForm } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { PencilLine } from 'lucide-react';
import { STYLING } from '@/support/constants/styling';
import { carriagePanelService } from '@/services/carriagePanelService';

export default function ({
    carriage_panel,
    handleSyncCarriage,
}: {
    carriage_panel: CarriagePanelResource;
    handleSyncCarriage: () => Promise<void>;
}) {
    const { data, setData, reset } = useForm({
        panelQty: carriage_panel.qty,
        isLoading: false,
        isEditing: false,
    });

    const toggleEditMode = () => {
        setData('isEditing', !data.isEditing);
    };

    const handleEditCarriageQty = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData('isLoading', true);
        await carriagePanelService.update(carriage_panel.id, {
            qty: data.panelQty,
        });
        setData('isEditing', false);
        reset('isLoading', 'isEditing');
        await handleSyncCarriage();
    };

    return (
        <>
            {data.isEditing ? (
                <form onSubmit={handleEditCarriageQty} className="flex gap-4">
                    <Input
                        type="number"
                        min={1}
                        className="w-fit"
                        defaultValue={data.panelQty}
                        onChange={e => setData('panelQty', +e.target.value)}
                    />
                    <Button type="submit" disabled={data.isLoading}>
                        {data.isLoading ? 'Processing' : 'Save'}
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
