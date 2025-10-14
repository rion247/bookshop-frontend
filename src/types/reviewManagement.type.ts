import type { TUser } from "./userManagement.type";

export interface TReview {
  product: string;
  user: TUser;
  rating: number;
  review: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
