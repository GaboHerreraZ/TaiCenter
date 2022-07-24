export interface RecurringWod {
  title: string;
  color: {
    primary: string;
    secondary: string;
  };
  rrule?: {
    freq: any;
    byweekday?: WeekDay[];
  };
  date?: {
    start?: Date;
    end?: Date;
  };
  state: string;
}

export interface WeekDay {
  weekDay: number;
}
