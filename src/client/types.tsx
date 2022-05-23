export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
};

export type PurchaseType = {
    orderId: number,
    userId: string,
    orderTotal: number,
    orderDate: string,
    orderedItems: CartItemType[]
};

export type CartProps = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
    onPurchase: () => void;
};

export type CartItemDialogProps = {
    openDialog: boolean;
    selectedItem: CartItemType;
    handleClose: () => void;
    handleAddToCart: (item : CartItemType) => void;
};

export type ItemProps = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
    handleViewDetails: (clickedItem: CartItemType) => void;
};

export type CartItemProps = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

export type NotificationProps = {
    openNotification: boolean;
    handleClose: (event: any) => void;
    message: string;
};

export type RecentPurchasesAccordionProps = {
    purchase: PurchaseType;
};