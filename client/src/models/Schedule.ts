export enum weekday {
  Sunday = 'Su',
  Monday = 'Mo',
  Tuesday = 'Tu',
  Wednesday = 'We',
  Thursday = 'Th',
  Friday = 'Fr',
  Saturday = 'Sa',
}
type week={
  [key:number]:weekday
}
export const weekdaysNumber:week = {
  0: weekday.Sunday,
  1: weekday.Monday,
  2: weekday.Tuesday,
  3: weekday.Wednesday,
  4: weekday.Thursday,
  5: weekday.Friday,
  6: weekday.Saturday,
};
export class Schedule {
  active = true;

  start:Date|null = null;

  end:Date|null = null;

  weekDays:Array<weekday> = [];

  isAvalibleToday() {
    return this.isAvalible(new Date());
  }

  isAvalible(date:Date) {
    const day = date.getDay();
    const val = weekdaysNumber[day];
    return this.weekDays.includes(val);
  }
}
