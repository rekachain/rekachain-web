import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/Components/UI/dropdown-menu';
import { Button } from '@/Components/UI/button';
import { RiTranslate2 } from '@remixicon/react';
import { STYLING } from '@/Support/Constants/styling';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useLocalStorage } from '@uidotdev/usehooks';
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
                <Button size="icon" variant="ghost">
                    <RiTranslate2 size={STYLING.ICON.SIZE.SMALL} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{t('components.navbar.localization.title')}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setPersistedLocale('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPersistedLocale('id')}>Indonesia</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
