export async function fetchEnumLabels(
    enumNames: string | string[],
): Promise<Record<string, string> | any> {
    let response: Response;
    if (Array.isArray(enumNames)) {
        const params = enumNames.map((enumName) => `enums[]=${enumName}`).join('&');
        response = await fetch(`/api/enums/all?${params}`, {
            headers: {
                'Accept-Language': String(window.axios.defaults.headers['Accept-Language'] || ''),
            },
        });
    } else {
        response = await fetch(`/api/enums/${enumNames}`, {
            headers: {
                'Accept-Language': String(window.axios.defaults.headers['Accept-Language'] || ''),
            },
        });
    }
    if (!response.ok) {
        throw new Error(
            `Failed to fetch labels for enum: ${enumNames} (${response.status} ${response.statusText})`,
        );
    }
    return response.json();
}
