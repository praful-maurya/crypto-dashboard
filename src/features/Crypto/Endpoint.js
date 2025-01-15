const BASE_URL = 'https://api.coingecko.com/api/v3' 

export const ENDPOINTS = {
    FETCH_CRYPTO: `${BASE_URL}/coins/markets`,
    CRYPTO_DETAILS: `${BASE_URL}/coins`,
    SIMPLE_PRICE: `${BASE_URL}/simple/price`,
}