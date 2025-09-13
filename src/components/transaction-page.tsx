import { FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";
import { IoCopyOutline } from "react-icons/io5";
import { PiSpinner } from "react-icons/pi";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getStatusMessage } from "../utils/get-message-status";
import { useParams } from "next/navigation";
import TransactionSkeleton from "./skeleton/transaction";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTransaction, getTransactionStatus } from "../api/transaction/index.api";
import { apiClient } from "../api/axios/index.api";

const statusMessagesLetsExchange = {
    wait: "Waiting for deposit",
    confirmation: "Waiting for confirmations",
    confirmed: "Waiting for confirmations",
    exchanging: "Exchanging coins",
    sending: "Sending funds",
    sending_confirmation: "Sending funds",
    success: "Exchange completed",
    aml_check_failed: "Transaction failed",
    overdue: "Transaction overdue",
    error: "Transaction failed",
    refund: "Exchange refunded",
};

const statusMessagesEasyBit = {
    ["Awaiting Deposit"]: "Waiting for deposit",
    Complete: "Exchange completed",
    Failed: "Transaction failed",
    "Confirming Deposit": "Waiting for confirmations",
    Exchanging: "Exchanging coins",
    Sending: "Sending funds",
    Refund: "Exchange refunded",
    VolatilityProtection: "Volatility protection in place",
    ActionRequest: "Action required from user",
    RequestOverdue: "Request is overdue"
};

const statusMessages = {
    waiting: "Waiting for deposit",
    confirming: "Waiting for confirmations",
    exchanging: "Exchanging coins",
    sending: "Sending funds",
    finished: "Exchange completed",
    failed: "Transaction failed",
    refunded: "Exchange refunded",
    hold: "Exchange may be delayed",
    overdue: "Transaction overdue",
    expired: "Transaction expired",
};

// Removed router - using useParams instead

