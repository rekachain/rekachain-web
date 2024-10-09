import { ChangeEvent, memo, ReactNode, useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { Input } from '@/Components/UI/input';

interface GenericSearchInputProps {
    setFilters: (filters: { search: string }) => void;
    debounceDelay?: number; // Optional debounce delay customization
    renderInput?: (value: string, onChange: (e: ChangeEvent<any>) => void) => ReactNode; // Custom input rendering
    defaultInputProps?: {
        placeholder?: string;
        className?: string;
        type?: string;
        [key: string]: any; // To allow passing any other input props
    };
}

const GenericSearchInput = ({
    setFilters,
    debounceDelay = 500,
    renderInput,
    defaultInputProps = {},
}: GenericSearchInputProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

    useEffect(() => {
        setFilters({ search: debouncedSearchTerm });
    }, [debouncedSearchTerm, setFilters]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            {renderInput ? (
                /**
                 * Use the custom input element if provided
                 *
                 * Example usage:
                 * <GenericSearchInput
                 *     setFilters={setFilters}
                 *     renderInput={(value, onChange) => (
                 *         <textarea
                 *             value={value}
                 *             placeholder="Search tags..."
                 *             onChange={onChange}
                 *             className="textarea textarea-sm"
                 *         />
                 *     )}
                 * />
                 */
                renderInput(searchTerm, handleChange)
            ) : (
                // Default input field with customizable properties
                <Input
                    value={searchTerm}
                    type={defaultInputProps.type || 'text'} // Default to text input
                    placeholder={defaultInputProps.placeholder || 'Search...'} // Default to "Search..." if no placeholder provided
                    onChange={handleChange}
                    className={defaultInputProps.className || ''} // Default class if none provided
                    {...defaultInputProps} // Spread any additional props
                />
            )}
        </>
    );
};

export default memo(GenericSearchInput);
