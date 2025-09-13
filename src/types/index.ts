export type formattedDataProps = {
    adapterName?: string,
    amountFrom: number,
    amountTo: number
    from: string,
    to: string
    maxAmount?: number | null
    minAmount?: number | null
    iconURl?: string
    eta?: number
    isFloat?: boolean
    bestRate?: boolean
}

export type Options = {
    chooseRate: string;
    timeout: number;
    from: string;
    to: string;
    queryId: number;
    chooseAdapters: string[];
    rateType: string;
    amount: number;
    amountTo?: number
    referralId: string;
    ofcAdapter: boolean;
    fromNetwork: string;
    toNetwork: string
};

export type TransactionFormatterProps = {
    from: string;
    to: string;
    addressReceive: string;
    amountDeposit: string;
    email: string;
    extraIdReceive: string;
    refundAddress: string;
    referralId: string;
    refundExtraId: string;
    userUnique: string;
    adapterName?: string;
    float?: boolean
    fromNetwork: string;
    toNetwork: string
}


export type TransactionData = {
    addressDeposit: string;
    addressReceive: string;
    amountDeposit: string;
    amountEstimated: string;
    createdAt: string;
    email?: string;
    from: string;
    id: string;
    status: string;
    to: string;
    userUnique?: string;
    adapter?: string;
    adapterName?: string;
}


export type TransactionStatus = {
    status: string;
    id?: string;
    receiveAmount?: string;
}

export type CoinData = {
    additional_info_get: string;
    additional_info_send: string;
    chain_id: string | null;
    code: string;
    coins_highest: string;
    contract_address: string | null;
    created_at_date: number;
    default_amount: string;
    default_network_code: string;
    default_network_name: string;
    disabled: number;
    explorer: string;
    extra_name: string | null;
    has_extra: number;
    icon: string;
    is_active: number;
    max_amount: string;
    min_amount: string;
    name: string;
    network_background_color: string;
    network: string;
    network_icon: string;
    network_name: string;
    network_text_color: string;
    price_change_24h: string;
    rating: number;
    stable: number;
};

export type CoinsDataType = {
    filtered: CoinData[]
    popular: CoinData[]
}

export type AdapterName = "letsexchange" | "easybit" | "changelly" | "change_now"

export type Transaction = {
    adapter: string;
    amountFrom: number;
    amountTo: number;
    from: string;
    maxAmount: number | null;
    minAmount: number | null;
    to: string;
    iconURl: string;
    image: string;
    eta: number
    isFloat?: boolean
    bestRate?: boolean
    offers?: Transaction[]
};

export type FilterList = "Fastest" | "Best Rate" | "Best Match" | "Exchange Crypto" | "Buy/Sell by Fiat" | "DEX";

