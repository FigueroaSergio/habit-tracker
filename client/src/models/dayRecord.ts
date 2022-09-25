import { habitPreview } from './habit';

export type boolRecord={
  [key:string]:habitPreview
}

export class Record {
  private date = new Date();

  todos:boolRecord = {};
}

type record={
  [key:string]:Record
}

export class History {
  data:record = {};
}
