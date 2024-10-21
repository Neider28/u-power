import { UserI } from "./user";

export interface BookingI {
  _id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  user: string;
}

export interface BookingFullI {
  _id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  user: UserI;
}

export interface CreateBookingI {
  startDate: Date;
}
