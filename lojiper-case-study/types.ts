export interface PaymentPlan {
  paymentDate: string;
  paymentAmount: number;
  isPaid: boolean;
}

export interface Debt {
  id: string;
  debtName: string;
  lenderName: string;
  interestRate: number;
  amount: number;
  debAmount: number;
  paymentStart: string;
  installment: number;
  description: string;
  paymentPlan: PaymentPlan[];
}
