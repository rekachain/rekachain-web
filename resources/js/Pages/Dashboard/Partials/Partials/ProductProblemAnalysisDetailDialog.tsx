import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/Components/UI/dialog';
import { Separator } from '@/Components/UI/separator';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { memo } from 'react';

const ProductProblemAnalysisDetailDialog = ({
    data,
    isDetailDialogOpen,
    setIsDetailDialogOpen,
}: {
    data: any;
    isDetailDialogOpen: boolean;
    setIsDetailDialogOpen: (value: boolean) => void;
}) => {
    const { t } = useLaravelReactI18n();
    return (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className='w-[350px] md:w-[70%]'>
                <DialogHeader>
                    <DialogTitle>
                        {t(
                            'pages.dashboard.partials.partials.product_problem_analysis_detail_dialog.title',
                        )}
                    </DialogTitle>
                    <DialogDescription className='w-full'>
                        {t(
                            'pages.dashboard.partials.partials.product_problem_analysis_detail_dialog.subtitle',
                        )}
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className='flex flex-col space-y-4'>
                    <div className='flex flex-row space-x-4'>
                        <span className='font-bold'>
                            {t(
                                'pages.dashboard.partials.partials.product_problem_analysis_detail_dialog.labels.findings',
                            )}
                        </span>
                        <ul className='list-disc pl-4'>
                            {data?.product_problem?.notes.map((note: any, index: number) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <span className='font-bold'>
                            {t(
                                'pages.dashboard.partials.partials.product_problem_analysis_detail_dialog.labels.summary',
                            )}
                        </span>
                        <p className='pl-4'>{data?.summary}</p>
                    </div>
                    <div>
                        <span className='font-bold'>
                            {t(
                                'pages.dashboard.partials.partials.product_problem_analysis_detail_dialog.labels.cause',
                            )}
                        </span>
                        <p className='pl-4'>{data?.cause}</p>
                    </div>
                    <div>
                        <span className='font-bold'>
                            {t(
                                'pages.dashboard.partials.partials.product_problem_analysis_detail_dialog.labels.solution',
                            )}
                        </span>
                        <p className='pl-4'>{data?.solution}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default memo(ProductProblemAnalysisDetailDialog);
