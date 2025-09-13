import { LazyLoadImage } from "react-lazy-load-image-component";
import { usePairData } from "../store/use-pair-data";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiSpinner } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "../api/transaction/index.api";
import { motion } from "framer-motion"
import { useOpenTransaction } from "../store/use-open-transaction";
import { useOfferData } from "../store/use-offer-data";
import { adapterDataFormatter, AdapterName } from "../utils/adapter-data-formatter";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatTime } from "../utils/format-time";
import { FaQuestionCircle } from "react-icons/fa";
import { useTransaction } from "../store/use-transation";
import { useChangePair } from "../store/use-change-pair";




export default function CreateOrder() {
    const [addressText, setAddressText] = useState("");
    const [refundAddressText, setRefundAddressText] = useState("");
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [time, setTime] = useState(120);
    const { pairData } = usePairData()
    const { setIsOpen } = useOpenTransaction()
    const { offerData } = useOfferData()
    const { setTransaction } = useTransaction()
    const router = useRouter()
    const { mutateAsync, isPending } = useMutation({
        mutationFn: createTransaction,
        onSuccess: (data: any) => {
            setTransaction(data)
            if (!data?.transaction.id) return toast.error("Something went wrong")

            router.push(`/transaction/${data?.transaction.id}`)
            setIsOpen(false)
        },

        onError(err: any) {
            toast.error(err.message)
        }
    })
    const cardDivRef = useRef<HTMLDivElement>(null)
    const { flag } = useChangePair()
    const formattedAdapterName = adapterDataFormatter({ adapterName: offerData?.adapter as AdapterName }).name


    const trimmedAddress = addressText.trim();
    const trimmedRefundAddress = refundAddressText.trim();

    const validateInput = () => {
        if (!trimmedAddress) {
            toast.error("Please enter an address");
            return false;
        }
        if (!confirmAddress) {
            toast.error("Please confirm the address");
            return false;
        }
        if (formattedAdapterName === "Changelly" && !offerData?.isFloat && !trimmedRefundAddress) {
            toast.error("Please enter a refund address");
            return false;
        }
        return trimmedAddress.length >= 10;
    };

    useEffect(() => {
        const cardRefInstance = cardDivRef.current
        if (cardRefInstance) {
            cardRefInstance.scrollIntoView({ block: "center" });
        }

        return () => {
            cardRefInstance?.scrollIntoView({ block: "center" });
        };
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
            if (time === 0) {
                setIsOpen(false)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [setIsOpen, time])

    const getProgressBarWidth = () => `${(time / 120) * 100}%`;
    const getProgressBarColor = () => (time <= 10 ? "bg-red-500" : "bg-[#D56600]");
    // const handleNextStep = () => setStep((prevStep) => prevStep + 1);

    const handleCreateOrder = async () => {
        try {
            if (!validateInput()) return;
            await mutateAsync({ data: { 
                addressReceive: trimmedAddress, 
                refundAddress: trimmedRefundAddress, 
                adapterName: offerData?.adapter, 
                userUnique: crypto.randomUUID(), 
                from: pairData?.from.code || "", 
                to: pairData?.to.code || "", 
                referralId: "ka8pRkZUmSakoqvn", 
                amountDeposit: String(pairData?.amount), 
                float: offerData?.isFloat, 
                fromNetwork: String(pairData?.fromNetwork), 
                toNetwork: String(pairData?.toNetwork),
                email: "",
                extraIdReceive: "",
                refundExtraId: ""
            } })
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <motion.div ref={cardDivRef} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="w-full max-w-md mx-auto p-4 bg-[#FFFFFF12] rounded-lg shadow-lg mt-10 h-fit">
            <div className="flex flex-col justify-between min-h-[500px] max-h-[500px]">
                <div className="h-full">
                    <div className="flex items-center justify-between mb-7">
                        <h2 className="text-[25px] font-semibold text-white">Enter address</h2>
                        <motion.button onClick={() => setIsOpen(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-white bg-[#D56600] py-1 px-5 rounded-md" >
                            Back
                        </motion.button>
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="text-center">
                            <span className="block font-semibold text-[20px] text-white">{flag === "from" ? offerData?.amountFrom : offerData?.amountTo}</span>
                            <span className="flex items-center mt-3 text-white">
                                <div className="flex-shrink-0 w-6 h-6 mr-2">
                                    <LazyLoadImage  src={pairData?.from.icon} alt="" className="object-cover w-6 h-6 rounded" />
                                </div>
                                <div className="max-w-[200px] flex items-center ">
                                    <span className="truncate ">{pairData?.from.name}</span> <span className="text-[#919191] ml-1 truncate">({flag === "from" ? offerData?.from.toUpperCase() : offerData?.to.toUpperCase()})</span>
                                </div>
                            </span>
                        </div>
                        <div>
                            <FaArrowRightLong size={30} color="#D56600" />
                        </div>
                        <div className="text-center">
                            <span className="block font-semibold text-[20px] text-white">
                                {flag === "from" ? offerData?.amountTo : offerData?.amountFrom}
                            </span>
                            <span className="flex items-center mt-3 text-white">
                                <div className="flex-shrink-0 w-6 h-6 mr-2">
                                    <LazyLoadImage  src={pairData?.to.icon} alt="" className="object-cover w-6 h-6 rounded" />
                                </div>
                                <div className="max-w-[200px] flex items-center ">
                                    <span className="truncate ">{pairData?.to.name}</span> <span className="text-[#919191] ml-1 truncate">({flag === "from" ? offerData?.to.toUpperCase() : offerData?.from.toUpperCase()})</span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center mt-5">
                        <div className="w-full h-[4px] bg-[#D7DAE3] rounded-full overflow-hidden">
                            <div className={`h-[4px] ${getProgressBarColor()} transition-all duration-200`} style={{ width: getProgressBarWidth() }}></div>
                        </div>
                        <div className="mt-4 text-[#D56600] text-[14px] w-fit flex items-center gap-3">
                            <span> {formatTime(time)} </span>
                            <motion.div whileHover={{ scale: 1.1 }} animate={{ scale: 1 }} className="relative group z-[99999] flex items-center">
                                <FaQuestionCircle size={13} cursor="pointer" className="text-white hover:text-[#BE5B00] active:scale-90 transition-all" />
                                <div className="absolute top-[32px] left-0  bg-gray-800 text-white p-2 rounded shadow-lg mt-1 text-sm w-[250px] text-center opacity-0 group-hover:opacity-100 invisible group-hover:visible group-hover:scale-100 scale-75 transition-all duration-300">
                                    When this time is over, the transaction will be cancelled.
                                </div>
                            </motion.div></div>
                    </div>
                </div>
                <div>
                    <label htmlFor="address" className="text-white">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        placeholder={`Paste ${offerData?.to.toUpperCase()} address (required)`}
                        value={addressText}
                        onChange={(e) => setAddressText(e.target.value)}
                        className="w-full mb-4 p-2 text-white border border-[#FFFFFF1F] bg-[#FFFFFF12] rounded-lg"
                    />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="chx" onChange={(e) => setConfirmAddress(e.target.checked)} className="w-5 h-5" />
                        <label htmlFor="chx" className="text-white select-none">
                            Confirm Address
                        </label>
                    </div>
                </div>

                {(formattedAdapterName === "EasyBit" || formattedAdapterName === "Changelly") && (
                    <div>
                        <label htmlFor="raddress" className="text-white">
                            Refund Address
                        </label>
                        <input
                            id="raddress"
                            type="text"
                            placeholder={`Paste ${offerData?.from} refund address ${formattedAdapterName === "Changelly" && !offerData?.isFloat ? "(required)" : "(optional)"}`}
                            value={refundAddressText}
                            onChange={(e) => setRefundAddressText(e.target.value)}
                            className="w-full mb-4 p-2 text-white border border-[#FFFFFF1F] bg-[#FFFFFF12] rounded-lg"
                        />
                    </div>
                )}
                {isPending ? (
                    <motion.button whileTap={{ scale: 0.9 }} className="w-full bg-[#D56600] flex items-center justify-center text-white py-2 rounded-lg transition-all duration-200 active:scale-90">
                        <PiSpinner size={20} className="text-white animate-spin" />
                    </motion.button>
                ) : (
                    <motion.button onClick={handleCreateOrder} whileTap={{ scale: 0.9 }} className="w-full bg-[#D56600] text-white py-2 rounded-lg transition-all duration-200 active:scale-90">
                        Proceed
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
