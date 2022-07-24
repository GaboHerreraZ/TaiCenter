import { RecurringWod } from './recurring-wod.model';

export interface WodConfiguration {
  uid: string;
  recurringEvents: RecurringWod;
}
