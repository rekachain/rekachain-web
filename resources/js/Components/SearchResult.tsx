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
        <div className="absolute top-full mt-2 w-full bg-background dark:bg-background border border-border rounded-md z-50 max-h-60 overflow-y-auto text-sm shadow-md">
            {results.map((result) => (
                <Link
                    key={result.id}
                    href={result.url}
                    className="block p-2 hover:bg-accent dark:hover:bg-accent text-foreground dark:text-foreground border-b border-border last:border-b-0"
                >
                    {result.title}
                </Link>
            ))}
        </div>
    );
}
