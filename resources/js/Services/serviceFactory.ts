import { PaginateResponse } from '@/Support/Interfaces/Others';
import { ServiceFilterOptions } from '@/Support/Interfaces/Others/ServiceFilterOptions';
import { Resource } from '@/Support/Interfaces/Resources';
import { AxiosRequestConfig } from 'axios';

const DEBUG_MODE = true;

export function serviceFactory<T extends Resource>(baseRoute: string) {
    return {
        getAll: async (
            filters: ServiceFilterOptions = {},
            config: AxiosRequestConfig = {},
        ): Promise<PaginateResponse<T>> => {
            const url = route(`${baseRoute}.index`);

            try {
                const res = await window.axios.get(url, { params: filters, ...config });

                if (DEBUG_MODE)
                    console.log(
                        `Fetched resources from ${url} with filters:`,
                        filters,
                        'and got:',
                        res.data,
                    );

                return res.data;
            } catch (error) {
                console.error(`Error fetching resources: ${error}`);
                throw error;
            }
        },

        get: async (
            id: number,
            filters: ServiceFilterOptions = {},
            config: AxiosRequestConfig = {},
        ): Promise<T> => {
            const url = route(`${baseRoute}.show`, id);

            try {
                const res = await window.axios.get(url, { params: filters, ...config });

                if (DEBUG_MODE) console.log(`Fetched resource from ${url} and got:`, res.data);

                return res.data;
            } catch (error) {
                console.error(`Error fetching resource with ID ${id}: ${error}`);
                throw error;
            }
        },

        create: async (
            data: Partial<any> | FormData,
            filters: ServiceFilterOptions = {},
        ): Promise<T> => {
            const url = route(`${baseRoute}.store`);

            try {
                const res = await window.axios.post(url, data, { params: filters });

                if (DEBUG_MODE)
                    console.log(
                        `Created resource at ${url} with data:`,
                        data,
                        'and got:',
                        res.data,
                    );

                return res.data;
            } catch (error) {
                console.error(`Error creating resource: ${error}`);
                throw error;
            }
        },

        update: async (id: number, data: Partial<any> | FormData): Promise<T> => {
            const url = route(`${baseRoute}.update`, id);
            try {
                const res = await window.axios.post(url, data, {
                    params: {
                        _method: 'PUT',
                    },
                });

                if (DEBUG_MODE)
                    console.log(
                        `Updated resource at ${url} with data:`,
                        data,
                        'and got:',
                        res.data,
                    );

                return res.data;
            } catch (error) {
                console.error(`Error updating resource with ID ${id}: ${error}`);
                throw error;
            }
        },

        delete: async (id: number): Promise<void> => {
            const url = route(`${baseRoute}.destroy`, id);
            try {
                const res = await window.axios.post(url, {
                    _method: 'DELETE',
                });

                if (DEBUG_MODE) console.log(`Deleted resource at ${url}`);

                return res.data;
            } catch (error) {
                console.error(`Error deleting resource with ID ${id}: ${error}`);
                throw error;
            }
        },
    };
}
