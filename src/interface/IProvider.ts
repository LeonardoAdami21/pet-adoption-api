import { Connection, Mongoose } from 'mongoose';

export interface IProvider<T> {
  provide: string;
  useFactory: (connection: Connection) => T;
  inject: string[];
}
