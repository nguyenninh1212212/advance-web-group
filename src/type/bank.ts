export interface BankRequest {
  bankName: string;
  accountNumber: string;
  accountName: string;
  amountRequest: number;
}

// Enum cho TransactionStatus và TransactionType
export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

// Interface cho TransactionDetails
export interface TransactionDetails {
  content: string;
  amountWithdrawn: number; // BigDecimal tương đương với number trong TS
  remainingAmount: number; // BigDecimal tương đương với number trong TS
  commissionAmount: string; // Nếu cần định dạng cụ thể như tiền tệ, có thể dùng string
  bankname: string;
  status: TransactionStatus;
  type: TransactionType;
  createdAt: string; // Thường là chuỗi ISO Date
}
