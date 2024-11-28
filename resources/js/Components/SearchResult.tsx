import { Link } from '@inertiajs/react';

interface SearchResult {
    id: number;
    title: string;
    url: string;
}

interface SearchResultsProps {
    query: string;
    results: SearchResult[];
}

export function SearchResults({ query, results }: SearchResultsProps) {
    return (
        <div className='absolute top-full z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-border bg-background text-sm shadow-md dark:bg-background'>
            {results.map((result) => (
                <Link
                    key={result.id}
                    href={result.url}
                    className='block border-b border-border p-2 text-foreground last:border-b-0 hover:bg-accent dark:text-foreground dark:hover:bg-accent'
                >
                    {result.title}
                </Link>
            ))}
        </div>
    );
}
