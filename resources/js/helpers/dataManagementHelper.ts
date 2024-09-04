import { AxiosResponse } from 'axios';

type FetchGenericResources<T> = T extends object ? T : never;

export const fetchGenericData = async <T extends {}>(url?: string): Promise<FetchGenericResources<T>> => {
    const response: AxiosResponse<T> = await window.axios.get(url ?? location.href);
    return response.data as FetchGenericResources<T>;
};
