export class Payment {
  public static serve(paymentOrder: any): Promise<Receipt> {
    return new Promise((resolve) => {
      console.log(paymentOrder);
      resolve({ orderId: Math.floor((Math.random() * 1000) + 1) });
    });
  }
}

export interface Receipt {
  readonly orderId: number;
}
