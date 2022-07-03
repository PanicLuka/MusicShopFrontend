import { Product } from "./product.model";

export class Basket {
    basketId?: number;
    products!: Product[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
}