import { PurchaseType } from "../types";

const BASE_URL = `api/purchases`;

const getRecentPurchases = async (): Promise<PurchaseType[]> =>
    await (await fetch(BASE_URL)).json();

const postPurchase = async (purchase: PurchaseType) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchase)
    };
    return await fetch(BASE_URL, requestOptions).then(response => response).catch(err => err);
};

export { getRecentPurchases, postPurchase };