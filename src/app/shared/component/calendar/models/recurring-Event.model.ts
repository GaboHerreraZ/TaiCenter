import RRule, { Weekday } from 'rrule';

export interface RecurringEvent {
  title: string;
  color: {
    primary: string;
    secondary: string;
  };
  rrule?: {
    freq: any;
    byweekday?: Weekday[];
  };
  date?: {
    start?: Date;
    end?: Date;
  };
}
