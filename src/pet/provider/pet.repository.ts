import { Connection, Mongoose } from 'mongoose';
import { DATA_SOURCE } from '../../config/datasource.provider';
import { PetSchema } from '../schema/pet.schema';
import { IProvider } from '../../interface/IProvider';

export const PET__MODEL = 'PET__MODEL';

export const petProviders: IProvider<any>[] = [
  {
    provide: PET__MODEL,
    useFactory: (connection: Connection) => connection.model('Pet', PetSchema),
    inject: [DATA_SOURCE],
  },
];
