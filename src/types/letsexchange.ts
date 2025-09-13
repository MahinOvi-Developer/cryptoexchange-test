export type LetsExchangeTransaction = {
    transaction_id: string;
    status: string;
    coin_from: string;
    coin_from_name: string;
    coin_from_network: string;
    coin_to: string;
    coin_to_name: string;
    coin_to_network: string;
    deposit_amount: string;
    withdrawal_amount: string;
    deposit: string;
    deposit_extra_id: string | null;
    withdrawal: string;
    withdrawal_extra_id: string;
    rate: string;
    fee: string;
    return: string;
    return_hash: string;
    return_amount: string;
    return_extra_id: string;
    is_float: string;
    coin_from_explorer_url: string;
    coin_to_explorer_url: string;
    need_confirmations: number;
    aml_error_signals: Array<{
      signal: string;
      signalId: number;
      signalPercent: number;
      level: number;
    }>;
  };
  
