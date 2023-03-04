import { db, doc } from './db';

export class BasicDb<T extends doc> implements db<T> {
  db:{[s:string]:T};

  constructor() {
    this.db = {};
  }

  get(id: string): T {
    return this.db[id];
  }

  getAll(): T[] {
    return Object.values(this.db).filter((t) => !(t.deleteAt));
  }

  exist(id: string): boolean {
    return !!this.db?.[id];
  }

  add(obj: T): void {
    if (this.db[obj.id]) {
      return;
    }
    this.db[obj.id] = obj;
  }

  update(id: string, obj: T): void {
    if (this.db[id]) {
      this.db[id] = obj;
      this.db[id].lastUpdate = new Date();
    }
  }

  delete(id: string): void {
    this.db[id].deleteAt = new Date();
  }

  updateMany(arr: T[]): void {
    arr.forEach((T) => {
      this.update(T.id, T);
    });
  }

  deleteMany(arr: T[]): void {
    arr.forEach(({ id }) => {
      this.delete(id);
    });
  }

  addMany(arr: T[]): void {
    arr.forEach((T) => {
      this.add(T);
    });
  }
}
