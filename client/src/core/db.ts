export type doc={
  id:string,
  createAt:Date,
  lastUpdate:Date,
  deleteAt:Date|null,
}
export interface db<T extends doc>{
  db:unknown,
  add(obj:T):void,
  exist(id:string):boolean,
  update(id :string, obj:T):void,
  delete(id:string):void,
  get(id:string):T,
  getAll():T[],
  updateMany(arr:T[]):void,
  deleteMany(arr:T[]):void,
  addMany(arr:T[]):void
}
