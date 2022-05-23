import { CartItemType } from "../types";

const BASE_URL = `api/cheeses`;

const getCheeses = async (): Promise<CartItemType[]> =>
    await (await fetch(BASE_URL)).json();

export { getCheeses };