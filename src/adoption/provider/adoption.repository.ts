import { Connection } from 'mongoose';
import { DATA_SOURCE } from '../../config/datasource.provider';
import { IProvider } from '../../interface/IProvider';
import { AdoptionSchema } from '../schema/adoption.schema';

export const ADOPTION__MODEL = 'ADOPTION__MODEL';

export const adoptionProviders: IProvider<any>[] = [
  {
    provide: ADOPTION__MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Adoption', AdoptionSchema),
    inject: [DATA_SOURCE],
  },
];
