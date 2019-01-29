export class Transaction {

    transaction_id: number;
    stripe_charge_id: string;
    price: number;
    customer_token: string;
    customer_id: number; // user id
    provider_id: number; // user id
    menu_id: number; // menu id
    date_sold: string;
  
    constructor() {}
  }