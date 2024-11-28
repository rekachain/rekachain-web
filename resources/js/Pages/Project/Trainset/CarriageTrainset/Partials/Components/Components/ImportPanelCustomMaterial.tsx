import { Label } from '@/Components/UI/label';
import { Button } from '@/Components/UI/button';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useForm } from '@inertiajs/react';
import { useLoading } from '@/Contexts/LoadingContext';
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
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { PanelAttachmentResource } from '@/Support/Interfaces/Resources';
import { withLoading } from '@/Utils/withLoading';
import { useSuccessToast } from '@/Hooks/useToast';
import { Checkbox } from '@/Components/UI/checkbox';
import { ProjectImportProgressMaterialOverride } from '@/Support/Interfaces/Types';
import { RadioGroup, RadioGroupItem } from '@/Components/UI/radio-group';
import { panelAttachmentService } from '@/Services/panelAttachmentService';

export default function ({ panelAttachment }: { panelAttachment: PanelAttachmentResource }) {
    const { t } = useLaravelReactI18n();

    const { loading } = useLoading();

    const { data, setData } = useForm({
        file: null as File | null,
        toBeAssigned: true,
        override: 'default' as ProjectImportProgressMaterialOverride,
    });

    const handleChangeImportFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setData('file', files[0]);
    };

    const handleSubmit = withLoading(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.file) {
            await panelAttachmentService.importCustomAttachmentMaterial(
                panelAttachment.id,
                data.file,
                data.toBeAssigned,
                data.override,
            );
            void useSuccessToast();
        }
    }, true);

    useEffect(() => {
        setData('toBeAssigned', panelAttachment.is_child ? false : true);
    },[panelAttachment]);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="tertiary">Tambah Material Baru</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Material Baru</DialogTitle>
                        <DialogDescription>
                            Tambahkan material baru ke attachment ini dengan mengunggah file excel yang berisi data
                            material
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col space-y-4">
                        <Label>Unduh template excel</Label>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={panelAttachmentService.downloadCustomAttachmentMaterialImportTemplate.bind(
                                null,
                                panelAttachment.id,
                            )}
                            disabled={loading}
                        >
                            {loading
                                ? t('action.loading')
                                : t('pages.panel.partials.import.dialogs.buttons.download_template')}
                        </Button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <Label htmlFor="file">{t('pages.panel.partials.import.dialogs.fields.file')}</Label>
                            <Input
                                type="file"
                                onChange={handleChangeImportFile}
                                id="file"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Label
                                htmlFor="to-be-assigned"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Buat KPM baru?
                            </Label>

                            <Checkbox
                                onCheckedChange={checked => setData('toBeAssigned', checked as boolean)}
                                id="to-be-assigned"
                                checked={data.toBeAssigned}
                            />
                        </div>

                        {!data.toBeAssigned && (
                            <div className="space-y-4">
                                <Label>override kah min?</Label>
                                <div className="flex space-x-4">
                                    <RadioGroup
                                        value={data.override}
                                        onValueChange={override =>
                                            setData('override', override as ProjectImportProgressMaterialOverride)
                                        }
                                        className="flex justify-content-between"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="default" id="override-default" />
                                            <Label htmlFor="override-default">Default</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="override" id="override-override" />
                                            <Label htmlFor="override-override">Override</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="merge" id="override-merge" />
                                            <Label htmlFor="override-merge">Merge</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit" disabled={loading}>
                                {loading
                                    ? t('pages.panel.partials.import.dialogs.buttons.processing')
                                    : t('pages.panel.partials.import.dialogs.buttons.import')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
