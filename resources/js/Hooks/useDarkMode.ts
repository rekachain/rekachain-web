import { useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

    const changeHtmlClass = () => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        }
    };

    useEffect(() => {
        changeHtmlClass();
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        changeHtmlClass();
    };

    const changeDarkMode = (theme: 'dark' | 'light') => {
        setDarkMode(theme === 'dark');
        changeHtmlClass();
    };

    return { darkMode, toggleDarkMode, changeDarkMode };
};

export default useDarkMode;
