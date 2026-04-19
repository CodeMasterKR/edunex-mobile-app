export interface PaymentSummary {
  totalIncome: number;
  totalDebt: number;
}

export interface Student {
  id: string;
  name: string;
  amount: number; // musbat = to'lagan, manfiy = qarzdor
}

export interface GroupPayment {
  id: string;
  name: string;
  time: string;
  code: string;
  studentCount: number;
  debt: number;
  income: number;
  students?: Student[];
}