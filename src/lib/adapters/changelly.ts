import { v7 as uuidv4 } from 'uuid';
import { Options, TransactionFormatterProps } from "../../types";
import crypto from "crypto";
import request from "request";
import { ChangellyTransaction } from '../../types/changelly';
import { transactionFormatter } from '../utils/transaction-formatter';
import { transactionStatusFormatter } from '../utils/transaction-status-formatter';

const privateKeyString = "308204bd020100300d06092a864886f70d0101010500048204a7308204a30201000282010100a8d288e2a9031bb7d9a542e68195735b72284133fcd37ae9f1ba5b723a01ebc60bc61fe3741c256b2caf0b3fab0421b39fbcf760c255b6ed0cd1a1ee5755fc6196645ecc57a24b9d71580d29c85afdac33aec01af2c77d40b337c43c89cc2ee88ebfd1f00aecee6b0ac5d69869f4f460ac2a65a40a001f65f06137f3c287e881e236e2cb76aa6693709c4f934e27f61946b13470f7c9d625c44a340f4fcd971fa64a1d76e0438391f6ed55f444cddcc863d5ddefa1a20afde7b98c37c7d69e53eeaf4c262d154acf1465caad977a75b79a84cc309c7a88f92041a9d9b9ceee3db6280c991cffb6fb8621147563e653211a87cbe3c370cbd41b155ac1b5a9e36102030100010282010008023cd62bd866e738defb267e3d3dc4b7ccab13314a4309781b341d5e1d1b3740f5bc2b892590acdde8cbead04d18e03192c05589c29133fba8b23ae14fc5f2473529be1de6281a26f75b60810db7fd0452a4f062560e5e14626fdfc355b95ff4edaaa2ed91c1d9b8201c870c77bf641aa6c43d9cefd68d7a72d239b11fcb6ad237cfe88754e9aebdd07bf0a114bb627bb9c966d82fa3c10df2c7af7e50735058ffd885ba3e678324ad858a38c65323b4634651e6916290c86322ea89216403ddaaf3bf18cbdabb5640c6e073e6d84f3673be20f67bb8e2383371cea355ac4baeed3735856b7fb0f0895816b48d2775557ed050519a2ee58ab00e5f89fc59c102818100d881e6fbca855e9390867475300d34bad0678ada0b14bf3662e9a32524116e3d7b741240f421e9bb1d2c87281148857de8fc84eef1085adccd97820aa56cbd73cf07cf1d832ea1565300155d0a4180e535410f47f50a4766a21c0a8a0777f8eb59e108b03cc3f33185bcd182c821e00eb0c83ee2683d9c4d964831051917c93902818100c79deae733cea75be46e4f9f2527f957f2af03b39d0b0f2347b3446599d4903d2105830d830d72846938447c23aa91028d60a8b1e5ef25c8183eeaaa9e82283e9876df6d91dc7d916078cd0297a7c54e56dbc666ff7cd2fe061edea00ce3caf803706c02d8147a8d21e19dc4328be14980dfc317c29463d5c3fd932ad662336902818039cbdbb485a8bac99bc038e07bb65ac830102401f7094fce1df38ec8c06b22c9a8e620655486a5157d4140c7526dd0acff0042206319bedfc8c65441b14d68f9bc5fb24b8794701f5242e87110e6d198de7182b9cbd135a4514c390805dc6207b9d397f52c13871d463d54949c066700a4f29fcee2d2e7a1d2a76ce6967f420902818027d7cc60338606ff9f7ba926d1cac5c9192677adad25dcf2a4c81259d9378546be45945fe90d9112fed17d51ede888a322c6ed44fce91bf87166757e72bef5fb7081219d8424a7679202eaa09ed69cda431a00e2e411ed2748df767e29b479f9c0edfa9122c20ba809e0379646a486e61df40bc3bd51d30f82dc2538c2abbd290281810080dbcb695feaee231d1f827c63beeb866c197dbc69803400f8bdbce09357f994533cd9f23812bc5a915efd596d3c6195b772e435c9a1219fccfee733b1cf171a5b4776485c155e59016a7dcc54df068b2aecd81be89b15424e0dff9cf7c8aa2eda65586769313247593c518199e36be4767a01f812cc1d20c41703b91c85b9ba"

const privateKey = crypto.createPrivateKey({
    key: privateKeyString as string,
    format: "der",
    type: "pkcs8",
    encoding: "hex",
});

const publicKey = crypto.createPublicKey(privateKey).export({
    type: "pkcs1",
    format: "der",
});

function signMessage(message: object) {
    return crypto.sign("sha256", Buffer.from(JSON.stringify(message)), {
        key: privateKey as any,
        type: "pkcs8",
        format: "der",
    }).toString("base64");
}

