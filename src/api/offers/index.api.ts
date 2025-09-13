import { QueryKey } from "@tanstack/react-query";
import { apiClient } from "../axios/index.api";
import { formattedDataProps } from "../../types";



const getOffers = async ({ queryKey }: { queryKey: QueryKey }) => {
    const [, { amount, from, to, amountTo, fromNetwork, toNetwork }] = queryKey as [string, { amount: string, from: string, to: string, amountTo: string, fromNetwork: string, toNetwork: string }];
    const params = {
        chooseRate: "all",
        from,
        to,
        queryId: Math.random().toString().split(".")[1],
        chooseAdapters: ["easybit", "letsexchange", "changelly", "change_now"],
        rateType: "all",
        ...(typeof amount === 'number' ? { amount } : { amountTo }),
        referralId: "ka8pRkZUmSakoqvn",
        fromNetwork,
        toNetwork
    };


    try {
        const { data } = await apiClient.get(`/get-rate`, {
            params
        })

        return data as formattedDataProps[]
    } catch (err) {
        console.error(err)
    }
}

export { getOffers }