import { date } from 'quasar';

import { doc } from 'src/core/db';
import { Habit, habitPreview } from './Habit';

export type boolRecord={
  [key:string]:habitPreview
}

export class Record implements doc {
  id = date.formatDate(new Date(), 'MM/DD/YYYY');

  createAt = new Date();

  lastUpdate = new Date();

  deleteAt = null;

  completed:boolRecord = {};

  add(habit:Habit, val:boolean) {
    if (!habit.schedule.isAvalible(new Date(this.id))) {
      return;
    }
    this.completed[habit.id] = { ...habit, completed: val };
  }
}
