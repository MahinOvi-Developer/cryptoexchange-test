import axios from "axios"



async function validateAddress(address: string, currency: string) {
    try {
        const { data } = await axios.get(`https://api.easybit.com/validateAddress?currency=${currency.toUpperCase()}&address=${address}`, {
            headers: {
                ["API-KEY"]: process.env.EASY_BIT_API_KEY
            }
        })

        if (data.success) return true
        return false

    } catch (err) {
        console.error("Error from validateAddress")
    }
}

export { validateAddress }