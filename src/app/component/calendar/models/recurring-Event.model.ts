import { Weekday } from 'rrule';

export interface RecurringEvent {
  title: string;
  color: {
    primary: string;
    secondary: string;
  };
  rrule?: {
    byweekday?: Weekday;
  };
  date?: {
    start?: Date;
    end?: Date;
  };
}