function TransactionPage() {
    const [isCopying, setIsCopying] = useState<boolean>(false);
    const params = useParams();
    const transactionId = params.id as string;

    const { data: updatedTransaction, isLoading } = useQuery({
        queryKey: ["transaction-status"],
        queryFn: () => getTransactionStatus({ transactionId }),
        refetchInterval: 15000 // every 15 seconds
    })

    const { data: transaction, isLoading: transactionLoading } = useQuery({
        queryKey: ["transaction", { transactionId }],
        queryFn: () => getTransaction({ transactionId }),
    })

    const { mutateAsync } = useMutation({
        mutationKey: ["transaction-status"],
        mutationFn: async () => {
            const { data } = await apiClient.post("/shortlink/generate", { originalUrl: window.location.href })

            return data as { shortLink: string }
        },

    })



    const transactionSectionRef = useRef<HTMLElement>(null)

    const copyHandler = async (text: string, msg: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(msg);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            toast.error("Failed");
        }
    };

    useEffect(() => {
        const transactionSectionInstance = transactionSectionRef.current
        if (transactionSectionInstance) {
            transactionSectionInstance.scrollIntoView({ block: "center" });
        }
        return () => {
            transactionSectionInstance?.scrollIntoView({ block: "center" });
        };
    }, [])

    const createShortLink = useCallback(async () => {
        setIsCopying(true);
        try {
            const { shortLink } = await mutateAsync();

            const newShortLink = shortLink.split("?")[0];
            await copyHandler(newShortLink, "Transaction link copied successfully.");
            setIsCopying(false);
        } catch (error) {
            toast.error("Failed");
            console.error("Error generating short link:", error);
            setIsCopying(false);
        }
    }, [mutateAsync]);

    const updatedStatusMessage = getStatusMessage(updatedTransaction?.status, statusMessagesLetsExchange, statusMessagesEasyBit, statusMessages)

    const transactionContent = useMemo(() => {

        const currentStatusStyle =
            getStatusMessage(transaction?.status, statusMessagesLetsExchange, statusMessagesEasyBit, statusMessages) || "text-gray-300";
        const currentStatusMessage = getStatusMessage(transaction?.status, statusMessagesLetsExchange, statusMessagesEasyBit, statusMessages)

        if (transactionLoading) return <TransactionSkeleton />

        if (!transaction) {
            return (
                <section ref={transactionSectionRef} className="mt-20 flex flex-col items-center justify-center z-20 w-full px-3">
                    <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-lg mt-10 bg-[#141414] z-[9999]">
                        <div className="text-center text-white">
                            <h2 className="text-2xl font-semibold mb-4">Transaction Not Found</h2>
                            <p className="text-gray-300">The transaction with ID {transactionId} could not be found.</p>
                        </div>
                    </div>
                </section>
            );
        }

        return <section ref={transactionSectionRef} className="mt-20 flex flex-col items-center justify-center z-20 w-full px-3">
            <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-lg mt-10 bg-[#141414] z-[9999]">
                <div className="flex flex-col justify-between gap-6">
                    {/* Header with Status */}
                    <div className="z-30">
                        <div className="flex items-center justify-between w-full z-30 mb-4">
                            <h2 className="text-2xl font-semibold text-white">Transaction Details</h2>
                            <div className={`text-white ${currentStatusStyle}`}>
                                Status: <span className="font-semibold">{isLoading ? "Loading..." : updatedStatusMessage || currentStatusMessage}</span>
                            </div>
                        </div>
                        
                        {/* Transaction ID */}
                        <div className="bg-white bg-opacity-10 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-300">Transaction ID:</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-mono text-sm">{transaction?.id}</span>
                                    <IoCopyOutline 
                                        className="text-lg active:scale-90" 
                                        onClick={() => copyHandler(transaction?.id || '', "Transaction ID copied")} 
                                        color="#D56600" 
                                        cursor="pointer" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Deposit Section */}
                        <div className="bg-white bg-opacity-20 z-30 rounded-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold text-white mb-3">Deposit</h3>
                            <p className="mb-3 text-gray-300 text-sm">Send the exact amount to the deposit address</p>
                            
                            {/* Amount to Send */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-300">Amount to send:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-semibold text-white">
                                            {transaction?.amountDeposit} {transaction?.from?.toUpperCase()}
                                        </span>
                                        <IoCopyOutline 
                                            className="active:scale-90" 
                                            onClick={() => copyHandler(transaction?.amountDeposit || '', "Amount copied")} 
                                            color="#D56600" 
                                            cursor="pointer" 
                                        />
                                    </div>
                                </div>
                                
                                {/* Deposit Address */}
                                <div className="mt-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-300">Deposit address:</span>
                                        <IoCopyOutline 
                                            className="text-lg active:scale-90" 
                                            onClick={() => copyHandler(transaction?.addressDeposit || '', "Deposit address copied")} 
                                            color="#D56600" 
                                            cursor="pointer" 
                                        />
                                    </div>
                                    <div className="bg-black bg-opacity-30 rounded p-2">
                                        <span className="text-white break-all font-mono text-sm">{transaction?.addressDeposit || 'Loading...'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Receive Section */}
                    <div className="bg-white bg-opacity-20 z-30 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">You will receive</h3>
                        
                        {/* Estimated Amount */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-300">Estimated amount:</span>
                                <span className="text-lg font-semibold text-white">
                                    {transaction?.amountEstimated} {transaction?.to?.toUpperCase()}
                                </span>
                            </div>
                            
                            {/* Receiving Address */}
                            <div className="mt-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-gray-300">Receiving address:</span>
                                    <IoCopyOutline 
                                        className="text-lg active:scale-90" 
                                        onClick={() => copyHandler(transaction?.addressReceive || '', "Receiving address copied")} 
                                        color="#D56600" 
                                        cursor="pointer" 
                                    />
                                </div>
                                <div className="bg-black bg-opacity-30 rounded p-2">
                                    <span className="text-white break-all font-mono text-sm">{transaction?.addressReceive || 'Loading...'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    {transaction?.createdAt && (
                        <div className="bg-white bg-opacity-10 rounded-lg p-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-300">Created:</span>
                                <span className="text-white">{new Date(transaction.createdAt).toLocaleString()}</span>
                            </div>
                            {transaction?.adapter && (
                                <div className="flex items-center justify-between text-sm mt-2">
                                    <span className="text-gray-300">Exchange:</span>
                                    <span className="text-white capitalize">{transaction.adapter}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                <button onClick={createShortLink} className="w-full bg-[#D56600] text-white flex items-center justify-center py-3 rounded-lg transition-all duration-200 active:scale-90 mt-6 font-semibold">
                    {!isCopying ? "Copy transaction link" : <PiSpinner color="white" size={25} className="animate-spin" />}
                </button>
            </div>
        </section>
    }, [createShortLink, isCopying, isLoading, transaction, transactionLoading, updatedStatusMessage, transactionId])


    if (updatedTransaction?.status === "Exchange completed") {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center max-w-[500px] h-[500px] bg-[#141414] text-center z-[9999999] rounded-lg p-5">
                    <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                    <h1 className="text-3xl font-bold mb-2 text-white z-[9999999]">Success!</h1>
                    <p className="text-lg text-white z-[9999999]">Your operation was completed successfully.</p>
                </div>
            </div>
        );
    }

    return (
        transactionContent
    );
}

export default TransactionPage;
export { TransactionPage };
