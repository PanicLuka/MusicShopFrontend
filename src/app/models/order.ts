export class Order {
    orderId!: number;
    orderDate!: Date;
    orderArrival!: boolean;
    PaymentType!: string;
    orderStatus!: string;
    totalPrice?: number;
    paymentId?: string;
    userId!: number;
    creditCardId?: number;
    destinationAddressId!: number;
}