function createHeaders(signature: string) {
    return {
        "Content-Type": "application/json",
        "X-Api-Key": crypto.createHash("sha256").update(publicKey).digest("base64"),
        "X-Api-Signature": signature,
    };
}

function sendRequest(message: object, signature: string) {
    const data = {
        method: "POST",
        url: "https://api.changelly.com/v2",
        headers: createHeaders(signature),
        body: JSON.stringify(message),
    };

    return new Promise((resolve, reject) => {
        request(data, (error, response, body) => {
            if (error) {
                return reject(error);
            }
            try {
                resolve(JSON.parse(body));
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
}

async function getChangelly(options: Options, rateType: string, revert = false) {
    const message = {
        jsonrpc: "2.0",
        id: uuidv4(),
        method: rateType,
        params: {
            from: options.from.toLowerCase(),
            to: options.to?.toLowerCase(),
            ...(!revert ? { amountFrom: options.amount } : { amountTo: options.amountTo }),
        },
    };

    try {
        const signature = signMessage(message);
        return await sendRequest(message, signature);
    } catch (err) {
        console.error("Error from getChangelly", err);
        throw err;
    }
}

async function getChangellyFix(options: Options) {
    return getChangelly(options, "getFixRateForAmount", false);
}

async function getChangellyRevert(options: Options) {
    return getChangelly(options, "getFixRateForAmount", true);
}

async function createChangellyTransaction(options: TransactionFormatterProps) {
    console.log("Creating Changelly transaction with data:", options);
    
    const message = {
        jsonrpc: "2.0",
        id: uuidv4(),
        method: options.float ? "createTransaction" : "createFixTransaction",
        params: {
            from: options.from.toLowerCase(),
            to: options.to?.toLowerCase(),
            amountFrom: String(options.amountDeposit),
            address: options.addressReceive,
            rateId: options.userUnique,
            ...(!options.float ? { refundAddress: options.refundAddress } : {}),
        },
    };

    console.log("Changelly API request message:", message);

    try {
        const signature = signMessage(message);
        const res = await sendRequest(message, signature) as ChangellyTransaction;
        
        console.log("Changelly API response:", res);

        if (!res || !res.result) {
            throw new Error("Invalid response from Changelly API");
        }

        const data = res.result;

        const formattedData = transactionFormatter({ 
            addressDeposit: data.payinAddress, 
            addressReceive: data.payoutAddress, 
            amountDeposit: data.amountExpectedFrom, 
            amountEstimated: data.amountExpectedTo, 
            from: data.currencyFrom, 
            to: data.currencyTo, 
            id: data.id, 
            status: data.status, 
            createdAt: new Date().toISOString().toString(), 
            userUnique: options.userUnique 
        });

        console.log("Changelly transaction created:", formattedData);
        return formattedData;
    } catch (err) {
        console.error("Error from createChangellyTransaction", err);
        throw err;
    }
}

async function getChangellyTransaction(transactionID: string) {
    const message = {
        jsonrpc: "2.0",
        id: uuidv4(),
        method: "getTransactions",
        params: {
            id: transactionID,
        },
    };

    try {
        const signature = signMessage(message);
        const res = await sendRequest(message, signature) as { result: ChangellyTransaction["result"][] };
        
        if (!res || !res.result || !Array.isArray(res.result) || res.result.length === 0) {
            console.log("No transaction data found for Changelly transaction:", transactionID);
            return null;
        }

        const data = res.result[0];
        
        if (!data || !data.payinAddress) {
            console.log("Invalid transaction data structure from Changelly:", data);
            return null;
        }

        const formattedData = transactionFormatter({ 
            addressDeposit: data.payinAddress, 
            addressReceive: data.payoutAddress, 
            amountDeposit: data.amountExpectedFrom, 
            amountEstimated: data.amountExpectedTo, 
            from: data.currencyFrom, 
            to: data.currencyTo, 
            id: data.id, 
            status: data.status, 
            createdAt: new Date().toISOString().toString() 
        });

        return formattedData;
    } catch (err) {
        console.error("Error from getChangellyTransaction", err);
        return null;
    }
}

async function getChangellyTransactionStatus(transactionID: string) {
    try {
        const message = {
            jsonrpc: "2.0",
            id: uuidv4(),
            method: "getStatus",
            params: {
                id: transactionID,
            },
        };

        const signature = signMessage(message);
        const res = await sendRequest(message, signature) as { result: string, id: string };
        const formattedData = transactionStatusFormatter({ status: res.result, id: res.id })

        return formattedData
    } catch (err) {
        console.error("Error from getChangellyTransactionStatus", err);
        return null
    }
}

export { getChangelly, getChangellyFix, getChangellyRevert, createChangellyTransaction, getChangellyTransaction, getChangellyTransactionStatus };
