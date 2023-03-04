import { doc } from 'src/core/db';
import { nanoid } from 'nanoid';
import { Schedule } from './Schedule';

export class Habit implements doc {
  id = nanoid();

  name = '';

  description?:string|null = '';

  style?: string | null = 'background: linear-gradient(45deg, rgb(255, 0, 132), rgb(255, 174, 0));';

  createAt: Date = new Date();

  lastUpdate = new Date();

  deleteAt: Date | null = null;

  schedule = new Schedule();
}
export type habitPreview =Habit&{completed:boolean}
