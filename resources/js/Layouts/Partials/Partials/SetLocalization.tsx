import { Button } from '@/Components/UI/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/Components/UI/dropdown-menu';
import { STYLING } from '@/Support/Constants/styling';
import { RiTranslate2 } from '@remixicon/react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect } from 'react';

export const SetLocalization = () => {
    const { t, setLocale } = useLaravelReactI18n();
    const [persistedLocale, setPersistedLocale] = useLocalStorage('locale', 'en');

    useEffect(() => {
        setLocale(persistedLocale);
        window.axios.defaults.headers['Accept-Language'] = persistedLocale;
    }, [persistedLocale, setPersistedLocale]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <RiTranslate2 size={STYLING.ICON.SIZE.SMALL} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{t('components.navbar.localization.title')}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setPersistedLocale('en')}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPersistedLocale('id')}>
                    Indonesia
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
