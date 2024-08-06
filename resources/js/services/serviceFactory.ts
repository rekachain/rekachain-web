import { Resource } from '@/support/interfaces/resources';
import { PaginateResponse } from '@/support/interfaces/others';
import { ServiceFilterOptions } from '@/support/interfaces/others/ServiceFilterOptions';

export function serviceFactory<T extends Resource>(baseRoute: string) {
    return {
        getAll: async (filters: ServiceFilterOptions = {}): Promise<PaginateResponse<T>> => {
            const url = route(`${baseRoute}.index`);

            try {
                return (await window.axios.get(url, { params: filters })).data;
            } catch (error) {
                console.error(`Error fetching resources: ${error}`);
                throw error;
            }
        },

        create: async (data: Partial<any> | FormData): Promise<T> => {
            const url = route(`${baseRoute}.store`);

            try {
                return (await window.axios.post(url, data)).data;
            } catch (error) {
                console.error(`Error creating resource: ${error}`);
                throw error;
            }
        },

        update: async (id: number, data: Partial<any> | FormData): Promise<T> => {
            const url = route(`${baseRoute}.update`, id);
            try {
                return (
                    await window.axios.post(url, data, {
                        params: {
                            _method: 'PUT',
                        },
                    })
                ).data;
            } catch (error) {
                console.error(`Error updating resource with ID ${id}: ${error}`);
                throw error;
            }
        },

        delete: async (id: number): Promise<void> => {
            const url = route(`${baseRoute}.destroy`, id);
            try {
                await window.axios.delete(url);
            } catch (error) {
                console.error(`Error deleting resource with ID ${id}: ${error}`);
                throw error;
            }
        },
    };
}
