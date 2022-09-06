export interface UserWod {
  name: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  gender: string;
  mote: string;
  remainingWods?: number;
  plan: string;
  state: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  terms: boolean;
}
