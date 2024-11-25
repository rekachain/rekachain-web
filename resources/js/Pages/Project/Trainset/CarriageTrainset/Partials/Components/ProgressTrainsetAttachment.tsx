import { TrainsetAttachmentResource } from '@/Support/Interfaces/Resources';
import { buttonVariants } from '@/Components/UI/button';
import { Separator } from '@/Components/UI/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/UI/table';
import { ROUTES } from '@/Support/Constants/routes';
import { Link } from '@inertiajs/react';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import ImportTrainsetCustomMaterial from '@/Pages/Project/Trainset/CarriageTrainset/Partials/Components/Components/ImportTrainsetCustomMaterial';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/UI/select';
import { trainsetAttachmentService } from '@/Services/trainsetAttachmentService';
import { withLoading } from '@/Utils/withLoading';

const ProgressTrainsetAttachment = ({
    attachment,
    title,
}: {
    attachment: TrainsetAttachmentResource;
    title: string;
}) => {
    const { t } = useLaravelReactI18n();

    const [trainsetAttachmentProgress, setTrainsetAttachmentProgress] = useState<TrainsetAttachmentResource>(attachment);

    const loadProgress = withLoading(async () => {
        const progress = await trainsetAttachmentService.get(attachment.id, {
            intent: IntentEnum.WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS,
        });
        setTrainsetAttachmentProgress(progress);
    });

    useEffect(() => {
        loadProgress();
    }, []);

    return (
        <div className="text-black dark:text-white" key={attachment.id}>
            <h1 className="text-xl font-bold">{title}</h1>
            <pre>
                <h4>{JSON.stringify(trainsetAttachmentProgress, null, 2)}</h4>
            </pre>
        </div>
    );
};

export default ProgressTrainsetAttachment;
