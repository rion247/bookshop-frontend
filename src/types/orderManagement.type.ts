import type { TProduct } from "./productManagement.type";
import type { TUser } from "./userManagement.type";

export type TOrder = {
  transactionInfo: TransactionInfo;
  _id: string;
  user: TUser;
  product: TProduct;
  orderQuantity: number;
  totalPrice: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
};

export type TransactionInfo = {
  id: string;
  transactionStatus: string;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
};
