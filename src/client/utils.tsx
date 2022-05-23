import { CartItemType, PurchaseType } from "./types";

// Calculate total price
const calculateTotal = (items: CartItemType[]) =>
  items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

// Create unique id
const getUniqueOrderId = () => {
  return Math.ceil(Math.random() * 1000000000)
};

// Calculate number of items
const getTotalItems = (items: CartItemType[]) =>
  items.reduce((ack: number, item) => ack + item.amount, 0);

// Return current date string
const getDate = () => {
  const today = new Date();
  return today.toLocaleDateString();
};

// Create purchase record for POST calls
const getPurchaseObject = (cartItems: CartItemType[]) => {
  const purchase: PurchaseType = {
    orderId: getUniqueOrderId(),
    userId: 'PatientZeroUser',
    orderTotal: Number(calculateTotal(cartItems).toFixed(2)),
    orderDate: getDate(),
    orderedItems: cartItems
  };
  return purchase;
};

export { calculateTotal, getUniqueOrderId, getTotalItems, getDate, getPurchaseObject };