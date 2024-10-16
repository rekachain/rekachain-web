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

export const SetLocalization = () => {
    const { t, setLocale } = useLaravelReactI18n();

    const changeLocale = (locale: string) => {
        setLocale(locale);
        window.axios.defaults.headers['Accept-Language'] = locale;
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <RiTranslate2 size={STYLING.ICON.SIZE.SMALL} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{t('components.navbar.localization.title')}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => changeLocale('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLocale('id')}>Indonesia</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
