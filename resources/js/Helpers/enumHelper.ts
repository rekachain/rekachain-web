export async function fetchEnumLabels(enumName: string): Promise<Record<string, string>> {
    const response = await fetch(`/api/enums/${enumName}`, {
        headers: {
            'Accept-Language': String(window.axios.defaults.headers['Accept-Language'] || ''),
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch labels for enum: ${enumName}`);
    }
    return response.json();
}
