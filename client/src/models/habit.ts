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

export class Habit {
  id = '';

  name = '';

  description?:string|null = '';

  completed = 0;

  schedule: Array<weekday> = [];

  createAt: Date = new Date();

  style?: string | null = 'background: linear-gradient(45deg, rgb(255, 0, 132), rgb(255, 174, 0));';

  updateAt?: Date | null = null;

  deleteAt?: Date | null = null;
}
export type habitPreview = Pick<Habit, 'name'> &{completed:boolean}
