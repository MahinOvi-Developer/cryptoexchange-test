import { QueryKey } from "@tanstack/react-query";
import { apiClient } from "../axios/index.api";

const getCoinsInfo = async ({ queryKey }: { queryKey: QueryKey }) => {
    const [, { search, limit }] = queryKey as [string, { search?: string, limit?: number }];

    try {
        const { data } = await apiClient.get(`/coins-info`, {
            params: {
                search: search || "",
                limit: limit || 10
            }
        });

        return data
    } catch (err) {
        console.error(err);
    }
};


export { getCoinsInfo }