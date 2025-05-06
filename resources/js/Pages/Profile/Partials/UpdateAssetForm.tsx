import { Button } from '@/Components/UI/button';
import { Label } from '@/Components/UI/label';
import { useSuccessToast } from '@/Hooks/useToast';
import { ROUTES } from '@/Support/Constants/routes';
import { IntentEnum } from '@/Support/Enums/intentEnum';
import { withLoading } from '@/Utils/withLoading';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useState } from 'react';
import { FilePond } from 'react-filepond';

export default function ({ className }: { className?: string }) {
    const { t } = useLaravelReactI18n();

    const [isUploading, setIsUploading] = useState(false);
    const [apkFile, setApkFile] = useState<File[] | null>(null);
    const [bookFile, setBookFile] = useState<File[] | null>(null);

    const handleApkFileUpload = withLoading(async () => {
        if (!apkFile || !apkFile[0]) {
            return;
        }
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file_path', apkFile[0]);
        await window.axios
            .post(route(`${ROUTES.DASHBOARD}.store`), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    intent: IntentEnum.STORE_APK_FILE,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    void useSuccessToast(
                        t('pages.profile.partials.update_asset_form.messages.updated_apk'),
                    );
                    setIsUploading(false);
                    return;
                }
            });
    });

    const handleBookFileUpload = withLoading(async () => {
        if (!bookFile || !bookFile[0]) {
            return;
        }
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file_path', bookFile[0]);
        await window.axios
            .post(route(`${ROUTES.DASHBOARD}.store`), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    intent: IntentEnum.STORE_MANUAL_BOOK_FILE,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    void useSuccessToast(
                        t('pages.profile.partials.update_asset_form.messages.updated_book'),
                    );
                    setIsUploading(false);
                    return;
                }
            });
    });

    const handleApkFileChange = (fileItems: any) => {
        setApkFile(fileItems.map((fileItem: any) => fileItem.file));
    };

    const handleBookFileChange = (fileItems: any) => {
        setBookFile(fileItems.map((fileItem: any) => fileItem.file));
    };

    const handleAssetUpload = withLoading(async () => {
        if (isUploading) {
            return;
        }
        await handleApkFileUpload();
        await handleBookFileUpload();
    });

    return (
        <section className={className}>
            <header>
                <h2 className='text-lg font-medium'>
                    {t('pages.profile.partials.update_asset_form.title')}
                </h2>

                <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                    {t('pages.profile.partials.update_asset_form.description')}
                </p>
            </header>

            <div className='mt-6'>
                <Label htmlFor='apk_path'>
                    {t('pages.profile.partials.update_asset_form.fields.apk')}
                </Label>
                <FilePond
                    onupdatefiles={handleApkFileChange}
                    labelIdle={t(
                        'pages.profile.partials.update_asset_form.fields.apk_filepond_placeholder',
                    )}
                    filePosterMaxHeight={400}
                    allowMultiple={false}
                    acceptedFileTypes={['application/vnd.android.package-archive']}
                />
            </div>
            <div>
                <Label htmlFor='book_path'>
                    {t('pages.profile.partials.update_asset_form.fields.book')}
                </Label>
                <FilePond
                    onupdatefiles={handleBookFileChange}
                    labelIdle={t(
                        'pages.profile.partials.update_asset_form.fields.book_filepond_placeholder',
                    )}
                    filePosterMaxHeight={400}
                    allowMultiple={false}
                    acceptedFileTypes={['application/pdf']}
                />
            </div>
            <Button onClick={handleAssetUpload} disabled={isUploading}>
                {t('pages.profile.partials.update_asset_form.buttons.submit')}
            </Button>
        </section>
    );
}
